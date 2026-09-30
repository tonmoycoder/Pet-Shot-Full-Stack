import type { CollectionConfig, CollectionBeforeValidateHook } from 'payload';
import { revalidateCollection } from '../lib/revalidate';

const fetchImageFromUrl: CollectionBeforeValidateHook = async ({ data, req }) => {
  if (data?.sourceUrl) {
    try {
      const response = await fetch(data.sourceUrl);
      if (!response.ok) throw new Error('Failed to fetch image');
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const mimeType = response.headers.get('content-type') || 'image/jpeg';
      let filename = data.sourceUrl.split('/').pop()?.split('?')[0] || 'downloaded-image';
      if (!filename.includes('.')) {
        filename += mimeType === 'image/webp' ? '.webp' : mimeType === 'image/png' ? '.png' : '.jpg';
      }

      req.files = {
        file: {
          data: buffer,
          mimetype: mimeType,
          name: filename,
          size: buffer.length,
        },
      };
    } catch (error) {
      console.error('Error fetching image from URL:', error);
    }
  }
  return data;
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
    beforeValidate: [fetchImageFromUrl],
    afterChange: [revalidateCollection('media')],
    afterDelete: [revalidateCollection('media')],
  },
  access: {
    read: () => true,
    create: () => true, // Allow public uploads for reviews
  },
  upload: {
    staticDir: 'public/media',
    imageSizes: [
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
