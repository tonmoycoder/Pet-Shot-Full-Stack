export function formatStoreHours(hours: any, language: "en" | "bn"): string {
  if (!hours) return language === "bn" ? "সকাল ৯টা - রাত ৯টা" : "9:00 AM - 9:00 PM";
  
  if (!hours.openHour || !hours.closeHour) {
    return hours.openingTime || (language === "bn" ? "সকাল ৯টা - রাত ৯টা" : "9:00 AM - 9:00 PM");
  }

  const formatAMPM = (h: string, m: string, p: string, lang: "en"|"bn") => {
    if (lang === "en") {
      return `${h}:${m} ${p}`;
    }
    
    // Bengali translation
    const bnNumbers: Record<string, string> = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
    const toBn = (str: string) => str.split('').map(c => bnNumbers[c] || c).join('');
    
    const num = parseInt(h);
    let bnP = p === 'AM' ? 'সকাল' : 'রাত';
    if (p === 'PM') {
      if (num === 12 || (num >= 1 && num <= 3)) bnP = 'দুপুর';
      else if (num >= 4 && num <= 5) bnP = 'বিকাল';
      else if (num >= 6 && num <= 11) bnP = 'রাত'; 
    }
    
    return `${bnP} ${toBn(h)}টা${m === '00' ? '' : ` ${toBn(m)} মিনিট`}`;
  };

  const openStr = formatAMPM(hours.openHour, hours.openMinute || '00', hours.openPeriod || 'AM', language);
  const closeStr = formatAMPM(hours.closeHour, hours.closeMinute || '00', hours.closePeriod || 'PM', language);

  return `${openStr} - ${closeStr}`;
}
