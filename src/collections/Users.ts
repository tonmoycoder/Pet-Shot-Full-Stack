import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    maxLoginAttempts: 10, // ১০ বার ভুল পাসওয়ার্ড দিলে তবেই লক হবে (আগে ডিফল্ট ৫ ছিল)
    lockTime: 5 * 60 * 1000, // লক হলে মাত্র ৫ মিনিট পর অটো আনলক হবে
  },
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
