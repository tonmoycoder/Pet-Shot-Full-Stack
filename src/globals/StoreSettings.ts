import { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../lib/revalidate';

const HOURS = Array.from({ length: 12 }, (_, i) => {
  const h = i + 1;
  return { label: `${h}`, value: `${h}` };
});

const MINUTES = ['00', '15', '30', '45'].map(m => ({ label: m, value: m }));
const PERIOD = [{ label: 'AM', value: 'AM' }, { label: 'PM', value: 'PM' }];

export const StoreSettings: GlobalConfig = {
  slug: 'store-settings',
  label: 'সাধারণ সেটিংস (Store Settings)',
  admin: {
    group: 'দোকানের সেটিংস (Store Settings)',
    description: 'এখানে দোকানের ব্র্যান্ডিং, লোগো, ফেসবুক পেজ, ঠিকানা, ফোন নাম্বার এবং খোলার সময় পরিবর্তন করতে পারবেন।',
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.hours?.openHour && data?.hours?.closeHour) {
          const h = data.hours;
          data.hours.openingTime = `${h.openHour}:${h.openMinute || '00'} ${h.openPeriod || 'AM'} - ${h.closeHour}:${h.closeMinute || '00'} ${h.closePeriod || 'PM'}`;
        }
        return data;
      }
    ],
    afterChange: [revalidateGlobal('store-settings')],
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'ব্র্যান্ডিং ও লোগো (Branding & Logo)',
          fields: [
            {
              name: 'branding',
              type: 'group',
              label: 'ব্র্যান্ড লোগো ও মিডিয়া',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'দোকানের লোগো (Store Logo Media)',
                  required: false,
                  admin: {
                    description: 'নতুন লোগো আপলোড করুন। খালি থাকলে ডিফল্ট /images/logo.webp ব্যবহৃত হবে।',
                  },
                },
                {
                  name: 'logoUrl',
                  type: 'text',
                  label: 'লোগো ইমেজ লিঙ্ক (Logo Image URL Fallback)',
                  defaultValue: '/images/logo_shop.webp',
                  admin: {
                    description: 'বাহ্যিক বা লোকাল লোগো লিঙ্ক (যেমন: /images/logo_shop.webp বা https://...)',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'যোগাযোগ ও সোশ্যাল (Contact & Social)',
          fields: [
            {
              name: 'contact',
              type: 'group',
              label: 'যোগাযোগের মাধ্যম',
              fields: [
                {
                  name: 'storeFacebookPageUrl',
                  type: 'text',
                  label: 'দোকানের ফেসবুক পেজ লিংক (Store Facebook Page URL)',
                  required: true,
                  defaultValue: 'https://www.facebook.com/bismillahpakhiandaquarium',
                  admin: {
                    description: 'দোকানের অফিসিয়াল ফেসবুক পেজের লিঙ্ক (যেমন: https://www.facebook.com/bismillahpakhiandaquarium)',
                  },
                },
                {
                  name: 'whatsappNumber',
                  type: 'text',
                  label: 'হোয়াটসঅ্যাপ নাম্বার (WhatsApp Number)',
                  required: true,
                  defaultValue: '8801947315330',
                  admin: {
                    description: 'দেশ কোড সহ দিন (যেমন: 8801947315330)',
                  },
                },
                {
                  name: 'phoneNumber',
                  type: 'text',
                  label: 'দেখানোর জন্য ফোন নাম্বার (Display Phone Number)',
                  required: true,
                  defaultValue: '+880 1947-315330',
                  admin: {
                    description: 'ওয়েবসাইটে যেভাবে দেখাবে (যেমন: +880 1947-315330)',
                  },
                },
                {
                  name: 'emailAddress',
                  type: 'text',
                  label: 'ইমেইল ঠিকানা (Email Address)',
                  required: true,
                  defaultValue: 'info@bismillahpakhi.com',
                  admin: {
                    description: 'যোগাযোগের ইমেইল (যেমন: info@bismillahpakhi.com)',
                  },
                },
                {
                  name: 'adminEmail',
                  type: 'email',
                  label: '📧 Contact Form Inbox — Admin Email',
                  required: false,
                  admin: {
                    description: 'কন্টাক্ট ফর্মের সকল মেসেজ এই ইমেইলে আসবে। খালি রাখলে emailAddress ব্যবহার হবে।',
                    placeholder: 'admin@bismillahpakhi.com',
                  },
                },
                {
                  name: 'liveVideoConsultationUrl',
                  type: 'text',
                  label: 'লাইভ ভিডিও কনসালটেশন লিংক (Live Video Consultation URL)',
                  required: false,
                  defaultValue: 'https://wa.me/8801947315330?text=Live%20Video%20Consultation%20Request',
                  admin: {
                    description: 'হোয়াটসঅ্যাপ লাইভ ভিডিও কনসালটেশন লিঙ্ক',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'ঠিকানা (Location)',
          fields: [
            {
              name: 'location',
              type: 'group',
              label: 'দোকানের ঠিকানা',
              fields: [
                {
                  name: 'address',
                  type: 'text',
                  label: 'ঠিকানা (Address)',
                  required: true,
                  defaultValue: 'সাত ভাই পুকুড় পাড়, আব্দুল্লাহ সিটির পিছনে, বড় বাজার, চুয়াডাঙ্গা',
                },
                {
                  name: 'googleMapsLink',
                  type: 'text',
                  label: 'গুগল ম্যাপস লিংক (Google Maps Link)',
                  required: true,
                  defaultValue: 'https://maps.google.com/?q=Boro+Bazar+Chuadanga',
                },
              ],
            },
          ],
        },
        {
          label: 'সময়সূচী (Hours)',
          description: 'দোকান খোলা ও বন্ধের সময় এখানে সেট করুন। এই সময়ের উপর ভিত্তি করে ওয়েবসাইটে "এখন খোলা" / "বন্ধ আছে" দেখাবে।',
          fields: [
            {
              name: 'hours',
              type: 'group',
              label: 'দোকান খোলার সময়সূচী',
              fields: [
                // ── Opening Time ──────────────────────────────────────
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'openHour',
                      type: 'select',
                      label: 'খোলার সময় — ঘণ্টা (Opening Hour)',
                      defaultValue: '9',
                      options: HOURS,
                      required: true,
                      admin: {
                        width: '30%',
                        description: 'ঘণ্টা বেছে নিন',
                      },
                    },
                    {
                      name: 'openMinute',
                      type: 'select',
                      label: 'মিনিট (Minute)',
                      defaultValue: '00',
                      options: MINUTES,
                      required: true,
                      admin: {
                        width: '30%',
                        description: 'মিনিট বেছে নিন',
                      },
                    },
                    {
                      name: 'openPeriod',
                      type: 'select',
                      label: 'AM / PM',
                      defaultValue: 'AM',
                      options: PERIOD,
                      required: true,
                      admin: {
                        width: '30%',
                      },
                    },
                  ],
                },
                // ── Closing Time ──────────────────────────────────────
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'closeHour',
                      type: 'select',
                      label: 'বন্ধের সময় — ঘণ্টা (Closing Hour)',
                      defaultValue: '9',
                      options: HOURS,
                      required: true,
                      admin: {
                        width: '30%',
                        description: 'ঘণ্টা বেছে নিন',
                      },
                    },
                    {
                      name: 'closeMinute',
                      type: 'select',
                      label: 'মিনিট (Minute)',
                      defaultValue: '00',
                      options: MINUTES,
                      required: true,
                      admin: {
                        width: '30%',
                        description: 'মিনিট বেছে নিন',
                      },
                    },
                    {
                      name: 'closePeriod',
                      type: 'select',
                      label: 'AM / PM',
                      defaultValue: 'PM',
                      options: PERIOD,
                      required: true,
                      admin: {
                        width: '30%',
                      },
                    },
                  ],
                },
                // ── Display label (used in UI) ─────────────────────────
                {
                  name: 'openingTime',
                  type: 'text',
                  label: 'সময় — যেভাবে ওয়েবসাইটে দেখাবে (Display Label)',
                  admin: {
                    readOnly: true,
                    description: '⚠️ এটি স্বয়ংক্রিয়ভাবে তৈরি হবে (Auto-generated)। উপরের ড্রপডাউন থেকে সময় সেট করুন।',
                  },
                },
                {
                  name: 'daysOpen',
                  type: 'text',
                  label: 'খোলার দিন (Days Open)',
                  required: true,
                  defaultValue: 'প্রতিদিন (Everyday)',
                  admin: {
                    description: 'উদাহরণ: প্রতিদিন অথবা সোম-শুক্র',
                  },
                },
                // ── Manual override ───────────────────────────────────
                {
                  name: 'isManualOverride',
                  type: 'checkbox',
                  label: 'ম্যানুয়াল স্ট্যাটাস চালু করুন (Override Auto Status)',
                  defaultValue: false,
                  admin: {
                    description: 'এটা চালু করলে সময়ের হিসাব না করে নিচের স্ট্যাটাস দেখাবে।',
                  },
                },
                {
                  name: 'manualStatus',
                  type: 'select',
                  label: 'ম্যানুয়াল স্ট্যাটাস (Manual Status)',
                  options: [
                    { label: '🟢 খোলা (Open)', value: 'open' },
                    { label: '🔴 বন্ধ (Closed)', value: 'closed' },
                  ],
                  defaultValue: 'open',
                  admin: {
                    condition: (data, siblingData) => siblingData?.isManualOverride === true,
                    description: 'যখন Override চালু থাকবে, তখন এই স্ট্যাটাস দেখাবে।',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
