"use client";

import React, { useState, useRef } from "react";

import { X, Star, Loader2, CheckCircle2, Upload, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "cn";
import NextImage from "next/image";

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewFormModal({ isOpen, onClose }: ReviewFormModalProps) {
  const { language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [review, setReview] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError(language === "bn" ? "ছবির সাইজ ৫ মেগাবাইটের কম হতে হবে।" : "Image size must be less than 5MB.");
        return;
      }
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const clearPhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !review.trim()) {
      setError(language === "bn" ? "দয়া করে নাম এবং রিভিউ লিখুন।" : "Please provide your name and review.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      let authorImageId = null;

      // 1. Upload photo if exists
      if (photo) {
        const formData = new FormData();
        formData.append("file", photo);
        formData.append("alt", `Profile photo of ${name}`);

        const mediaRes = await fetch("/api/media", {
          method: "POST",
          body: formData,
        });

        if (!mediaRes.ok) {
          console.error("Media upload failed", await mediaRes.text());
          throw new Error("Failed to upload photo");
        }

        const mediaData = await mediaRes.json();
        authorImageId = mediaData.doc.id;
      }

      // 2. Submit Review
      const reviewPayload: any = {
        authorName: name,
        authorRole: {
          bn: role || "গ্রাহক",
          en: role || "Customer",
        },
        content: {
          bn: review,
          en: review,
        },
        rating,
        status: "pending",
      };

      if (authorImageId) {
        reviewPayload.authorImage = authorImageId;
      }

      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewPayload),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        // Reset form after closing
        setTimeout(() => {
          setIsSuccess(false);
          setName("");
          setRole("");
          setReview("");
          setRating(5);
          clearPhoto();
        }, 500);
      }, 2500);
    } catch (err) {
      console.error(err);
      setError(language === "bn" ? "রিভিউ পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।" : "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300"
        >
          {/* Close Backdrop */}
          <div className="fixed inset-0 z-0" onClick={!isSubmitting ? onClose : undefined} />

          <div
            className="relative z-10 w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-white/20 dark:border-emerald-900/40 flex flex-col my-auto max-h-[90vh] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-border flex justify-between items-center bg-zinc-50 dark:bg-zinc-900 shrink-0 rounded-t-3xl">
              <h3 className={cn("text-xl font-bold text-[#09334F] dark:text-white", language === "bn" ? "font-bangla" : "font-sans")}>
                {language === "bn" ? "আপনার মতামত দিন" : "Write a Review"}
              </h3>
              <button
                onClick={onClose}
                disabled={isSubmitting}
                aria-label="Close"
                className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 hide-scrollbar flex-1">
              <div className="relative">
                {isSuccess ? (
                  <div
                    className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-500"
                  >
                    <div
                      className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400 animate-in zoom-in duration-500"
                    >
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className={cn("text-2xl font-bold mb-2", language === "bn" ? "font-bangla" : "font-sans")}>
                      {language === "bn" ? "ধন্যবাদ!" : "Thank You!"}
                    </h4>
                    <p className={cn("text-muted-foreground", language === "bn" ? "font-bangla" : "font-sans")}>
                      {language === "bn" 
                        ? "আপনার রিভিউ সফলভাবে জমা হয়েছে। রিভিউটি যাচাইয়ের পর প্রকাশ করা হবে।"
                        : "Your review has been submitted successfully and is pending approval."}
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 animate-in fade-in duration-500"
                  >
                    {/* Rating Selection */}
                    <div className="flex flex-col items-center gap-2">
                      <span className={cn("text-sm font-medium text-muted-foreground", language === "bn" ? "font-bangla" : "font-sans")}>
                        {language === "bn" ? "রেটিং দিন" : "Rate your experience"}
                      </span>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 focus:outline-none transition-transform hover:scale-110 active:scale-95"
                          >
                            <Star
                              className={cn(
                                "w-9 h-9 transition-colors",
                                (hoverRating ? star <= hoverRating : star <= rating)
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-zinc-200 text-zinc-200 dark:fill-zinc-800 dark:text-zinc-800"
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Photo Upload */}
                      <div>
                        <label className={cn("block text-sm font-medium mb-1.5", language === "bn" ? "font-bangla" : "font-sans")}>
                          {language === "bn" ? "আপনার ছবি (ঐচ্ছিক)" : "Your Photo (Optional)"}
                        </label>
                        
                        <div className="flex items-center gap-4">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            ref={fileInputRef}
                            onChange={handlePhotoChange}
                          />
                          
                          {photoPreview ? (
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-700">
                              <NextImage src={photoPreview} alt="Preview" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                              <button
                                type="button"
                                onClick={clearPhoto}
                                aria-label="Remove photo"
                                className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="w-20 h-20 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:border-emerald-400 transition-all group"
                            >
                              <Upload className="w-6 h-6 mb-1 group-hover:text-emerald-500 transition-colors" />
                              <span className="text-[10px] font-medium uppercase tracking-wider group-hover:text-emerald-500 transition-colors">Upload</span>
                            </button>
                          )}
                          
                          <div className={cn("text-xs text-muted-foreground flex-1", language === "bn" ? "font-bangla" : "font-sans")}>
                            {language === "bn" 
                              ? "আপনার ছবি যুক্ত করলে রিভিউটি আরও বিশ্বাসযোগ্য হবে। ছবি না দিলে একটি ডামি আইকন দেখানো হবে।"
                              : "Adding a photo makes your review more authentic. If skipped, a placeholder will be used."}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="name" className={cn("block text-sm font-medium mb-1.5", language === "bn" ? "font-bangla" : "font-sans")}>
                          {language === "bn" ? "আপনার নাম" : "Your Name"} <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-transparent focus:border-emerald-500 rounded-xl px-4 py-3 outline-none transition-colors"
                          placeholder={language === "bn" ? "আপনার নাম লিখুন" : "Enter your name"}
                        />
                      </div>

                      <div>
                        <label htmlFor="role" className={cn("block text-sm font-medium mb-1.5", language === "bn" ? "font-bangla" : "font-sans")}>
                          {language === "bn" ? "পদবি বা পরিচয় (ঐচ্ছিক)" : "Role / Title (Optional)"}
                        </label>
                        <input
                          id="role"
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-transparent focus:border-emerald-500 rounded-xl px-4 py-3 outline-none transition-colors"
                          placeholder={language === "bn" ? "যেমন: সন্তুষ্ট গ্রাহক" : "e.g., Happy Customer"}
                        />
                      </div>

                      <div>
                        <label htmlFor="review" className={cn("block text-sm font-medium mb-1.5", language === "bn" ? "font-bangla" : "font-sans")}>
                          {language === "bn" ? "আপনার মতামত" : "Your Review"} <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="review"
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          required
                          rows={4}
                          className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-transparent focus:border-emerald-500 rounded-xl px-4 py-3 outline-none transition-colors resize-none"
                          placeholder={language === "bn" ? "সার্ভিস বা প্রোডাক্ট নিয়ে আপনার মতামত লিখুন..." : "Write your experience here..."}
                        />
                      </div>
                    </div>

                    {error && (
                      <p className={cn("text-red-500 text-sm mt-2 text-center", language === "bn" ? "font-bangla" : "font-sans")}>
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full mt-4 flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none text-lg",
                        language === "bn" ? "font-bangla" : "font-sans"
                      )}
                      style={{ background: "linear-gradient(135deg, #09334F 0%, #265D85 100%)" }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {language === "bn" ? "পাঠানো হচ্ছে..." : "Submitting..."}
                        </>
                      ) : (
                        language === "bn" ? "রিভিউ জমা দিন" : "Submit Review"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
