import React from "react";
import { Metadata } from "next";
import { DOAPolicyClient } from "./doa-policy-client";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "DOA পলিসি (Dead on Arrival Policy)",
  description: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম-এর DOA (Dead on Arrival) পলিসি ও শর্তাবলী। পাখি ও মাছের নিরাপদ ডেলিভারি ও ক্ষতিপূরণ নীতি।",
  alternates: {
    canonical: "/doa-policy",
  },
  openGraph: {
    title: "DOA পলিসি (Dead on Arrival Policy) | Bismillah Pakhi & Aquarium",
    description: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম-এর DOA (Dead on Arrival) পলিসি ও শর্তাবলী।",
    url: "/doa-policy",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOA পলিসি (Dead on Arrival Policy) | Bismillah Pakhi & Aquarium",
    description: "বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম-এর DOA (Dead on Arrival) পলিসি ও শর্তাবলী।",
  },
};

export default function DOAPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "হোম", url: "/" },
          { name: "DOA পলিসি", url: "/doa-policy" },
        ]}
      />
      <DOAPolicyClient />
    </>
  );
}
