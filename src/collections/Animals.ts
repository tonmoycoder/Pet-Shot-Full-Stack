import type { CollectionConfig } from 'payload';
import { revalidateCollection } from '../lib/revalidate';

export const Animals: CollectionConfig = {
  slug: 'animals',
  labels: {
    singular: 'প্রাণী (Animal)',
    plural: 'প্রাণীসমূহ (Animals)',
  },
  admin: {
    useAsTitle: 'internalName',
    defaultColumns: ['internalName', 'category', 'status', 'price'],
    group: 'দোকানের ইনভেন্টরি (Store Inventory)',
    description: 'এখানে আপনার দোকানের সমস্ত প্রাণী (পাখি, মাছ, ইত্যাদি) যোগ বা এডিট করতে পারবেন। যেকোনো প্রাণী আপডেট করার সময় খেয়াল রাখবেন যেন প্রধান তথ্যগুলো সঠিক থাকে। (Manage your pets here seamlessly)',
  },
  hooks: {
    afterChange: [revalidateCollection('animals')],
    afterDelete: [revalidateCollection('animals')],
  },
  access: {
    read: () => true, // Publicly readable for frontend
  },
  // ── CSV Bulk Import (Payload built-in) ──────────────────────
  upload: undefined,
  fields: [
    // ── CSV Upload helper note (admin-only UI hint via description) ──
    // {
    //   name: '_csvHint',
    //   type: 'ui',
    //   label: '📥 বাল্ক CSV আপলোড',
    //   admin: {
    //     components: {
    //       // Payload renders this in the list view description area
    //     },
    //     // description is not allowed on ui field admin config
    //     position: 'sidebar',
    //   },
    // },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'সাধারণ তথ্য (General Info)',
          description: 'প্রাণীর প্রাথমিক তথ্য সেট করুন।',
          fields: [
            {
              name: 'internalName',
              type: 'text',
              label: 'প্রাণীর নাম (Internal Name)',
              admin: {
                description: 'ড্যাশবোর্ডে চেনার জন্য একটি নাম দিন (যেমন: Cockatiel Yellow)।',
              },
              required: true,
              defaultValue: 'নতুন প্রাণী (New Animal)',
            },
            {
              name: 'category',
              type: 'select',
              label: 'ক্যাটাগরি (Category)',
              options: [
                { label: '🐦 পাখি (Bird)', value: 'bird' },
                { label: '🐟 মাছ (Fish)', value: 'fish' },
                { label: '📦 অন্যান্য (Other)', value: 'other' },
              ],
              required: true,
            },
            {
              name: 'status',
              type: 'select',
              label: 'বর্তমান অবস্থা (Status)',
              options: [
                { label: '✅ এভেইলএবল (Available)', value: 'available' },
                { label: '❌ স্টক আউট (Sold Out)', value: 'sold_out' },
              ],
              defaultValue: 'available',
              required: true,
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
              label: 'প্রাণীর নাম (Name)',
              fields: [
                { name: 'bn', type: 'text', label: 'নাম (বাংলায়)', required: true, defaultValue: 'নাম নেই', admin: { description: 'যেমন: কোকাটেল পাখি' } },
                { name: 'en', type: 'text', label: 'Name (English)', admin: { description: 'Optional. e.g., Cockatiel Bird' } },
              ]
            },
            {
              name: 'description',
              type: 'group',
              label: 'বিস্তারিত বিবরণ (Description)',
              fields: [
                { name: 'bn', type: 'textarea', label: 'বিবরণ (বাংলায়)', admin: { description: 'এই প্রাণীর যত্ন বা বৈশিষ্ট্য সম্পর্কে বিস্তারিত লিখুন।' } },
                { name: 'en', type: 'textarea', label: 'Description (English)' },
              ]
            },
          ]
        },
        {
          label: 'দাম ও ট্যাগ (Price & Tag)',
          fields: [
            {
              name: 'price',
              type: 'group',
              label: 'বিক্রয় মূল্য (Price)',
              admin: {
                description: 'কত দামে বিক্রি করবেন তা উল্লেখ করুন, অথবা "দামের জন্য যোগাযোগ করুন" লিখে রাখতে পারেন।',
              },
              fields: [
                { name: 'bn', type: 'text', label: 'দাম (বাংলায়)', required: true, defaultValue: 'দামের জন্য যোগাযোগ করুন' },
                { name: 'en', type: 'text', label: 'Price (English)', defaultValue: 'Contact for price' },
              ]
            },
            {
              name: 'tag',
              type: 'group',
              label: 'ট্যাগ / ব্যাজ (Badge)',
              admin: {
                description: 'ছবির ওপরে ছোট্ট ব্যাজ হিসেবে দেখানোর জন্য (যেমন: Rare, Popular, New Arrival)। চাইলে খালি রাখতে পারেন।',
              },
              fields: [
                { name: 'bn', type: 'text', label: 'ট্যাগ (বাংলায়)', defaultValue: 'পাওয়া যাচ্ছে' },
                { name: 'en', type: 'text', label: 'Tag (English)', defaultValue: 'Available' },
              ]
            },
            {
              name: 'isFeatured',
              type: 'checkbox',
              label: '⭐ বিশেষ সংগ্রহে দেখান (Show in Featured Section)',
              defaultValue: true,
              admin: {
                description: 'চেক করা থাকলে হোমপেজের "আমাদের বিশেষ সংগ্রহ" সেকশনে দেখাবে।',
              },
            },
          ]
        },
        {
          label: 'ছবি (Images)',
          description: 'মিডিয়া (Media) সেকশন থেকে লিংক কপি করে এখানে বসান।',
          fields: [
            {
              name: 'image',
              type: 'text',
              label: 'প্রধান ছবির লিংক (Main Image URL)',
              admin: {
                description: 'যে ছবিটি সবার আগে দেখানো হবে (e.g., /images/cockatiel.jpg)',
              },
              required: true,
              defaultValue: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80',
            },
            {
              name: 'objectPosition',
              type: 'text',
              label: 'Image Alignment (CSS Object Position)',
              defaultValue: 'center center',
              admin: {
                description: 'ছবি কিভাবে ফিট হবে (যেমন: center center, top center, center 30%)',
              },
              required: true,
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
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  label: 'ছবির লিংক (Image URL)'
                }
              ]
            }
          ]
        }
      ]
    }
  ],
};
