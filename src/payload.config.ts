import { buildConfig } from 'payload';
import sharp from 'sharp';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
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
    // Auto-push schema changes to DB — new columns (isFeatured, time fields) get added automatically
    push: true,
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
