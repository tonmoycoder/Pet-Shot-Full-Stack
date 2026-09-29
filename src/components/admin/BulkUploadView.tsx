"use client";

import React, { useState } from "react";

export const BulkUploadView: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<{ message?: string; errors?: string[], error?: string } | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/bulk-upload-blogs", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (error: any) {
      setResult({ error: error.message || "Failed to upload" } as any);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Bulk Blog Uploader</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>Upload your CSV file to auto-create multiple blog posts.</p>

      <div style={{ backgroundColor: '#e0f2fe', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #bae6fd' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#0284c7', fontSize: '1.2rem' }}>Required CSV Format</h3>
        <p style={{ fontSize: '0.95rem', color: '#0369a1', marginBottom: '0.75rem' }}>
          Your CSV file <strong>must</strong> contain the following exact column headers in the first row. You can copy the line below:
        </p>
        <div style={{ position: 'relative' }}>
          <code style={{ display: 'block', padding: '0.75rem', backgroundColor: '#fff', border: '1px solid #bae6fd', borderRadius: '6px', marginBottom: '1rem', color: '#0f172a', fontWeight: 'bold', fontSize: '0.9rem', wordBreak: 'break-all' }}>
            Title_EN, Title_BN, Excerpt_EN, Excerpt_BN, Content_EN, Content_BN, Cover_Image_URL, Status
          </code>
        </div>
        <ul style={{ fontSize: '0.9rem', color: '#0369a1', paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <li><strong>Title_EN / Title_BN:</strong> The title of the blog in English and Bengali.</li>
          <li><strong>Excerpt_EN / Excerpt_BN:</strong> A short summary of the blog.</li>
          <li><strong>Content_EN / Content_BN:</strong> The main body of the blog (Markdown format is supported!).</li>
          <li><strong>Cover_Image_URL:</strong> Direct URL to an image file (e.g., https://example.com/image.jpg).</li>
          <li><strong>Status:</strong> Use <code>published</code> or <code>draft</code> (defaults to published if left empty).</li>
        </ul>
      </div>

      <div style={{
        border: '2px dashed #ccc',
        borderRadius: '10px',
        padding: '3rem 2rem',
        textAlign: 'center',
        backgroundColor: '#fafafa',
        marginBottom: '2rem'
      }}>
        <input
          type="file"
          accept=".csv"
          id="csv-upload"
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <label htmlFor="csv-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '50px', height: '50px', backgroundColor: '#e6f7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: '500', color: '#333' }}>
            {file ? file.name : "Click to browse or drag your CSV file here"}
          </span>
        </label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          style={{
            backgroundColor: !file || isUploading ? '#ccc' : '#059669',
            color: 'white',
            border: 'none',
            padding: '0.75rem 2rem',
            borderRadius: '5px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: !file || isUploading ? 'not-allowed' : 'pointer'
          }}
        >
          {isUploading ? "Uploading..." : "Upload Blogs"}
        </button>
      </div>

      {result && (
        <div style={{
          padding: '1.5rem',
          borderRadius: '8px',
          backgroundColor: (result.error || result.errors) ? '#fef2f2' : '#ecfdf5',
          border: `1px solid ${(result.error || result.errors) ? '#fecaca' : '#a7f3d0'}`
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: (result.error || result.errors) ? '#991b1b' : '#065f46' }}>
            {result.message || result.error || "Upload completed with errors"}
          </h3>
          {result.errors && (
            <ul style={{ color: '#991b1b', margin: 0, paddingLeft: '1.5rem' }}>
              {result.errors.map((err, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{err}</li>)}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
