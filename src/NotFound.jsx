import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const BURNT = '#DF8E40';
const DARK = '#2A1A0A';
const serif = "'Noto Serif', serif";

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page Not Found | Varadanam';
    document.querySelector('meta[name="robots"]')?.setAttribute('content', 'noindex, follow');
    return () => {
      document.querySelector('meta[name="robots"]')?.setAttribute('content', 'index, follow');
    };
  }, []);

  return (
    <div style={{ background: '#fff9eb', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>🛕</div>
      <h1 style={{ fontFamily: serif, fontSize: 48, fontWeight: 700, color: BURNT, margin: '0 0 12px' }}>404</h1>
      <p style={{ fontFamily: serif, fontSize: 22, color: DARK, fontWeight: 600, margin: '0 0 12px' }}>This page doesn't exist</p>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: '#6B4E2A', maxWidth: 400, margin: '0 0 36px', lineHeight: 1.6 }}>
        The page you're looking for may have been moved or the URL might be wrong.
      </p>
      <Link
        to="/"
        style={{ fontFamily: serif, fontWeight: 700, fontSize: 16, background: BURNT, color: '#fff', textDecoration: 'none', borderRadius: 24, padding: '12px 32px', boxShadow: '0 10px 25px -6px rgba(223,142,64,0.4)' }}
      >
        Back to Home
      </Link>
    </div>
  );
}
