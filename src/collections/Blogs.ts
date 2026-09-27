import type { CollectionConfig } from 'payload';
import { revalidateCollection } from '../lib/revalidate';

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  labels: {
    singular: 'ব্লগ (Blog)',
    plural: 'ব্লগসমূহ (Blogs)',
  },
  admin: {
    useAsTitle: 'internalTitle',
    group: 'কন্টেন্ট (Content)',
    description: 'এখানে আপনার ব্লগ ও আর্টিকেলগুলো যুক্ত করুন। (Manage blog posts here)',
  },
  hooks: {
    afterChange: [revalidateCollection('blogs')],
    afterDelete: [revalidateCollection('blogs')],
  },
  access: {
    read: () => true, // Publicly readable for frontend
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'বেসিক তথ্য (Basic Info)',
          fields: [
            {
              name: 'internalTitle',
              type: 'text',
              label: 'টাইটেল (Internal Title)',
              required: true,
              defaultValue: 'নতুন পোস্ট (New Post)',
              admin: {
                description: 'ড্যাশবোর্ডে পোস্টটি চেনার জন্য নাম (যেমন: My First Post)',
              }
            },
            {
              name: 'title',
              type: 'group',
              label: 'টাইটেল (Title)',
              fields: [
                { name: 'bn', type: 'text', label: 'টাইটেল (বাংলায়)', required: true, defaultValue: 'নতুন পোস্ট', admin: { description: 'পোস্টের শিরোনাম (Headline)' } },
                { name: 'en', type: 'text', label: 'Title (English)', admin: { description: 'Optional. English headline.' } },
              ]
            },
            {
              name: 'excerpt',
              type: 'group',
              label: 'সারাংশ (Excerpt)',
              admin: {
                description: 'পোস্টের ছোট একটি সারাংশ দিন যা কার্ডে দেখাবে।',
              },
              fields: [
                { name: 'en', type: 'textarea', label: 'Excerpt (English)' },
                { name: 'bn', type: 'textarea', label: 'Excerpt (Bengali)' },
              ]
            }
          ]
        },
        {
          label: 'কন্টেন্ট (Content)',
          fields: [
            {
              name: 'content',
              type: 'group',
              label: 'বিস্তারিত লেখা (Full Content)',
              fields: [
                { name: 'bn', type: 'richText', label: 'বিস্তারিত কন্টেন্ট (Bengali)', admin: { description: 'পোস্টের মূল লেখা এখানে দিন' } },
                { name: 'en', type: 'richText', label: 'Content (English)' },
              ]
            }
          ]
        },
        {
          label: 'ছবি ও অন্যান্য (Media & Settings)',
          fields: [
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              label: 'কভার ছবি (Cover Image)',
            },
            {
              name: 'publishedAt',
              type: 'date',
              label: 'প্রকাশের তারিখ (Published Date)',
              defaultValue: () => new Date(),
            }
          ]
        }
      ]
    }
  ],
};
