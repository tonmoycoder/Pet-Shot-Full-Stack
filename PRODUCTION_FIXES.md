# 🛠️ Deployment Fixes — Bismillah Pakhi & Aquarium

This file documents all known production issues and their exact fixes.
**Read this first** before spending hours debugging!

---

## ❌ Problem 1: Admin Panel Shows Blank White Page on Vercel

### Symptom
- `https://bismillahpakhiandaquarium.vercel.app/admin` shows a completely blank page
- No login form, no error message — just white

### Root Cause
The `importMap.js` file is missing the `VercelBlobClientUploadHandler` entry.
Payload CMS uses this file to register all React components for the admin UI.
When it's missing, the entire admin JS bundle fails silently.

### Fix
Open [`src/app/(payload)/admin/importMap.js`](./src/app/%28payload%29/admin/importMap.js) and make sure these two lines exist:

**At the top (imports section):**
```js
import { VercelBlobClientUploadHandler as VercelBlobClientUploadHandler_3e5c4e4e4c2484eb56f5d20e4a59d839 } from '@payloadcms/storage-vercel-blob/client'
```

**At the bottom (exportMap object):**
```js
"@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler": VercelBlobClientUploadHandler_3e5c4e4e4c2484eb56f5d20e4a59d839
```

⚠️ **WARNING:** Running `npx payload generate:importmap` locally may REMOVE this entry because it doesn't detect it statically. Always check after running that command!

### Reference Commit
`ec94873` — "fix: manual importMap entry for VercelBlobClientUploadHandler"

---

## ❌ Problem 2: Blog & Review Sections Show Nothing on Homepage

### Symptom
- `https://bismillahpakhiandaquarium.vercel.app/` shows blank where blogs and testimonials should be
- Animals and other sections load fine
- Locally everything works perfectly

### Root Cause
The production Supabase `media` table was **missing the `_objectkey` column** (and possibly others like `source_url`, `sizes_avatar_*`).

Payload fetches blogs/testimonials with `depth: 1`, which means it JOINs to the `media` table to populate images (coverImage, authorImage). When that JOIN query runs on the incomplete `media` table, **it crashes silently** and returns nothing — so `blogs = []` and `testimonials = []`.

Animals work because they store images as plain `text` URLs, not as an `upload` relation to `media`.

### Fix — Run Migration Script
Run `run_migration.js` from the project root. It directly adds missing columns to the production Supabase database:

```bash
node run_migration.js
```

This script connects to the production Supabase and runs:
```sql
ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "_objectkey" VARCHAR;
-- (plus other missing columns if any)
```

### How to check if this is the problem again
Test the API route on production:
```
https://bismillahpakhiandaquarium.vercel.app/api/test-blogs
```

If it returns `{"success": false, "error": "Failed query: select ... from \"media\" ..."}` → run the migration.

If it returns `{"success": true, "blogsCount": 12, "testimonialsCount": 3}` → data is fine, check the component rendering.

### Reference Commits
- `f059b62` — "fix: restore depth:1 after fixing missing _objectkey column"
- `run_migration.js` — the migration script (in project root)

---

## ⚠️ Problem 3: `importMap.js` Gets Reset After Code Changes

### Symptom
Admin white page reappears after someone runs `npx payload generate:importmap` locally

### Prevention
The `VercelBlobClientUploadHandler` entry in `importMap.js` must be manually preserved.
After any `generate:importmap` run, always verify the entry is still there before committing.

---

## 🗝️ Key Environment Variables (Vercel)

| Variable | Purpose |
|----------|---------|
| `DATABASE_URI` | Production Supabase Postgres connection string |
| `PAYLOAD_SECRET` | Used for JWT signing and migration auth |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage for media uploads |
| `BLOB_STORE_ID` | Vercel Blob store identifier |
| `BLOB_WEBHOOK_PUBLIC_KEY` | Vercel Blob webhook verification |

---

## 🚀 Deploy Checklist

Before every deployment, verify:
- [ ] `importMap.js` contains `VercelBlobClientUploadHandler` entry
- [ ] All env vars are set in Vercel (Production + Preview)
- [ ] `run_migration.js` was run if media schema changed
- [ ] Local `npm run build` succeeds without errors
