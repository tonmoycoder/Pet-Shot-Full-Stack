import React from 'react';

export const CustomLogo = () => (
  <div className="custom-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px' }}>
    <div style={{
      width: '42px',
      height: '42px',
      borderRadius: '50%',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #09334F 0%, #0d4438 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(103, 216, 206, 0.25)',
      border: '1.5px solid rgba(103, 216, 206, 0.4)'
    }}>
      <img
        src="/images/favicon.webp"
        alt="Bismillah Pakhi & Aquarium"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--theme-text)', fontFamily: 'sans-serif' }}>
        বিসমিল্লাহ পাখি & অ্যাকোয়ারিয়াম
      </span>
      <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>
        চুয়াডাঙ্গা • অ্যাডমিন প্যানেল
      </span>
    </div>
  </div>
);

export const CustomIcon = () => (
  <div style={{
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    overflow: 'hidden',
    background: '#09334F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(103, 216, 206, 0.3)',
    border: '1px solid rgba(103, 216, 206, 0.4)'
  }}>
    <img
      src="/images/favicon.webp"
      alt="Icon"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  </div>
);

