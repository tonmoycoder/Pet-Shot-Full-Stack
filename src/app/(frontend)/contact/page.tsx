import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { ContactClient } from "./contact-client";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";

export const revalidate = 60;

export const metadata = {
  title: "যোগাযোগ (Contact Us)",
  description: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম-এর সাথে যোগাযোগ করুন। বড় বাজার, চুয়াডাঙ্গা। ফোন ও WhatsApp: +880 1947-315330। সরাসরি স্টোর ভিজিট বা অনলাইন পরামর্শ।",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "যোগাযোগ (Contact Us) | Bismillah Pakhi & Aquarium",
    description: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম-এর সাথে যোগাযোগ করুন। বড় বাজার, চুয়াডাঙ্গা।",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "যোগাযোগ (Contact Us) | Bismillah Pakhi & Aquarium",
    description: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম-এর সাথে যোগাযোগ করুন। বড় বাজার, চুয়াডাঙ্গা।",
  },
};

export default async function ContactPage() {
  let settingsRes = {};
  
  try {
    const payload = await getPayload({ config: configPromise });
    const settingsResult = await payload.findGlobal({ slug: 'store-settings' });
    settingsRes = settingsResult || {};
  } catch (error) {
    console.error("Failed to fetch store-settings", error);
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "হোম", url: "/" },
          { name: "যোগাযোগ", url: "/contact" },
        ]}
      />
      <ContactClient storeSettings={settingsRes} />
    </>
  );
}
