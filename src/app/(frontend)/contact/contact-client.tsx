"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const dict = {
  bn: {
    pageTitle: "যোগাযোগ করুন",
    pageSubtitle: "আপনার যেকোনো প্রশ্ন বা মতামতের জন্য আমাদের সাথে যোগাযোগ করুন।",
    infoCard: "আমাদের ঠিকানা",
    formCard: "মেসেজ পাঠান",
    labelAddress: "ঠিকানা",
    labelPhone: "ফোন",
    labelEmail: "ইমেইল",
    labelName: "আপনার নাম",
    labelEmailInput: "আপনার ইমেইল (ঐচ্ছিক)",
    labelPhone2: "আপনার ফোন নাম্বার (ঐচ্ছিক)",
    labelMessage: "আপনার বার্তা",
    placeholderName: "নাম লিখুন",
    placeholderEmail: "example@email.com",
    placeholderPhone: "+880 1XXX-XXXXXX",
    placeholderMsg: "আপনার বার্তা লিখুন...",
    submit: "পাঠিয়ে দিন",
    submitting: "পাঠানো হচ্ছে...",
    successTitle: "বার্তা পাঠানো হয়েছে!",
    successMsg: "আমরা যত তাড়াতাড়ি সম্ভব আপনার সাথে যোগাযোগ করব।",
    whatsappBtn: "WhatsApp-এ সরাসরি মেসেজ পাঠান",
    sendAnother: "আরেকটি বার্তা পাঠান",
    errorGeneric: "কিছু একটা সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।",
    whatsappDirect: "WhatsApp-এ সরাসরি",
    orSeparator: "অথবা",
  },
  en: {
    pageTitle: "Contact Us",
    pageSubtitle: "Reach out to us for any inquiries about our pets or services.",
    infoCard: "Our Location",
    formCard: "Send a Message",
    labelAddress: "Address",
    labelPhone: "Phone",
    labelEmail: "Email",
    labelName: "Your Name",
    labelEmailInput: "Your Email (optional)",
    labelPhone2: "Your Phone (optional)",
    labelMessage: "Your Message",
    placeholderName: "Enter your name",
    placeholderEmail: "example@email.com",
    placeholderPhone: "+880 1XXX-XXXXXX",
    placeholderMsg: "Write your message here...",
    submit: "Send Message",
    submitting: "Sending...",
    successTitle: "Message Sent!",
    successMsg: "We will get back to you as soon as possible.",
    whatsappBtn: "Message us directly on WhatsApp",
    sendAnother: "Send Another Message",
    errorGeneric: "Something went wrong. Please try again.",
    whatsappDirect: "Direct on WhatsApp",
    orSeparator: "or",
  },
};

type Status = "idle" | "loading" | "success" | "error";

