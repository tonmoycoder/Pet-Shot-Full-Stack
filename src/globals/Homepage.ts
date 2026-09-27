import { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../lib/revalidate';

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'হোমপেজ (Homepage)',
  admin: {
    group: 'ওয়েবসাইটের পেজ (Website Pages)',
    description: 'হোমপেজের বিভিন্ন সেকশনের ছবি পরিবর্তন করুন।',
  },
  hooks: {
    afterChange: [revalidateGlobal('homepage')],
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'হিরো সেকশন (Hero Section)',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'হিরো সেকশনের ব্যাকগ্রাউন্ড ছবি (Hero Background Image)',
              required: false,
              admin: {
                description: 'হোমপেজে সবার উপরে যে ছবিটা থাকে (ডেস্কটপ এবং মোবাইল)।',
              }
            },
          ]
        },
        {
          label: 'ক্যাটাগরি ছবি (Discovery Cards)',
          fields: [
            {
              name: 'discoveryCards',
              type: 'group',
              label: 'ক্যাটাগরি বেন্টো কার্ড (Bento Cards)',
              admin: {
                description: 'হোমপেজের ক্যাটাগরি গ্রিডের ছবিগুলো (পাখি, মাছ, খাবার, অ্যাক্সেসরিজ)।',
              },
              fields: [
                {
                  name: 'birdsImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'পাখির ক্যাটাগরির ছবি (Birds Image)',
                  required: false,
                },
                {
                  name: 'aquariumImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'অ্যাকোয়ারিয়াম ক্যাটাগরির ছবি (Aquarium Image)',
                  required: false,
                },
                {
                  name: 'foodImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'খাবারের ক্যাটাগরির ছবি (Food Image)',
                  required: false,
                },
                {
                  name: 'accessoriesImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'অ্যাক্সেসরিজ ক্যাটাগরির ছবি (Accessories Image)',
                  required: false,
                }
              ]
            }
          ]
        }
      ]
    }
  ],
};
