import type { CollectionConfig } from 'payload';
import { revalidateCollection } from '../lib/revalidate';

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'পণ্য (Product)',
    plural: 'পণ্যসমূহ (Products)',
  },
  admin: {
    useAsTitle: 'internalName',
    defaultColumns: ['internalName', 'category', 'status'],
    group: 'দোকানের ইনভেন্টরি (Store Inventory)',
    description: 'এখানে খাবার, খাঁচা এবং অন্যান্য পণ্য যোগ বা এডিট করুন। (Manage food, accessories, and medicines here)',
  },
  hooks: {
    afterChange: [revalidateCollection('products')],
    afterDelete: [revalidateCollection('products')],
  },
  access: {
    read: () => true, // Publicly readable for frontend
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'সাধারণ তথ্য (General Info)',
          description: 'পণ্যের প্রাথমিক তথ্য সেট করুন। (Basic product settings)',
          fields: [
            {
              name: 'internalName',
              type: 'text',
              label: 'প্রোডাক্টের নাম (Internal Name)',
              admin: {
                description: 'ড্যাশবোর্ডে চেনার জন্য একটি নাম দিন। (For dashboard use only)',
              },
              required: true,
              defaultValue: 'নতুন পণ্য (New Product)',
            },
            {
              name: 'category',
              type: 'select',
              label: 'ক্যাটাগরি (Category)',
              options: [
                { label: 'খাবার (Food)', value: 'food' },
                { label: 'অ্যাক্সেসরিজ (Accessories)', value: 'accessories' },
                { label: 'ওষুধ (Medicine)', value: 'medicine' },
                { label: 'অন্যান্য (Other)', value: 'other' },
              ],
              required: true,
            },
            {
              name: 'status',
              type: 'select',
              label: 'বর্তমান অবস্থা (Status)',
              options: [
                { label: 'ইন স্টক (In Stock)', value: 'in_stock' },
                { label: 'স্টক আউট (Out of Stock)', value: 'out_of_stock' },
              ],
              defaultValue: 'in_stock',
              required: true,
            },
            {
              name: 'isRareExotic',
              type: 'checkbox',
              label: 'এক্সক্লুসিভ কালেকশন (Rare & Exotic)?',
              admin: {
                description: 'হোমপেজে এক্সক্লুসিভ সেকশনে দেখাতে এখানে টিক দিন। (Check to feature in Rare & Exotic collection)',
              },
              defaultValue: false,
            },
          ]
        },
        {
          label: 'নাম ও বিবরণ (Name & Details)',
          description: 'ওয়েবসাইটে কাস্টমাররা কী নাম এবং বিবরণ দেখতে পাবেন তা এখানে ঠিক করুন। (Customer-facing details)',
          fields: [
            {
              name: 'name',
              type: 'group',
              label: 'পণ্যের নাম (Name)',
              fields: [
                { name: 'bn', type: 'text', label: 'নাম (বাংলায়)', required: true, defaultValue: 'নাম নেই', admin: { description: 'যেমন: পাখির মিক্সড খাবার' } },
                { name: 'en', type: 'text', label: 'Name (English)', admin: { description: 'Optional. e.g., Bird Mixed Seed' } },
              ]
            },
            {
              name: 'description',
              type: 'group',
              label: 'বিস্তারিত বিবরণ (Description)',
              fields: [
                { name: 'bn', type: 'textarea', label: 'বিবরণ (বাংলায়)', admin: { description: 'পণ্যের সুবিধা, উপাদান বা ব্যবহারের নিয়ম লিখুন।' } },
                { name: 'en', type: 'textarea', label: 'Description (English)' },
              ]
            }
          ]
        },
        {
          label: 'দাম (Price)',
          fields: [
            {
              name: 'price',
              type: 'group',
              label: 'বিক্রয় মূল্য (Price)',
              admin: {
                description: 'কত দামে বিক্রি করবেন তা উল্লেখ করুন, অথবা "যোগাযোগ করুন" লিখে রাখতে পারেন।',
              },
              fields: [
                { name: 'bn', type: 'text', label: 'দাম (বাংলায়)', required: true, defaultValue: 'যোগাযোগ করুন' },
                { name: 'en', type: 'text', label: 'Price (English)', defaultValue: 'Contact us' },
              ]
            }
          ]
        },
        {
          label: 'ছবি (Images)',
          description: 'মিডিয়া (Media) থেকে ছবির লিংক কপি করে এখানে বসান।',
          fields: [
            {
              name: 'image',
              type: 'text',
              label: 'প্রধান ছবির লিংক (Main Image URL)',
              admin: {
                description: 'যে ছবিটি সবার আগে দেখানো হবে (e.g., /images/seed.jpg)',
              },
              required: true,
              defaultValue: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80',
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'অতিরিক্ত ছবি (Image Gallery)',
              labels: {
                singular: 'ছবি (Image)',
                plural: 'ছবিসমূহ (Images)',
              },
              fields: [
                { name: 'url', type: 'text', required: true, label: 'ছবির লিংক (Image URL)' }
              ]
            }
          ]
        }
      ]
    }
  ],
};
