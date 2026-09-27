import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const metadata = {
  title: "Contact Us - Pet Shop",
  description: "Get in touch with us for any inquiries about our pets or services.",
};

export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise });
  const settings = await payload.findGlobal({
    slug: "store-settings",
  });

  const address = settings?.location?.address || "১২৩ পেট স্ট্রিট, মিরপুর, ঢাকা, বাংলাদেশ";
  const mapLink = settings?.location?.googleMapsLink || "#";
  const phone = settings?.contact?.phoneNumber || "+880 1947 315330";
  const email = settings?.contact?.emailAddress || "info@petshop.com";

  return (
    <div className="min-h-screen bg-[#ddf1fa] dark:bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bangla font-bold text-[#09334F] dark:text-zinc-100 mb-4">
            যোগাযোগ করুন
          </h1>
          <p className="text-lg text-[#265D85] dark:text-zinc-400 font-bangla">
            আপনার যেকোনো প্রশ্ন বা মতামতের জন্য আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-lg border border-white/50 dark:border-zinc-800">
            <h2 className="text-2xl font-bold font-bangla text-[#09334F] dark:text-zinc-100 mb-6">
              আমাদের ঠিকানা
            </h2>
            
            <div className="flex items-start space-x-4">
              <div className="bg-[#67B1E0]/20 p-3 rounded-full text-[#265D85] dark:text-[#67B1E0]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 font-bangla">ঠিকানা</h3>
                <a href={mapLink} target="_blank" rel="noopener noreferrer" className="text-zinc-600 dark:text-zinc-400 mt-1 font-bangla hover:text-[#265D85] dark:hover:text-[#67B1E0] transition-colors block">
                  {address}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#67B1E0]/20 p-3 rounded-full text-[#265D85] dark:text-[#67B1E0]">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 font-bangla">ফোন</h3>
                <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="text-zinc-600 dark:text-zinc-400 mt-1 hover:text-[#265D85] dark:hover:text-[#67B1E0] font-sans block transition-colors">
                  {phone}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#67B1E0]/20 p-3 rounded-full text-[#265D85] dark:text-[#67B1E0]">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 font-bangla">ইমেইল</h3>
                <a href={`mailto:${email}`} className="text-zinc-600 dark:text-zinc-400 mt-1 hover:text-[#265D85] dark:hover:text-[#67B1E0] font-sans block transition-colors">
                  {email}
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-lg border border-white/50 dark:border-zinc-800">
            <h2 className="text-2xl font-bold font-bangla text-[#09334F] dark:text-zinc-100 mb-6">
              মেসেজ পাঠান
            </h2>
            <form className="space-y-4" action={`mailto:${email}`} method="GET">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1 font-bangla">আপনার নাম</label>
                <input 
                  type="text" 
                  name="subject"
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-[#67B1E0] outline-none transition-all dark:text-zinc-100"
                  placeholder="আপনার নাম লিখুন"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1 font-bangla">আপনার মেসেজ</label>
                <textarea 
                  name="body"
                  required 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-[#67B1E0] outline-none transition-all resize-none dark:text-zinc-100"
                  placeholder="আপনার মেসেজ লিখুন..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-[#265D85] hover:bg-[#09334F] text-white font-bold py-3 px-6 rounded-xl transition-colors font-bangla text-lg mt-2"
              >
                পাঠিয়ে দিন
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
