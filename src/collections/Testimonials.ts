import type { CollectionConfig } from 'payload';
import { revalidateCollection } from '../lib/revalidate';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'রিভিউ (Testimonial)',
    plural: 'রিভিউসমূহ (Testimonials)',
  },
  admin: {
    useAsTitle: 'authorName',
    group: 'গ্রাহক ও রিভিউ (Customers)',
    description: 'গ্রাহকদের রিভিউ এবং মতামত এখানে পরিচালনা করুন। (Manage customer testimonials)',
  },
  hooks: {
    afterChange: [revalidateCollection('testimonials')],
    afterDelete: [revalidateCollection('testimonials')],
  },
  access: {
    read: () => true, // Publicly readable for frontend
    create: () => true, // Anyone can submit a review
    update: ({ req: { user } }) => Boolean(user), // Only admins can update
    delete: ({ req: { user } }) => Boolean(user), // Only admins can delete
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      label: 'স্ট্যাটাস (Status)',
      options: [
        { label: 'পেন্ডিং (Pending)', value: 'pending' },
        { label: 'অনুমোদিত (Approved)', value: 'approved' },
        { label: 'বাতিল (Rejected)', value: 'rejected' },
      ],
      defaultValue: 'pending',
      admin: {
        position: 'sidebar',
        description: 'অনুমোদিত হলে ফ্রন্টএন্ডে দেখাবে (Will show on frontend if approved)',
      }
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'রিভিউয়ের বিস্তারিত (Review Details)',
          fields: [
            {
              name: 'authorName',
              type: 'text',
              label: 'গ্রাহকের নাম (Author Name)',
              required: true,
              defaultValue: 'নতুন গ্রাহক (New Customer)',
            },
            {
              name: 'authorRole',
              type: 'group',
              label: 'গ্রাহকের পদবি বা ধরন (Author Role)',
              fields: [
                { name: 'en', type: 'text', label: 'Role (English) e.g., Happy Customer' },
                { name: 'bn', type: 'text', label: 'Role (Bengali) e.g., সন্তুষ্ট গ্রাহক' },
              ]
            },
            {
              name: 'content',
              type: 'group',
              label: 'মতামত (Content)',
              fields: [
                { name: 'bn', type: 'textarea', label: 'রিভিউ (বাংলায়)', required: true, defaultValue: 'খুবই ভালো সার্ভিস পেয়েছি!', admin: { description: 'গ্রাহকের মতামত হুবহু লিখুন' } },
                { name: 'en', type: 'textarea', label: 'Content (English)', admin: { description: 'Optional translation' } },
              ]
            },
            {
              name: 'rating',
              type: 'number',
              label: 'রেটিং (Rating 1-5)',
              required: true,
              defaultValue: 5,
              min: 1,
              max: 5,
            },
          ]
        },
        {
          label: 'ছবি (Author Image)',
          fields: [
            {
              name: 'authorImage',
              type: 'upload',
              relationTo: 'media',
              label: 'গ্রাহকের ছবি (Author Image)',
              admin: {
                description: 'গ্রাহকের ছবি আপলোড করুন।',
              }
            }
          ]
        }
      ]
    }
  ],
};
