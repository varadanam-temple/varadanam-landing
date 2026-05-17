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
    <div style={{ background: 'linear-gradient(135deg, #F05000 0%, #F7AA00 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
      <img src="/varadanam-logo-white.svg" alt="Varadanam" style={{ width: '100%', maxWidth: 560, marginBottom: 24 }} />
      <h1 style={{ fontFamily: serif, fontSize: 56, fontWeight: 700, color: '#fff', margin: '0 0 12px', textShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>404</h1>
      <p style={{ fontFamily: serif, fontSize: 22, color: '#fff', fontWeight: 600, margin: '0 0 12px' }}>This page doesn't exist</p>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.85)', maxWidth: 400, margin: '0 0 36px', lineHeight: 1.6 }}>
        The page you're looking for may have been moved or the URL might be wrong.
      </p>
      <Link
        to="/"
        style={{ fontFamily: serif, fontWeight: 700, fontSize: 16, background: '#fff', color: '#F05000', textDecoration: 'none', borderRadius: 24, padding: '12px 32px', boxShadow: '0 10px 25px -6px rgba(0,0,0,0.2)' }}
      >
        Back to Home
      </Link>
    </div>
  );
}
