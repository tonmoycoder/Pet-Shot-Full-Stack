"use client";

import React from 'react';
import { useTheme } from '@payloadcms/ui';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div style={{ padding: '8px 16px', marginTop: '16px', marginBottom: '8px' }}>
      <button 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        type="button"
        style={{
          width: 'calc(100% - 32px)',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '10px 16px',
          background: 'var(--theme-elevation-50)',
          border: '1px solid var(--theme-elevation-100)',
          borderRadius: '20px',
          color: 'var(--theme-text)',
          cursor: 'pointer',
          fontWeight: 600,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--theme-elevation-100)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--theme-elevation-50)';
          e.currentTarget.style.transform = 'none';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.97)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
      >
        {theme === 'dark' ? (
          <>
            <span style={{ fontSize: '16px' }}>☀️</span>
            <span>লাইট মোড</span>
          </>
        ) : (
          <>
            <span style={{ fontSize: '16px' }}>🌙</span>
            <span>ডার্ক মোড</span>
          </>
        )}
      </button>
    </div>
  );
}
