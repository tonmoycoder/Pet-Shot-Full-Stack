import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  labels: {
    singular: 'ইউজার (User)',
    plural: 'অ্যাডমিন ইউজার (Admin Users)',
  },
  admin: {
    useAsTitle: 'email',
    group: 'গ্রাহক ও রিভিউ (Customers)',
    description: 'যারা এই ড্যাশবোর্ডে লগইন করতে পারবেন তাদের ইমেইল ও পাসওয়ার্ড।',
  },
  fields: [
    // Email added by default
  ],
};
