import React from "react";
import { Metadata } from "next";
import { DeliveryPolicyClient } from "./delivery-policy-client";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "ডেলিভারি পলিসি (Delivery Policy)",
  description: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম-এর ডেলিভারি নীতি ও শর্তাবলী। চুয়াডাঙ্গা ও সারাদেশে নিরাপদ ডেলিভারি ব্যবস্থা।",
  alternates: {
    canonical: "/delivery-policy",
  },
  openGraph: {
    title: "ডেলিভারি পলিসি (Delivery Policy) | Bismillah Pakhi & Aquarium",
    description: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম-এর ডেলিভারি নীতি ও শর্তাবলী।",
    url: "/delivery-policy",
  },
  twitter: {
    card: "summary_large_image",
    title: "ডেলিভারি পলিসি (Delivery Policy) | Bismillah Pakhi & Aquarium",
    description: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম-এর ডেলিভারি নীতি ও শর্তাবলী।",
  },
};

export default function DeliveryPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "হোম", url: "/" },
          { name: "ডেলিভারি পলিসি", url: "/delivery-policy" },
        ]}
      />
      <DeliveryPolicyClient />
    </>
  );
}