export function ContactClient({ storeSettings }: { storeSettings: any }) {
  const { language } = useLanguage();
  const t = dict[language];
  const fontClass = language === "bn" ? "font-bangla" : "font-sans";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const displayAddress = storeSettings?.location?.address || (language === "bn" ? "সাত ভাই পুকুড় পাড়, আব্দুল্লাহ সিটির পিছনে, বড় বাজার, চুয়াডাঙ্গা" : "Sat Bhai Pukur Par, Behind Abdullah City, Boro Bazar, Chuadanga");
  const displayPhone = storeSettings?.contact?.phoneNumber || "+880 1947-315330";
  const displayEmail = storeSettings?.contact?.emailAddress || "info@bismillahpakhi.com";
  const mapUrl = storeSettings?.location?.googleMapsLink || "https://maps.google.com/?q=Boro+Bazar+Chuadanga";
  const whatsappNum = storeSettings?.contact?.whatsappNumber?.replace(/[^0-9]/g, '') || "8801947315330";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, lang: language }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || t.errorGeneric);
        setStatus("error");
        return;
      }
      setWhatsappUrl(data.whatsappUrl || `https://wa.me/${whatsappNum}`);
      setStatus("success");
    } catch {
      setErrorMsg(t.errorGeneric);
      setStatus("error");
    }
  }

  function resetForm() {
    setName(""); setEmail(""); setPhone(""); setMessage("");
    setStatus("idle"); setErrorMsg("");
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#ddf1fa] via-[#eaf6fd] to-[#d0ecf8] dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-24 px-4 ${fontClass}`}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#09334F]/10 dark:bg-[#67B1E0]/10 rounded-full mb-5">
            <MessageSquare className="w-4 h-4 text-[#265D85] dark:text-[#67B1E0]" />
            <span className={`text-sm font-semibold text-[#265D85] dark:text-[#67B1E0] ${fontClass}`}>{language === "bn" ? "আমাদের সাথে কথা বলুন" : "Talk to us"}</span>
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold text-[#09334F] dark:text-zinc-100 mb-4 ${fontClass}`}>{t.pageTitle}</h1>
          <p className={`text-lg text-[#265D85] dark:text-zinc-400 max-w-xl mx-auto ${fontClass}`}>{t.pageSubtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col gap-6">
            <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/60 dark:border-zinc-800">
              <h2 className={`text-2xl font-bold text-[#09334F] dark:text-zinc-100 mb-8 ${fontClass}`}>{t.infoCard}</h2>
              <div className="space-y-6">
                {[
                  { icon: <MapPin className="w-5 h-5" />, label: t.labelAddress, el: <a href={mapUrl} target="_blank" rel="noopener noreferrer" className={`text-zinc-600 dark:text-zinc-400 hover:text-[#265D85] transition-colors ${fontClass}`}>{displayAddress}</a> },
                  { icon: <Phone className="w-5 h-5" />, label: t.labelPhone, el: <a href={`tel:${displayPhone.replace(/[^\d+]/g,"")}`} className="text-zinc-600 dark:text-zinc-400 hover:text-[#265D85] transition-colors font-sans">{displayPhone}</a> },
                  { icon: <Mail className="w-5 h-5" />, label: t.labelEmail, el: <a href={`mailto:${displayEmail}`} className="text-zinc-600 dark:text-zinc-400 hover:text-[#265D85] transition-colors font-sans">{displayEmail}</a> },
                ].map(({ icon, label, el }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#67B1E0]/20 dark:bg-[#67B1E0]/10 flex items-center justify-center text-[#265D85] dark:text-[#67B1E0]">{icon}</div>
                    <div><p className={`font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-0.5 ${fontClass}`}>{label}</p>{el}</div>
                  </div>
                ))}
              </div>
            </div>
            <a href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-3xl p-6 transition-all shadow-sm">
              <div className="shrink-0 w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.849L0 24l6.336-1.497A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.373l-.36-.213-3.762.889.952-3.659-.233-.376A9.796 9.796 0 012.182 12c0-5.419 4.399-9.818 9.818-9.818 5.419 0 9.818 4.399 9.818 9.818 0 5.42-4.399 9.818-9.818 9.818z"/></svg>
              </div>
              <div>
                <p className={`font-bold text-[#128C7E] dark:text-[#25D366] ${fontClass}`}>{t.whatsappDirect}</p>
                <p className={`text-sm text-zinc-500 dark:text-zinc-400 ${fontClass}`}>{t.whatsappBtn}</p>
              </div>
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/60 dark:border-zinc-800">
            <h2 className={`text-2xl font-bold text-[#09334F] dark:text-zinc-100 mb-6 ${fontClass}`}>{t.formCard}</h2>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center py-8 gap-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 ${fontClass}`}>{t.successTitle}</h3>
                    <p className={`text-zinc-500 dark:text-zinc-400 ${fontClass}`}>{t.successMsg}</p>
                  </div>
                  <div className={`flex flex-col gap-3 w-full mt-2`}>
                    {whatsappUrl && (
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl font-semibold transition-colors shadow-lg shadow-[#25D366]/20 ${fontClass}`}>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.849L0 24l6.336-1.497A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.373l-.36-.213-3.762.889.952-3.659-.233-.376A9.796 9.796 0 012.182 12c0-5.419 4.399-9.818 9.818-9.818 5.419 0 9.818 4.399 9.818 9.818 0 5.42-4.399 9.818-9.818 9.818z"/></svg>
                        {language === "bn" ? "WhatsApp-এ রিপ্লাই দিন" : "Reply on WhatsApp"}
                      </a>
                    )}
                    <button onClick={resetForm} className={`w-full py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium ${fontClass}`}>{t.sendAnother}</button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" ref={formRef} onSubmit={handleSubmit} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div>
                    <label className={`block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 ${fontClass}`}>{t.labelName} *</label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} className={`w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#67B1E0] focus:border-transparent outline-none transition-all placeholder:text-zinc-400 ${fontClass}`} placeholder={t.placeholderName} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 ${fontClass}`}>{t.labelEmailInput}</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#67B1E0] focus:border-transparent outline-none transition-all placeholder:text-zinc-400 font-sans" placeholder={t.placeholderEmail} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 ${fontClass}`}>{t.labelPhone2}</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#67B1E0] focus:border-transparent outline-none transition-all placeholder:text-zinc-400 font-sans" placeholder={t.placeholderPhone} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 ${fontClass}`}>{t.labelMessage} *</label>
                    <textarea required rows={5} value={message} onChange={e => setMessage(e.target.value)} className={`w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-[#67B1E0] focus:border-transparent outline-none transition-all resize-none placeholder:text-zinc-400 ${fontClass}`} placeholder={t.placeholderMsg} />
                  </div>
                  {status === "error" && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className={`flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm ${fontClass}`}>
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg || t.errorGeneric}</span>
                    </motion.div>
                  )}
                  <button type="submit" disabled={status === "loading"} className={`w-full flex items-center justify-center gap-2.5 bg-[#265D85] hover:bg-[#09334F] disabled:opacity-60 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-[#265D85]/20 text-base mt-1 ${fontClass}`}>
                    {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" />{t.submitting}</> : <><Send className="w-4 h-4" />{t.submit}</>}
                  </button>
                  <div className="flex items-center gap-3 py-1">
                    <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
                    <span className={`text-xs text-zinc-400 dark:text-zinc-500 ${fontClass}`}>{t.orSeparator}</span>
                    <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
                  </div>
                  <a href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(language === "bn" ? "আস্সালামু আলাইকুম, আমি আপনাদের সাথে যোগাযোগ করতে চাই।" : "Assalamu Alaikum, I would like to contact you.")}`} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#128C7E] dark:text-[#25D366] rounded-xl font-semibold transition-all ${fontClass}`}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.849L0 24l6.336-1.497A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.373l-.36-.213-3.762.889.952-3.659-.233-.376A9.796 9.796 0 012.182 12c0-5.419 4.399-9.818 9.818-9.818 5.419 0 9.818 4.399 9.818 9.818 0 5.42-4.399 9.818-9.818 9.818z"/></svg>
                    <span>{t.whatsappBtn}</span>
                  </a>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
