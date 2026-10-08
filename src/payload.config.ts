import { buildConfig } from 'payload';
import sharp from 'sharp';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import path from 'path';
import { fileURLToPath } from 'url';

import { Users } from './collections/Users';
import { Animals } from './collections/Animals';
import { Products } from './collections/Products';
import { Media } from './collections/Media';
import { Testimonials } from './collections/Testimonials';
import { Blogs } from './collections/Blogs';
import { StoreSettings } from './globals/StoreSettings';
import { Homepage } from './globals/Homepage';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  sharp,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Pet Shop Admin',
    },
    components: {
      graphics: {
        Logo: '@/components/admin/CustomGraphics#CustomLogo',
        Icon: '@/components/admin/CustomGraphics#CustomIcon',
      },
      afterNavLinks: [
        '@/components/admin/ThemeToggle#ThemeToggle',
        '@/components/admin/BulkUploadLink#BulkUploadLink',
      ],
      views: {
        BulkUpload: {
          Component: '@/components/admin/BulkUploadView#BulkUploadView',
          path: '/bulk-upload',
        },
      },
      providers: [
        '@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler'
      ],
    },
  },
  collections: [
    Users,
    Animals,
    Products,
    Media,
    Testimonials,
    Blogs,
  ],
  globals: [
    StoreSettings,
    Homepage,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'secret-key-for-development-only',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgres://postgres:postgres@127.0.0.1:5432/petshop',
    },
    // Auto-migrate schema changes on production startup
    // This fixes missing columns like _objectkey, thumbnail_url in media table
    push: false,
    migrationDir: './src/migrations',
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    ...(process.env.S3_ENDPOINT && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.S3_BUCKET || 'media',
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
              },
              endpoint: process.env.S3_ENDPOINT,
              region: process.env.S3_REGION || 'auto',
              forcePathStyle: true,
            },
          }),
        ]
      : [
          vercelBlobStorage({
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN || 'dummy_token_to_force_importmap_generation',
          }),
        ]),
  ],
});
