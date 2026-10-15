import type { CollectionConfig, CollectionBeforeOperationHook } from 'payload';
import { revalidateCollection } from '../lib/revalidate';
import fs from 'fs';
import path from 'path';

const fetchImageFromUrl: CollectionBeforeOperationHook = async ({ args, operation }) => {
  if (operation === 'create' || operation === 'update') {
    const { data, req } = args;
    const rawUrl = data?.sourceUrl;
    
    if (rawUrl && typeof rawUrl === 'string' && rawUrl.trim().length > 0 && !req.file && (!req.files || !req.files.file)) {
      const url = rawUrl.trim();

      // If updating, check if the sourceUrl didn't change and the file already exists on disk
      const docId = (args as Record<string, unknown>).id;
      if (operation === 'update' && docId && req?.payload) {
        try {
          const existing = await req.payload.findByID({
            collection: 'media',
            id: String(docId),
            depth: 0,
            req,
          });
          if (existing && existing.sourceUrl === url) {
            const hasRemoteUrl = typeof existing.url === 'string' && existing.url.startsWith('http');
            const hasLocalFile = existing.filename && fs.existsSync(path.resolve(process.cwd(), 'public/media', existing.filename));
            if (hasRemoteUrl || hasLocalFile) {
              // File already exists on remote storage or local disk and URL is unchanged, no need to re-download
              return args;
            }
          }
        } catch {
          // If fetch fails, proceed with downloading
        }
      }

      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
          }
        });
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status} ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        if (buffer.length === 0) {
          throw new Error('Downloaded file is empty (0 bytes)');
        }

        const rawContentType = response.headers.get('content-type') || 'image/jpeg';
        const mimeType = rawContentType.split(';')[0].trim().toLowerCase();
        
        // Extract a clean filename from the URL
        let rawFilename = 'downloaded-image';
        try {
          const parsedUrl = new URL(url);
          const pathname = decodeURIComponent(parsedUrl.pathname);
          const baseName = pathname.split('/').filter(Boolean).pop();
          if (baseName) {
            rawFilename = baseName;
          }
        } catch {
          rawFilename = decodeURIComponent(url.split('/').pop()?.split('?')[0] || 'downloaded-image');
        }
        
        // Sanitize filename to safe characters
        let cleanName = rawFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
        if (!cleanName.includes('.')) {
          const ext = mimeType === 'image/webp' ? '.webp' : mimeType === 'image/png' ? '.png' : mimeType === 'image/gif' ? '.gif' : '.jpg';
          cleanName += ext;
        }

        req.file = {
          data: buffer,
          mimetype: mimeType.startsWith('image/') ? mimeType : 'image/jpeg',
          name: cleanName,
          size: buffer.length,
        };
      } catch (error) {
        console.error('Error fetching image from URL:', error);
        throw new Error(`অনলাইন লিংক থেকে ছবি ডাউনলোড করা যায়নি (Failed to download image from source URL): ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }
  return args;
};

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'ছবি/মিডিয়া (Media)',
    plural: 'সব ছবিসমূহ (All Media)',
  },
  admin: {
    group: 'অন্যান্য (Others)',
    description: 'এখানে ওয়েবসাইটের সব ছবি আপলোড করে তার লিংক কপি করতে পারবেন। (Upload and manage all images here)',
  },
  hooks: {
    beforeOperation: [fetchImageFromUrl],
    afterChange: [revalidateCollection('media')],
    afterDelete: [revalidateCollection('media')],
  },
  access: {
    read: () => true,
    create: () => true, // Allow public uploads for reviews
  },
  upload: {
    staticDir: 'public/media',
    filesRequiredOnCreate: false,
    imageSizes: [
      {
        name: 'avatar',
        width: 128,
        height: 128,
        position: 'centre',
      },
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'sourceUrl',
      type: 'text',
      label: 'অনলাইন ছবির লিংক (Image URL - Optional)',
      admin: {
        description: 'এখানে অনলাইন ছবির লিংক দিলে তা সয়ংক্রিয়ভাবে ডাউনলোড হয়ে সেভ হবে। (Paste an image link here to automatically download and optimize it)',
      }
    },
    {
      name: 'alt',
      type: 'text',
      label: 'ছবির বর্ণনা (Alt Text)',
      required: true,
      admin: {
        description: 'ছবিটি কিসের তার একটি ছোট বর্ণনা দিন (SEO এর জন্য)।',
      }
    },
  ],
};
