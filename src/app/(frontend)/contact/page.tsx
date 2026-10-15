import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { ContactClient } from "./contact-client";

export const revalidate = 60;

export const metadata = {
  title: "যোগাযোগ (Contact Us)",
  description: "Reach out to us for any inquiries about our pets or services.",
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

  return <ContactClient storeSettings={settingsRes} />;
}
