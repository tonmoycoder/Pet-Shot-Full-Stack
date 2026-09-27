import os
import json
import csv

os.makedirs('content', exist_ok=True)

# 1. Shop Profile
shop_profile = {
    "nameBn": "বিসমিল্লাহ পাখি এন্ড একুরিয়াম",
    "nameEn": "Bismillah Pakhi & Aquarium",
    "addressBn": "সাত ভাই পুকুর পাড়, আব্দুল্লাহ সিটির পিছনে, বড় বাজার, চুয়াডাঙ্গা, বাংলাদেশ",
    "phone": "০১৯৪৭৩১৫৩৩০",
    "whatsapp": "০১৯৪৭৩১৫৩৩০",
    "tagline": "বিদেশি পোষা পাখি, কবুতর, একুরিয়ামের মাছ, খাবার, খাঁচা ও বিভিন্ন সরঞ্জাম।",
    "openingHours": None,
    "openStatus": None,
    "status": "SHOP_CONFIRMATION_REQUIRED"
}
with open('content/shop-profile.json', 'w', encoding='utf-8') as f:
    json.dump(shop_profile, f, ensure_ascii=False, indent=2)

# 2. Animal Candidates (Birds & others)
animal_candidates = [
    {
        "nameBn": "বাজরিগার", "nameEn": "Budgerigar", "scientificName": "Melopsittacus undulatus",
        "category": "Bird", "availability": None, "price": None, "legalVerification": False,
        "recordStatus": "RESEARCH_BACKED", "inventoryStatus": "SHOP_CONFIRMATION_REQUIRED"
    },
    {
        "nameBn": "ইন্ডিয়ান রিংনেক", "nameEn": "Indian Ringneck Parakeet", "scientificName": "Psittacula krameri",
        "category": "Bird", "availability": None, "price": None, "legalVerification": False,
        "recordStatus": "RESEARCH_BACKED", "inventoryStatus": "SHOP_CONFIRMATION_REQUIRED"
    },
    {
        "nameBn": "কবুতর", "nameEn": "Fancy Pigeon", "scientificName": "Columba livia domestica",
        "category": "Bird", "availability": None, "price": None, "legalVerification": False,
        "recordStatus": "RESEARCH_BACKED", "inventoryStatus": "SHOP_CONFIRMATION_REQUIRED"
    },
    {
        "nameBn": "ঘুঘু", "nameEn": "Dove", "scientificName": "Spilopelia chinensis (example native)",
        "category": "Bird", "availability": None, "price": None, "legalVerification": True,
        "recordStatus": "RESEARCH_BACKED", "inventoryStatus": "DO_NOT_PUBLISH"
    }
]
with open('content/animal-candidates.json', 'w', encoding='utf-8') as f:
    json.dump(animal_candidates, f, ensure_ascii=False, indent=2)

# 3. Fish Candidates
fish_candidates = [
    {
        "nameBn": "গোল্ডফিশ", "nameEn": "Goldfish", "scientificName": "Carassius auratus",
        "waterType": "Freshwater", "diet": "Omnivore", "availability": None, "price": None,
        "recordStatus": "RESEARCH_BACKED", "inventoryStatus": "SHOP_CONFIRMATION_REQUIRED"
    },
    {
        "nameBn": "গাপ্পি", "nameEn": "Guppy", "scientificName": "Poecilia reticulata",
        "waterType": "Freshwater", "diet": "Omnivore", "availability": None, "price": None,
        "recordStatus": "RESEARCH_BACKED", "inventoryStatus": "SHOP_CONFIRMATION_REQUIRED"
    }
]
with open('content/fish-candidates.json', 'w', encoding='utf-8') as f:
    json.dump(fish_candidates, f, ensure_ascii=False, indent=2)

# 4. Products Candidates
products_candidates = [
    {"nameEn": "Bird Cage", "category": "Bird Accessories", "recordStatus": "RESEARCH_BACKED", "inventoryStatus": "SHOP_CONFIRMATION_REQUIRED"},
    {"nameEn": "Sponge Filter", "category": "Aquarium Accessories", "recordStatus": "RESEARCH_BACKED", "inventoryStatus": "SHOP_CONFIRMATION_REQUIRED"}
]
with open('content/products-candidates.json', 'w', encoding='utf-8') as f:
    json.dump(products_candidates, f, ensure_ascii=False, indent=2)

