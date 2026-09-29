import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { parse } from 'csv-parse/sync';
import { markdownToLexical } from './markdownToLexical';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No CSV file uploaded' }, { status: 400 });
    }

    const fileContent = await file.text();
    
    // Parse CSV
    const records = parse(fileContent, {
      columns: true, // Uses the first row as headers
      skip_empty_lines: true,
      trim: true,
    });

    const payload = await getPayload({ config });
    let successCount = 0;
    let errors: string[] = [];

    for (let i = 0; i < records.length; i++) {
      const row = records[i] as any;
      try {
        let mediaId: number | string | undefined = undefined;

        // 1. Process Cover Image
        const coverUrl = row.Cover_Image_URL || row.cover_image_url || row.CoverImageURL;
        if (coverUrl) {
          const res = await fetch(coverUrl);
          if (!res.ok) throw new Error(`Failed to fetch image: ${coverUrl}`);
          
          const arrayBuffer = await res.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const mimeType = res.headers.get('content-type') || 'image/jpeg';
          let filename = coverUrl.split('/').pop()?.split('?')[0] || `bulk-img-${Date.now()}`;
          if (!filename.includes('.')) {
             filename += mimeType === 'image/webp' ? '.webp' : mimeType === 'image/png' ? '.png' : '.jpg';
          }

          const media = await payload.create({
            collection: 'media',
            data: {
              alt: row.Title_EN || row.title_en || 'Blog Cover',
              sourceUrl: coverUrl, // just for record
            },
            file: {
              data: buffer,
              mimetype: mimeType,
              name: filename,
              size: buffer.length,
            }
          });
          mediaId = media.id;
        }

        // 2. Parse Markdown to Lexical
        const contentEn = markdownToLexical(row.Content_EN || row.content_en || '');
        const contentBn = markdownToLexical(row.Content_BN || row.content_bn || '');

        // 3. Create Blog Post
        await payload.create({
          collection: 'blogs',
          data: {
            internalTitle: row.Title_EN || row.title_en || `Bulk Blog ${i + 1}`,
            title: {
              en: row.Title_EN || row.title_en || '',
              bn: row.Title_BN || row.title_bn || '',
            },
            excerpt: {
              en: row.Excerpt_EN || row.excerpt_en || '',
              bn: row.Excerpt_BN || row.excerpt_bn || '',
            },
            content: {
              en: contentEn,
              bn: contentBn,
            },
            coverImage: mediaId as any,
            _status: (row.Status || row.status || 'published').toLowerCase() === 'draft' ? 'draft' : 'published',
            publishedAt: new Date().toISOString(),
          }
        });

        successCount++;
      } catch (err: any) {
        console.error(`Error processing row ${i + 1}:`, err);
        errors.push(`Row ${i + 1}: ${err.message}`);
      }
    }

    return NextResponse.json({
      message: `Successfully processed ${successCount} blogs.`,
      errors: errors.length > 0 ? errors : undefined,
    });

  } catch (error: any) {
    console.error("Bulk upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
