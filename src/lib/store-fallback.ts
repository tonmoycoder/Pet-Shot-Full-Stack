/**
 * Centralized Store Fallback & Configuration
 * Ensures 100% Zero-Breakage when Payload CMS backend is offline,
 * cold-starting, or fields are unpopulated.
 */

export interface StoreSettingsData {
  branding?: {
    logo?: any;
    logoUrl?: string;
    logoFaviconUrl?: string;
  };
  contact?: {
    whatsappNumber?: string;
    phoneNumber?: string;
    emailAddress?: string;
    contactFormInbox?: string;
    storeFacebookPageUrl?: string;
    liveVideoConsultationUrl?: string;
  };
  location?: {
    address?: string;
    googleMapsLink?: string;
  };
  hours?: {
    openHour?: string;
    openMinute?: string;
    openPeriod?: string;
    closeHour?: string;
    closeMinute?: string;
    closePeriod?: string;
    openingTime?: string;
    daysOpen?: string;
    isManualOverride?: boolean;
    manualStatus?: "open" | "closed";
  };
}

export const STORE_FALLBACK: StoreSettingsData = {
  branding: {
    logoUrl: "/images/logo_shop.webp",
    logoFaviconUrl: "/images/favicon.webp",
  },
  contact: {
    whatsappNumber: "8801947315330",
    phoneNumber: "+880 1947-315330",
    emailAddress: "info@bismillahpakhi.com",
    contactFormInbox: "admin@bismillahpakhi.com",
    storeFacebookPageUrl: "https://www.facebook.com/bismillahpakhiandaquarium",
    liveVideoConsultationUrl: "https://wa.me/8801947315330?text=Live%20Video%20Consultation%20Request",
  },
  location: {
    address: "সাত ভাই পুকুড় পাড়, আব্দুল্লাহ সিটির পিছনে, বড় বাজার, চুয়াডাঙ্গা",
    googleMapsLink: "https://maps.google.com/?q=Boro+Bazar+Chuadanga",
  },
  hours: {
    openHour: "9",
    openMinute: "00",
    openPeriod: "AM",
    closeHour: "9",
    closeMinute: "00",
    closePeriod: "PM",
    openingTime: "9:00 AM - 9:00 PM",
    daysOpen: "প্রতিদিন (Everyday)",
    isManualOverride: false,
    manualStatus: "open",
  },
};

/**
 * Merge fetched dynamic settings with fallback defaults safely
 */
export function getSafeStoreSettings(dynamicSettings?: Partial<StoreSettingsData> | null): StoreSettingsData {
  if (!dynamicSettings) return STORE_FALLBACK;

  let logoUrl = STORE_FALLBACK.branding?.logoUrl;
  if (dynamicSettings.branding?.logo && typeof dynamicSettings.branding.logo === 'object' && dynamicSettings.branding.logo.url) {
    logoUrl = dynamicSettings.branding.logo.url;
  } else if (dynamicSettings.branding?.logoUrl) {
    logoUrl = dynamicSettings.branding.logoUrl;
  }

  return {
    branding: {
      logo: dynamicSettings.branding?.logo,
      logoUrl: logoUrl || STORE_FALLBACK.branding?.logoUrl,
      logoFaviconUrl: dynamicSettings.branding?.logoFaviconUrl || STORE_FALLBACK.branding?.logoFaviconUrl,
    },
    contact: {
      whatsappNumber: dynamicSettings.contact?.whatsappNumber || STORE_FALLBACK.contact?.whatsappNumber,
      phoneNumber: dynamicSettings.contact?.phoneNumber || STORE_FALLBACK.contact?.phoneNumber,
      emailAddress: dynamicSettings.contact?.emailAddress || STORE_FALLBACK.contact?.emailAddress,
      contactFormInbox: dynamicSettings.contact?.contactFormInbox || dynamicSettings.contact?.emailAddress || STORE_FALLBACK.contact?.contactFormInbox,
      storeFacebookPageUrl: dynamicSettings.contact?.storeFacebookPageUrl || STORE_FALLBACK.contact?.storeFacebookPageUrl,
      liveVideoConsultationUrl: dynamicSettings.contact?.liveVideoConsultationUrl || STORE_FALLBACK.contact?.liveVideoConsultationUrl,
    },
    location: {
      address: dynamicSettings.location?.address || STORE_FALLBACK.location?.address,
      googleMapsLink: dynamicSettings.location?.googleMapsLink || STORE_FALLBACK.location?.googleMapsLink,
    },
    hours: {
      openHour: dynamicSettings.hours?.openHour || STORE_FALLBACK.hours?.openHour,
      openMinute: dynamicSettings.hours?.openMinute || STORE_FALLBACK.hours?.openMinute,
      openPeriod: dynamicSettings.hours?.openPeriod || STORE_FALLBACK.hours?.openPeriod,
      closeHour: dynamicSettings.hours?.closeHour || STORE_FALLBACK.hours?.closeHour,
      closeMinute: dynamicSettings.hours?.closeMinute || STORE_FALLBACK.hours?.closeMinute,
      closePeriod: dynamicSettings.hours?.closePeriod || STORE_FALLBACK.hours?.closePeriod,
      openingTime: dynamicSettings.hours?.openingTime || STORE_FALLBACK.hours?.openingTime,
      daysOpen: dynamicSettings.hours?.daysOpen || STORE_FALLBACK.hours?.daysOpen,
      isManualOverride: dynamicSettings.hours?.isManualOverride ?? STORE_FALLBACK.hours?.isManualOverride,
      manualStatus: dynamicSettings.hours?.manualStatus || STORE_FALLBACK.hours?.manualStatus,
    },
  };
}