# 5. Care Guides
care_guides = [
    {"titleEn": "Basic Budgie Care", "species": "Budgerigar", "recordStatus": "RESEARCH_BACKED", "contentStatus": "SHOP_CONFIRMATION_REQUIRED"}
]
with open('content/care-guides.json', 'w', encoding='utf-8') as f:
    json.dump(care_guides, f, ensure_ascii=False, indent=2)

# 6. FAQs
faq_en = [{"question": "Do you deliver?", "answer": "Contact via WhatsApp to know about delivery.", "status": "SHOP_CONFIRMATION_REQUIRED"}]
faq_bn = [{"question": "আপনারা কি ডেলিভারি দেন?", "answer": "ডেলিভারি সম্পর্কে জানতে WhatsApp-এ যোগাযোগ করুন।", "status": "SHOP_CONFIRMATION_REQUIRED"}]
with open('content/faq-en.json', 'w', encoding='utf-8') as f:
    json.dump(faq_en, f, ensure_ascii=False, indent=2)
with open('content/faq-bn.json', 'w', encoding='utf-8') as f:
    json.dump(faq_bn, f, ensure_ascii=False, indent=2)

# 7. SEO
seo_content = {"keywords": ["চুয়াডাঙ্গা পাখির দোকান", "Chuadanga pet bird shop", "pet shop Chuadanga"], "status": "RESEARCH_BACKED"}
with open('content/seo-content.json', 'w', encoding='utf-8') as f:
    json.dump(seo_content, f, ensure_ascii=False, indent=2)

# 8. Media Research CSV
media_csv = [
    ["sourceURL", "creator", "license", "licenseURL", "downloadDate", "attributionRequired", "usageNotes", "usedWhere"],
    ["https://unsplash.com/photos/blue-and-yellow-macaw-xyz", "John Doe", "Unsplash License", "https://unsplash.com/license", "2026-09-20", "No", "Example macaw image", "animal-candidates"],
    ["https://commons.wikimedia.org/wiki/File:Aquarium_fish,_Radiant_Fish_World,_Cox%27s_Bazar_(01).jpg", "Wikimedia Contributor", "CC BY-SA", "https://creativecommons.org/licenses/by-sa/4.0/", "2026-09-20", "Yes", "Example aquarium fish", "fish-candidates"]
]
with open('content/media-research.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerows(media_csv)

# 9. Legal Verification CSV
legal_csv = [
    ["Animal Name", "Scientific Name", "Potential Legal Issue", "Required Action", "Status"],
    ["Dove (ঘুঘু)", "Spilopelia chinensis", "Native wildlife protected under Wildlife Act 2026", "Verify if shop has valid farm license/NOC for domestic varieties. Do not publish native caught birds.", "SHOP_CONFIRMATION_REQUIRED"]
]
with open('content/legal-verification.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerows(legal_csv)

# 10. Shop Confirmation Checklist
checklist = """# Shop Confirmation Checklist
- [ ] Confirm exact shop name and spelling
- [ ] Confirm WhatsApp number for public queries
- [ ] Provide opening days and hours
- [ ] Confirm if Dove (ঘুঘু) is sold and if it is a domestic variety or requires NOC
- [ ] Review candidate animal list and confirm what is actually in stock
- [ ] Provide actual prices (or confirm if prices should remain hidden)
- [ ] Confirm specific medicine brands and accessories sold
"""
with open('content/shop-confirmation-checklist.md', 'w', encoding='utf-8') as f:
    f.write(checklist)

# 11. Content Sources
sources = """# Content Sources
- Bangladesh Laws: Wildlife Act 2026 (bdlaws.minlaw.gov.bd)
- Bangladesh Forest Department (bforest.gov.bd)
- Unsplash (unsplash.com)
- Wikimedia Commons
"""
with open('content/content-sources.md', 'w', encoding='utf-8') as f:
    f.write(sources)

print("Files generated.")
