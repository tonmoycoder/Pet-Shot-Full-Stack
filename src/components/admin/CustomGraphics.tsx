import React from 'react';

export const CustomLogo = () => (
  <div className="custom-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px' }}>
    <div style={{
      width: '36px',
      height: '36px',
      background: 'var(--color-primary-500)',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 10px rgba(93, 95, 239, 0.25)'
    }}>
      <span style={{ fontSize: '24px' }}>🐾</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--theme-text)', fontFamily: 'var(--font-body)' }}>
        Pet Shop
      </span>
      <span style={{ fontSize: '12px', color: 'var(--color-primary-600)', fontWeight: 500 }}>
        অ্যাডমিন প্যানেল
      </span>
    </div>
  </div>
);

export const CustomIcon = () => (
  <div style={{
    width: '32px',
    height: '32px',
    background: 'var(--color-primary-500)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(93, 95, 239, 0.25)'
  }}>
    <span style={{ fontSize: '18px' }}>🐾</span>
  </div>
);
