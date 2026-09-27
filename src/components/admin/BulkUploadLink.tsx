"use client";

import Link from 'next/link';
import React from 'react';

export const BulkUploadLink: React.FC = () => {
  return (
    <div style={{ padding: '0 1rem', margin: '0.5rem 0' }}>
      <Link href="/admin/bulk-upload" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span>Bulk Blog Upload</span>
      </Link>
    </div>
  );
};
