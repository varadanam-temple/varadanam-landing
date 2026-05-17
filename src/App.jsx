import { useState, useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useIsMobile } from './useIsMobile.js';
import { posts } from './blogPosts.js';

const OurStory = lazy(() => import('./OurStory.jsx'));
const Blog = lazy(() => import('./Blog.jsx'));
const BlogPost = lazy(() => import('./BlogPost.jsx'));
const TempleHistory = lazy(() => import('./TempleHistory.jsx'));
const TempleHistoryPost = lazy(() => import('./TempleHistoryPost.jsx'));
const NotFound = lazy(() => import('./NotFound.jsx'));
import './index.css';

/* ── Shared: MandalaBg ── */
function MandalaBg({ opacity = 0.05 }) {
  const spokes = Array.from({ length: 24 }).map((_, i) => {
    const rad = (i * 15) * Math.PI / 180;
    return {
      x1: 300 + 40 * Math.cos(rad), y1: 300 + 40 * Math.sin(rad),
      x2: 300 + 280 * Math.cos(rad), y2: 300 + 280 * Math.sin(rad),
    };
  });
  return (
    <svg viewBox="0 0 600 600" fill="none" style={{ width: '100%', height: '100%', opacity }}>
      {[40, 80, 120, 160, 200, 240, 280].map(r => (
        <circle key={r} cx="300" cy="300" r={r} stroke="#FFB31D" strokeWidth={r % 80 === 0 ? 1 : 0.5} />
      ))}
      {spokes.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#FFB31D" strokeWidth="0.5" opacity="0.7" />
      ))}
      {[120, 200].map(r => (
        <circle key={'p' + r} cx="300" cy="300" r={r} stroke="#FF6906" strokeWidth="0.6" strokeDasharray="4 8" />
      ))}
    </svg>
  );
}

/* ── Navbar ── */
function Navbar({ scrolled, onDemo }) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const solid = scrolled || menuOpen;

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: isMobile ? '0 20px' : '0 48px', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: solid ? 'rgba(16,11,4,0.97)' : 'transparent',
        backdropFilter: solid ? 'blur(16px)' : 'none',
        borderBottom: `1px solid ${solid ? 'rgba(255,179,29,0.12)' : 'transparent'}`,
        transition: 'all 0.4s ease',
      }}>
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/default-monochrome.svg" alt="Varadanam" style={{ height: 36, width: 'auto', display: 'block' }} />
        </a>

        {isMobile ? (
          <button onClick={() => setMenuOpen(o => !o)} aria-label="Menu" style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 8,
            display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center',
          }}>
            <span style={{ display: 'block', width: 22, height: 2, background: menuOpen ? '#FF6906' : '#faf6ef', transition: 'all 0.25s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#faf6ef', transition: 'all 0.25s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: menuOpen ? '#FF6906' : '#faf6ef', transition: 'all 0.25s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {[['Features', '#features'], ['How it works', '#how-it-works'], ['Pricing', '#']].map(([label, href]) => (
              <a key={label} href={href} style={{ color: 'rgba(250,246,239,0.7)', textDecoration: 'none', fontSize: 14.5, letterSpacing: '0.02em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(250,246,239,0.7)'}
              >{label}</a>
            ))}
            <Link to="/blog" style={{ color: 'rgba(250,246,239,0.7)', textDecoration: 'none', fontSize: 14.5, letterSpacing: '0.02em', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(250,246,239,0.7)'}
            >Blog</Link>
            <Link to="/temple-history" style={{ color: 'rgba(250,246,239,0.7)', textDecoration: 'none', fontSize: 14.5, letterSpacing: '0.02em', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#FFB31D'}
              onMouseLeave={e => e.target.style.color = 'rgba(250,246,239,0.7)'}
            >Temple History</Link>
            <a href="#demo" onClick={e => { e.preventDefault(); onDemo && onDemo(); }} style={{
              background: '#FF6906', color: '#fff', textDecoration: 'none',
              fontSize: 14, fontWeight: 500, padding: '10px 22px', borderRadius: 8,
              transition: 'all 0.2s', boxShadow: '0 2px 12px rgba(255,105,6,0.3)',
            }}
              onMouseEnter={e => { e.target.style.background = '#e55a00'; e.target.style.boxShadow = '0 4px 20px rgba(255,105,6,0.45)'; }}
              onMouseLeave={e => { e.target.style.background = '#FF6906'; e.target.style.boxShadow = '0 2px 12px rgba(255,105,6,0.3)'; }}
            >Request a Demo</a>
          </div>
        )}
      </nav>

      {/* Mobile slide-down menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed', top: 72, left: 0, right: 0, zIndex: 99,
          background: 'rgba(10,7,2,0.98)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,179,29,0.12)',
          padding: '8px 20px 28px',
        }}>
          {[['Features', '#features'], ['How it works', '#how-it-works'], ['Pricing', '#']].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', color: 'rgba(250,246,239,0.75)', textDecoration: 'none',
              fontSize: 17, padding: '13px 0',
              borderBottom: '1px solid rgba(255,179,29,0.08)',
              fontFamily: 'DM Sans, sans-serif',
            }}>{label}</a>
          ))}
          <Link to="/blog" onClick={() => setMenuOpen(false)} style={{
            display: 'block', color: 'rgba(250,246,239,0.75)', textDecoration: 'none',
            fontSize: 17, padding: '13px 0',
            borderBottom: '1px solid rgba(255,179,29,0.08)',
            fontFamily: 'DM Sans, sans-serif',
          }}>Blog</Link>
          <Link to="/temple-history" onClick={() => setMenuOpen(false)} style={{
            display: 'block', color: '#FFB31D', textDecoration: 'none',
            fontSize: 17, padding: '13px 0',
            borderBottom: '1px solid rgba(255,179,29,0.08)',
            fontFamily: 'DM Sans, sans-serif',
          }}>Temple History</Link>
          <a href="#demo" onClick={e => { e.preventDefault(); setMenuOpen(false); onDemo && onDemo(); }} style={{
            display: 'block', background: '#FF6906', color: '#fff', textDecoration: 'none',
            fontSize: 15, fontWeight: 600, padding: '14px 24px', borderRadius: 8,
            marginTop: 20, textAlign: 'center', fontFamily: 'DM Sans, sans-serif',
          }}>Request a Demo</a>
        </div>
      )}
    </>
  );
}

/* ── Hero ── */
function Hero({ onDemo }) {
  const isMobile = useIsMobile();
  const [vis, setVis] = useState(false);
  useLayoutEffect(() => { setVis(true); }, []); // eslint-disable-line react-hooks/set-state-in-effect

  const fadeUp = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  const STATS = [
    { num: '200+', label: 'Temples onboarded' },
    { num: '₹4 Cr+', label: 'Seva transactions' },
    { num: '50K+', label: 'Devotees served' },
  ];

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      padding: '120px 24px 80px',
      background: 'radial-gradient(ellipse 90% 70% at 50% 30%, #1d1009 0%, #100b04 65%)',
    }}>
      {/* Mandala right */}
      <div style={{ position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)', width: 700, height: 700, pointerEvents: 'none' }}>
        <MandalaBg opacity={0.05} />
      </div>
      {/* Mandala left dim */}
      <div style={{ position: 'absolute', left: -220, top: '60%', transform: 'translateY(-50%) scale(0.6)', width: 600, height: 600, pointerEvents: 'none' }}>
        <MandalaBg opacity={0.03} />
      </div>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 400, pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(255,105,6,0.11) 0%, transparent 68%)',
      }} />
      {/* Grain texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 820 }}>
        {/* Slogan pill */}
        <div style={{ ...fadeUp(0), display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(255,179,29,0.28)', borderRadius: 100,
            padding: '6px 18px', background: 'rgba(255,179,29,0.07)',
          }}>
            <span style={{ fontSize: 11, color: '#FFB31D', letterSpacing: '0.24em', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
              Om Siddhi Vinayakaya Namaha
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          ...fadeUp(80),
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(48px, 6.5vw, 86px)',
          fontWeight: 400,
          lineHeight: 1.1,
          color: '#faf6ef',
          letterSpacing: '-0.01em',
          marginBottom: 24,
        }}>
          Temple management,<br />
          <span style={{ color: '#FF6906' }}>simplified.</span>
        </h1>

        {/* Sub */}
        <p style={{
          ...fadeUp(280),
          fontFamily: 'Lora, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(17px, 2vw, 21px)',
          lineHeight: 1.65,
          color: 'rgba(250,246,239,0.58)',
          maxWidth: 600,
          margin: '0 auto 48px',
        }}>
          India's complete temple management software, simplified for temple committees — online vazhipadu &amp; seva booking, counter billing, devotee management, donation tracking, and a branded temple website.
        </p>

        {/* CTAs */}
        <div style={{ ...fadeUp(380), display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#demo" onClick={e => { e.preventDefault(); onDemo && onDemo(); }} style={{
            background: 'linear-gradient(135deg, #FF6906 0%, #e05000 100%)',
            color: '#fff', textDecoration: 'none', fontSize: 16, fontWeight: 500,
            padding: '16px 36px', borderRadius: 10,
            boxShadow: '0 6px 28px rgba(255,105,6,0.35)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 36px rgba(255,105,6,0.48)'; }}
            onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 6px 28px rgba(255,105,6,0.35)'; }}
          >Request a Demo</a>
          <a href="#features" style={{
            color: 'rgba(250,246,239,0.75)', textDecoration: 'none', fontSize: 15,
            padding: '16px 28px', borderRadius: 10,
            border: '1px solid rgba(250,246,239,0.15)',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,179,29,0.4)'; e.currentTarget.style.color = '#FFB31D'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(250,246,239,0.15)'; e.currentTarget.style.color = 'rgba(250,246,239,0.75)'; }}
          >
            See features
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 7h10M7 2l5 5-5 5" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div style={{
          ...fadeUp(500),
          display: 'flex', gap: 0, justifyContent: 'center', flexWrap: 'wrap',
          marginTop: 56, padding: '32px 0 0',
          borderTop: '1px solid rgba(255,179,29,0.1)',
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              padding: isMobile ? '12px 24px' : '0 40px',
              borderRight: !isMobile && i < STATS.length - 1 ? '1px solid rgba(255,179,29,0.12)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: isMobile ? 28 : 32, color: '#FFB31D', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: 'rgba(250,246,239,0.5)', letterSpacing: '0.06em', marginTop: 6, textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.3,
      }}>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, rgba(255,179,29,0.8))' }} />
        <div style={{ fontSize: 9.5, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#FFB31D' }}>Scroll</div>
      </div>
    </section>
  );
}

/* ── Features ── */
const FEATURES = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>,
    title: 'Online Vazhipadu & Seva Booking',
    desc: 'Devotees can browse, book, and pay for vazhipadu and sevas from anywhere — on mobile or desktop. Automated WhatsApp confirmations and receipts.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 10h20M6 15h4M14 15h4" /></svg>,
    title: 'Counter Billing',
    desc: 'Fast POS-style billing at the temple counter. Print receipts, manage queues, and handle cash or card with ease.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4" /><circle cx="17" cy="10" r="3" /><path d="M2 21v-1a7 7 0 0114 0v1M20 21v-1a4 4 0 00-3-3.87" /></svg>,
    title: 'Devotee Management',
    desc: 'Maintain a complete database of devotees — family details, booking history, gotra, nakshatra, and prasad preferences.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" /></svg>,
    title: 'Temple Website',
    desc: 'A beautiful, branded website for your temple — with seva listing, event calendar, photo gallery, and live darshan schedule.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 16l4-5 4 3 4-6" /></svg>,
    title: 'Reports & Analytics',
    desc: 'Daily, monthly, and annual reports on collections, seva popularity, and devotee footfall — exportable to PDF or Excel.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v4H4zM4 12h16v4H4zM4 20h10" /><circle cx="19" cy="20" r="2" /><path d="M19 18v-4" /></svg>,
    title: 'Event & Festival Calendar',
    desc: 'Plan and publish upcoming festivals, special poojas, and utsavams. Notify devotees automatically via SMS or WhatsApp.',
  },
];

function FeatureCard({ feature }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#fff' : '#faf6ef',
        padding: '40px 36px',
        transition: 'background 0.2s',
        cursor: 'default',
        position: 'relative',
      }}>
      <div style={{
        width: 48, height: 48, borderRadius: 10,
        background: hovered ? 'rgba(249,100,4,0.1)' : 'rgba(249,100,4,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#f96404', marginBottom: 20, transition: 'background 0.2s',
      }}>
        {feature.icon}
      </div>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, fontWeight: 400, color: '#1a1108', marginBottom: 10, lineHeight: 1.25 }}>{feature.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: '#7a6a54', fontFamily: 'DM Sans, sans-serif' }}>{feature.desc}</p>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, #f96404, #FFB31D)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.25s',
      }} />
    </div>
  );
}

function FeaturesSection() {
  const isMobile = useIsMobile();
  return (
    <section id="features" style={{ background: '#faf6ef', padding: isMobile ? '64px 20px' : '100px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: isMobile ? 40 : 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <div style={{ width: 28, height: 1, background: '#f96404' }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#f96404', fontFamily: 'DM Sans, sans-serif' }}>Features</span>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 400, lineHeight: 1.15, color: '#1a1108', maxWidth: 580, marginBottom: 16 }}>
            Everything a temple needs,<br />
            <span style={{ color: '#f96404' }}>in one place.</span>
          </h2>
          <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 17, lineHeight: 1.7, color: '#7a6a54', maxWidth: 520 }}>
            From the first online seva booking to end-of-day donation reports — our temple management software handles it all, so your priests can focus on the divine.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 2,
          background: 'rgba(42,26,6,0.07)', borderRadius: 16, overflow: 'hidden',
          border: '1px solid rgba(42,26,6,0.07)',
        }}>
          {FEATURES.map(f => <FeatureCard key={f.title} feature={f} />)}
        </div>

        {/* Trust bar */}
        <div style={{
          marginTop: 48, padding: isMobile ? '20px' : '28px 36px', background: '#fff', borderRadius: 12,
          border: '1px solid rgba(42,26,6,0.08)', display: 'flex', alignItems: 'center',
          flexWrap: 'wrap', gap: isMobile ? 16 : 0,
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a6a54', fontFamily: 'DM Sans, sans-serif', marginRight: isMobile ? 0 : 32, width: isMobile ? '100%' : 'auto' }}>Works with</span>
          {[
            { svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17.5 3L6 14.5l4 1.5L7.5 21 19 9.5l-4-1.5L17.5 3z" fill="#2D9EE0" /></svg>, label: 'razorpay', color: '#072654' },
            { svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.979-1.401A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-1.5 13.5c-2.5-1.333-4-3.5-4.167-3.833-.167-.333-.083-.583.083-.75l.584-.583c.166-.167.25-.25.333-.417.083-.167 0-.333-.083-.5L6.5 8.5c-.083-.167-.25-.333-.417-.25-.583.25-1.5.833-1.583 1.75C4.417 11 5.25 12.917 7.25 15c2 2.083 3.917 2.833 5.25 2.833.917 0 1.5-.916 1.75-1.5.083-.166-.083-.333-.25-.416l-1.667-.75c-.166-.083-.333-.167-.5-.083-.166.083-.25.166-.416.333-.167.167-.417.25-.667.083z" fill="#25D366" /></svg>, label: 'WhatsApp', color: '#128C7E' },
            { svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f96404" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>, label: 'SMS', color: '#2a1a06' },
            { svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f96404" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18" /></svg>, label: 'Any Device', color: '#2a1a06' },
            { svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f96404" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" /></svg>, label: 'Multi-language', color: '#2a1a06' },
          ].map((item, idx, arr) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: isMobile ? '0' : `0 ${idx === arr.length - 1 ? '28px' : '28px'}`, borderRight: !isMobile && idx < arr.length - 1 ? '1px solid rgba(42,26,6,0.08)' : 'none' }}>
              {item.svg}
              <span style={{ fontSize: 14, fontWeight: 600, color: item.color, fontFamily: 'DM Sans, sans-serif' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Preview ── */
const PREVIEW_TABS = ['Dashboard', 'Counter Billing', 'Seva Booking'];

function DashboardMock() {
  const stats = [
    { label: "Today's Collection", value: '₹1,24,500', change: '+12%', up: true },
    { label: 'Sevas Booked', value: '247', change: '+8%', up: true },
    { label: 'Devotees Today', value: '1,832', change: '-3%', up: false },
    { label: 'Pending Sevas', value: '18', change: '', up: true },
  ];
  const recentSevas = [
    { name: 'Ganesha Abhishekam', devotee: 'Ramesh Kumar', time: '09:15 AM', amount: '₹501', status: 'Completed' },
    { name: 'Satyanarayana Pooja', devotee: 'Priya Menon', time: '10:30 AM', amount: '₹1,100', status: 'In Progress' },
    { name: 'Lakshmi Archana', devotee: 'Sundar Rajan', time: '11:00 AM', amount: '₹251', status: 'Upcoming' },
    { name: 'Rudrabhishekam', devotee: 'Kavitha Iyer', time: '12:00 PM', amount: '₹2,100', status: 'Upcoming' },
  ];
  const statusColor = s => s === 'Completed' ? '#16a34a' : s === 'In Progress' ? '#FF6906' : '#9ca3af';
  const statusBg = s => s === 'Completed' ? '#dcfce7' : s === 'In Progress' ? 'rgba(255,105,6,0.12)' : '#f3f4f6';

  return (
    <div style={{ padding: 24, overflow: 'auto', height: '100%', background: '#f9f5ee' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 600, color: '#1a1108', fontFamily: 'Playfair Display, serif' }}>Good morning, Admin</div>
          <div style={{ fontSize: 12, color: '#9a8a74', marginTop: 2 }}>Wednesday, 30 April 2026</div>
        </div>
        <div style={{ background: '#FF6906', color: '#fff', borderRadius: 6, padding: '7px 16px', fontSize: 12, fontWeight: 500, fontFamily: 'DM Sans, sans-serif' }}>+ New Booking</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '1px solid rgba(42,26,6,0.07)' }}>
            <div style={{ fontSize: 10, color: '#9a8a74', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, fontFamily: 'DM Sans, sans-serif' }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1108', fontFamily: 'DM Sans, sans-serif' }}>{s.value}</div>
            {s.change && <div style={{ fontSize: 11, color: s.up ? '#16a34a' : '#dc2626', marginTop: 4 }}>{s.up ? '↑' : '↓'} {s.change} vs yesterday</div>}
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid rgba(42,26,6,0.07)', overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(42,26,6,0.06)', fontSize: 13, fontWeight: 600, color: '#1a1108', fontFamily: 'DM Sans, sans-serif' }}>Today's Sevas</div>
        {recentSevas.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderBottom: i < recentSevas.length - 1 ? '1px solid rgba(42,26,6,0.05)' : 'none', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,105,6,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🪔</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1a1108', fontFamily: 'DM Sans, sans-serif' }}>{s.name}</div>
              <div style={{ fontSize: 11, color: '#9a8a74' }}>{s.devotee} · {s.time}</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1108', fontFamily: 'DM Sans, sans-serif' }}>{s.amount}</div>
            <div style={{ fontSize: 10.5, padding: '3px 10px', borderRadius: 100, background: statusBg(s.status), color: statusColor(s.status), fontWeight: 600 }}>{s.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CounterMock() {
  const items = [
    { name: 'Ganesha Abhishekam', price: 501 },
    { name: 'Sahasranamam', price: 251 },
    { name: 'Prasad (Large)', price: 100 },
  ];
  const total = items.reduce((a, b) => a + b.price, 0);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', height: '100%', background: '#f9f5ee' }}>
      <div style={{ padding: 20, overflow: 'auto' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1108', marginBottom: 14, fontFamily: 'DM Sans, sans-serif' }}>Select Seva / Item</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {['Ganesha Abhishekam', 'Rudrabhishekam', 'Sahasranamam', 'Kumkumarchana', 'Lakshmi Pooja', 'Satyanarayana Pooja', 'Archana', 'Prasad (Small)', 'Prasad (Large)'].map(seva => (
            <div key={seva} style={{ background: '#fff', borderRadius: 8, padding: '12px 14px', border: '1px solid rgba(42,26,6,0.08)', cursor: 'pointer', transition: 'border 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#FF6906'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(42,26,6,0.08)'}
            >
              <div style={{ fontSize: 14, marginBottom: 6 }}>🪔</div>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: '#1a1108', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.3 }}>{seva}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: '#fff', borderLeft: '1px solid rgba(42,26,6,0.08)', padding: 20, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1108', marginBottom: 16, fontFamily: 'DM Sans, sans-serif' }}>Current Bill</div>
        <div style={{ flex: 1 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(42,26,6,0.06)', fontSize: 12.5, color: '#1a1108', fontFamily: 'DM Sans, sans-serif' }}>
              <span>{item.name}</span><span style={{ fontWeight: 600 }}>₹{item.price}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 12, borderTop: '2px solid rgba(42,26,6,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: '#1a1108', fontFamily: 'DM Sans, sans-serif', marginBottom: 16 }}>
            <span>Total</span><span>₹{total}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, background: 'rgba(42,26,6,0.06)', borderRadius: 7, padding: '9px 0', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#1a1108', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}>Cash</div>
            <div style={{ flex: 1, background: '#FF6906', borderRadius: 7, padding: '9px 0', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#fff', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}>UPI / Card</div>
          </div>
          <div style={{ marginTop: 8, background: '#1a1108', borderRadius: 7, padding: '10px 0', textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#faf6ef', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}>Print Receipt</div>
        </div>
      </div>
    </div>
  );
}

function SevaMock() {
  const sevas = [
    { name: 'Rudrabhishekam', time: 'Mon, Wed, Fri · 6:00 AM', price: '₹2,100', slots: 3 },
    { name: 'Satyanarayana Pooja', time: 'Weekends · 10:00 AM', price: '₹1,100', slots: 5 },
    { name: 'Ganesha Abhishekam', time: 'Daily · 8:00 AM', price: '₹501', slots: 8 },
    { name: 'Lakshmi Archana', time: 'Fridays · 7:30 AM', price: '₹251', slots: 12 },
  ];
  return (
    <div style={{ padding: 24, overflow: 'auto', height: '100%', background: '#f9f5ee' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1108', fontFamily: 'Playfair Display, serif' }}>Book a Seva</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ background: '#fff', border: '1px solid rgba(42,26,6,0.1)', borderRadius: 6, padding: '6px 14px', fontSize: 12, color: '#9a8a74', fontFamily: 'DM Sans, sans-serif' }}>All Sevas ▾</div>
          <div style={{ background: '#fff', border: '1px solid rgba(42,26,6,0.1)', borderRadius: 6, padding: '6px 14px', fontSize: 12, color: '#9a8a74', fontFamily: 'DM Sans, sans-serif' }}>May 2026 ▾</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
        {sevas.map(s => (
          <div key={s.name} style={{ background: '#fff', borderRadius: 10, padding: '16px', border: '1px solid rgba(42,26,6,0.07)', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,105,6,0.12)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,105,6,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🪔</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1108', fontFamily: 'DM Sans, sans-serif' }}>{s.name}</div>
                <div style={{ fontSize: 11, color: '#9a8a74', marginTop: 1 }}>{s.time}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#FF6906', fontFamily: 'DM Sans, sans-serif' }}>{s.price}</div>
                <div style={{ fontSize: 10, color: '#9a8a74', marginTop: 1 }}>{s.slots} slots available</div>
              </div>
              <div style={{ background: '#FF6906', color: '#fff', borderRadius: 6, padding: '7px 14px', fontSize: 11.5, fontWeight: 600, fontFamily: 'DM Sans, sans-serif' }}>Book Now</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── How it Works ── */
const STEPS = [
  {
    num: '01',
    title: 'Onboard Your Temple',
    desc: 'Sign up and set up your temple profile in minutes. Add your sevas, priests, puja timings, and pricing. No technical knowledge needed.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    num: '02',
    title: 'Go Live in a Day',
    desc: 'Your branded temple website and booking portal go live instantly. Share the link with devotees via WhatsApp — they can book sevas immediately.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/></svg>,
  },
  {
    num: '03',
    title: 'Manage from Anywhere',
    desc: 'View bookings, process counter billing, print receipts, and track collections — all from a single dashboard on any device.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  },
  {
    num: '04',
    title: 'Devotees Get Notified',
    desc: 'Automated WhatsApp and SMS confirmations keep devotees informed — seva timings, prasad details, and receipts sent instantly after booking.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015 2h3a2 2 0 012 1.72c.13 1 .36 1.97.71 2.9a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.93.35 1.9.58 2.9.71A2 2 0 0122 16.92z"/></svg>,
  },
];

function HowItWorksCard({ step }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textAlign: 'center', padding: '0 8px', cursor: 'default' }}
    >
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        margin: '0 auto 28px',
        border: `2px solid ${hovered ? '#FF6906' : 'rgba(255,179,29,0.2)'}`,
        background: hovered ? 'rgba(255,105,6,0.12)' : 'rgba(255,179,29,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s', position: 'relative', zIndex: 1,
        color: hovered ? '#FF6906' : 'rgba(255,179,29,0.6)',
      }}>
        {step.icon}
      </div>
      <div style={{
        fontFamily: 'Playfair Display, serif', fontSize: 11,
        color: hovered ? '#FF6906' : 'rgba(255,179,29,0.4)',
        letterSpacing: '0.2em', marginBottom: 10, transition: 'color 0.3s',
      }}>Step {step.num}</div>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#faf6ef', lineHeight: 1.25, marginBottom: 12 }}>{step.title}</h3>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, color: 'rgba(250,246,239,0.5)', lineHeight: 1.7 }}>{step.desc}</p>
    </div>
  );
}

function HowItWorksSection() {
  const isMobile = useIsMobile();
  return (
    <section id="how-it-works" style={{ background: '#0e0904', padding: isMobile ? '64px 20px' : '100px 48px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%,-50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(255,105,6,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 28, height: 1, background: '#FF6906' }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FF6906', fontFamily: 'DM Sans, sans-serif' }}>How it Works</span>
            <div style={{ width: 28, height: 1, background: '#FF6906' }} />
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 400, lineHeight: 1.15, color: '#faf6ef', marginBottom: 16 }}>
            Up and running in<br /><span style={{ color: '#FF6906' }}>less than a day.</span>
          </h2>
          <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 17, color: 'rgba(250,246,239,0.55)', maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}>
            No lengthy setup, no IT team required. Get your temple management system live in hours — if your temple has a WhatsApp group, you're already halfway there.
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          {!isMobile && <div style={{
            position: 'absolute', top: 36, left: 'calc(12.5% + 28px)', right: 'calc(12.5% + 28px)',
            height: 1, background: 'linear-gradient(90deg, #FF6906, #FFB31D, #FF6906)',
            opacity: 0.2, pointerEvents: 'none',
          }} />}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: isMobile ? 20 : 32 }}>
            {STEPS.map(step => <HowItWorksCard key={step.num} step={step} />)}
          </div>
        </div>

        <div style={{
          marginTop: isMobile ? 48 : 80, padding: isMobile ? '24px 20px' : '36px 48px',
          background: 'rgba(255,179,29,0.05)',
          border: '1px solid rgba(255,179,29,0.12)',
          borderRadius: 14, display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', gap: 24, flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row',
        }}>
          <div style={{ fontSize: 32, opacity: 0.4, fontFamily: 'Georgia, serif', color: '#FFB31D', lineHeight: 1, flexShrink: 0 }}>"</div>
          <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 16, color: 'rgba(250,246,239,0.65)', lineHeight: 1.7, flex: 1 }}>
            We set up Varadanam on a Tuesday morning. By Tuesday evening, our first online seva booking had come in from a devotee in Singapore.
          </p>
          <div style={{ flexShrink: 0, textAlign: 'right' }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#faf6ef' }}>Sri. Anand Krishnan</div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(250,246,239,0.4)', marginTop: 3 }}>Trustee, Murugan Temple, Coimbatore</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewSection() {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState(0);
  return (
    <section id="preview" style={{ background: '#0e0904', padding: isMobile ? '64px 20px' : '100px 48px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 28, height: 1, background: '#FF6906' }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FF6906', fontFamily: 'DM Sans, sans-serif' }}>Product Preview</span>
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 400, lineHeight: 1.15, color: '#faf6ef', maxWidth: 520 }}>
              Built for how temples<br /><span style={{ color: '#FF6906' }}>actually work.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 4 }}>
            {PREVIEW_TABS.map((t, i) => (
              <button key={t} onClick={() => setTab(i)} style={{
                padding: '9px 20px', borderRadius: 7, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 500, fontFamily: 'DM Sans, sans-serif',
                background: tab === i ? '#FF6906' : 'transparent',
                color: tab === i ? '#fff' : 'rgba(250,246,239,0.5)',
                transition: 'all 0.2s',
              }}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ borderRadius: 16, overflow: isMobile ? 'auto' : 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', WebkitOverflowScrolling: 'touch' }}>
          {isMobile && <div style={{ padding: '10px 16px', background: 'rgba(255,179,29,0.08)', fontSize: 11.5, color: 'rgba(250,246,239,0.4)', textAlign: 'center', fontFamily: 'DM Sans, sans-serif' }}>← Scroll to explore →</div>}
          <div style={{ minWidth: isMobile ? 720 : 'auto' }}>
          {/* Browser chrome */}
          <div style={{ background: '#1c1409', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 6, padding: '5px 14px', fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', textAlign: 'center' }}>
              admin.varadanam.com / {PREVIEW_TABS[tab].toLowerCase().replace(' ', '-')}
            </div>
          </div>
          {/* Screen */}
          <div style={{ display: 'flex', height: 480, background: '#f5ede0' }}>
            {/* Sidebar */}
            <div style={{ width: 200, background: '#1a1108', padding: 16, display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
              <div style={{ padding: '12px 8px', marginBottom: 8 }}>
                <img src="/default-monochrome.svg" alt="Varadanam" style={{ height: 24, width: 'auto' }} />
              </div>
              {[
                { icon: '▦', label: 'Dashboard', active: tab === 0 },
                { icon: '⊞', label: 'Seva Booking', active: tab === 2 },
                { icon: '⊟', label: 'Counter Billing', active: tab === 1 },
                { icon: '⊕', label: 'Devotees', active: false },
                { icon: '⊘', label: 'Reports', active: false },
                { icon: '⊛', label: 'Website', active: false },
                { icon: '⊙', label: 'Settings', active: false },
              ].map(item => (
                <div key={item.label} style={{
                  padding: '9px 12px', borderRadius: 7, fontSize: 12.5,
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: item.active ? 'rgba(255,105,6,0.2)' : 'transparent',
                  color: item.active ? '#FF6906' : 'rgba(250,246,239,0.4)',
                  fontFamily: 'DM Sans, sans-serif', cursor: 'pointer',
                }}>
                  <span style={{ fontSize: 14 }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
            {/* Main content */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
              {tab === 0 && <DashboardMock />}
              {tab === 1 && <CounterMock />}
              {tab === 2 && <SevaMock />}
            </div>
          </div>
        </div></div>{/* end minWidth wrapper */}
      </div>
    </section>
  );
}

/* ── Testimonials ── */
const TESTIMONIALS = [
  {
    quote: "Varadanam transformed how we manage our temple. Our priests spend less time on admin and more time on rituals. Devotee bookings went up 3x in the first month.",
    name: "Sri. Krishnamurthy Sharma",
    role: "Head Priest, Shri Venkateshwara Temple, Bengaluru",
    initials: "KS",
  },
  {
    quote: "The counter billing system is incredibly fast. During Navaratri, we handled over 2,000 transactions a day without any issues. The Razorpay integration works flawlessly.",
    name: "Smt. Radha Parthasarathy",
    role: "Temple Trustee, Meenakshi Amman Temple, Chennai",
    initials: "RP",
  },
  {
    quote: "Our devotees love being able to book sevas from their phones. We get WhatsApp confirmations automatically — no more phone calls or manual registers.",
    name: "Sri. Venkat Subramaniam",
    role: "Managing Trustee, Subramanya Swamy Temple, Mysuru",
    initials: "VS",
  },
];

function TestimonialCard({ t }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 14, padding: '32px',
      border: '1px solid rgba(42,26,6,0.08)', display: 'flex', flexDirection: 'column',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)', transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,105,6,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
    >
      <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFB31D">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: 52, color: '#FF6906', lineHeight: 0.7, marginBottom: 12, opacity: 0.25 }}>"</div>
      <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 15, lineHeight: 1.75, color: '#4a3a28', marginBottom: 28, flex: 1 }}>{t.quote}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #FF6906, #FFB31D)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Playfair Display, serif', fontSize: 16, color: '#fff',
        }}>{t.initials}</div>
        <div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#1a1108' }}>{t.name}</div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#9a8a74', marginTop: 2 }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection({ onDemo }) {
  const isMobile = useIsMobile();
  return (
    <section id="testimonials" style={{ background: '#faf6ef', padding: isMobile ? '64px 20px' : '100px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: isMobile ? 40 : 64, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 28, height: 1, background: '#FF6906' }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FF6906', fontFamily: 'DM Sans, sans-serif' }}>Testimonials</span>
            <div style={{ width: 28, height: 1, background: '#FF6906' }} />
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 400, lineHeight: 1.15, color: '#1a1108', marginBottom: 14 }}>
            Trusted by temples<br /><span style={{ color: '#FF6906' }}>across India.</span>
          </h2>
          <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 17, color: '#7a6a54', maxWidth: 480, margin: '0 auto' }}>
            Hear from the priests and trustees who run their temples on Varadanam.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24, marginBottom: isMobile ? 48 : 72 }}>
          {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>

        {/* CTA band */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1108 0%, #2a1a08 100%)',
          borderRadius: 16, padding: isMobile ? '36px 24px' : '56px 64px',
          display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: 32, flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)', width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(255,179,29,0.1)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: -60, top: '50%', transform: 'translateY(-50%)', width: 280, height: 280, borderRadius: '50%', border: '1px solid rgba(255,105,6,0.1)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 36px)', color: '#faf6ef', lineHeight: 1.2, marginBottom: 12 }}>
              Ready to modernise your temple?
            </h3>
            <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 16, color: 'rgba(250,246,239,0.55)', maxWidth: 420 }}>
              Join 200+ Hindu temples across Kerala and India already using Varadanam's temple management software. Setup takes less than a day.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexShrink: 0, position: 'relative' }}>
            <a href="#demo" onClick={e => { e.preventDefault(); onDemo && onDemo(); }} style={{
              background: '#FF6906', color: '#fff', textDecoration: 'none',
              padding: '14px 32px', borderRadius: 8, fontSize: 15, fontWeight: 600,
              fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s',
              boxShadow: '0 6px 24px rgba(255,105,6,0.35)',
            }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 32px rgba(255,105,6,0.5)'; }}
              onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 6px 24px rgba(255,105,6,0.35)'; }}
            >Request a Demo</a>
            <a href="#features" style={{
              color: 'rgba(250,246,239,0.7)', textDecoration: 'none',
              padding: '14px 28px', borderRadius: 8, fontSize: 15,
              border: '1px solid rgba(250,246,239,0.15)', transition: 'all 0.2s',
              fontFamily: 'DM Sans, sans-serif',
            }}
              onMouseEnter={e => { e.target.style.borderColor = 'rgba(255,179,29,0.4)'; e.target.style.color = '#FFB31D'; }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(250,246,239,0.15)'; e.target.style.color = 'rgba(250,246,239,0.7)'; }}
            >Learn more</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: '#080500', borderTop: '1px solid rgba(255,179,29,0.1)', padding: isMobile ? '48px 20px 32px' : '72px 48px 36px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr 1fr', gap: isMobile ? 32 : 48, marginBottom: isMobile ? 40 : 64 }}>
          <div>
            <img src="/default-monochrome.svg" alt="Varadanam" style={{ height: 36, width: 'auto', marginBottom: 20 }} />
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(250,246,239,0.45)', fontFamily: 'Lora, serif', fontStyle: 'italic', maxWidth: 280, marginBottom: 28 }}>
              India's complete temple management software — online vazhipadu booking, seva & pooja management, devotee database, and donation tracking for Hindu temples across Kerala and India.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'Twitter/X', path: 'M18 4L13.5 9.5M6 20l5.5-5.5M18 4l-12 16M18 4h-4M6 20h4', href: 'https://twitter.com/varadanam' },
                { label: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z', href: 'https://www.linkedin.com/company/varadanam' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{
                  width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(255,179,29,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(250,246,239,0.45)', transition: 'all 0.2s', textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,105,6,0.5)'; e.currentTarget.style.color = '#FF6906'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,179,29,0.15)'; e.currentTarget.style.color = 'rgba(250,246,239,0.45)'; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFB31D', marginBottom: 20, fontFamily: 'DM Sans, sans-serif' }}>Product</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Features', href: '/#features' },
                { label: 'How it works', href: '/#how-it-works' },
                { label: 'Pricing', href: '/#demo' },
                { label: 'Request Demo', href: '/#demo' },
              ].map(l => (
                <a key={l.label} href={l.href} style={{ color: 'rgba(250,246,239,0.5)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#faf6ef'}
                  onMouseLeave={e => e.target.style.color = 'rgba(250,246,239,0.5)'}
                >{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFB31D', marginBottom: 20, fontFamily: 'DM Sans, sans-serif' }}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Our Story', href: '/our-story' },
                { label: 'Blog', href: '/blog' },
                { label: 'Temple History', href: '/temple-history' },
                { label: 'Contact', href: 'mailto:hello@varadanam.com' },
              ].map(l => (
                <a key={l.label} href={l.href} style={{ color: 'rgba(250,246,239,0.5)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#faf6ef'}
                  onMouseLeave={e => e.target.style.color = 'rgba(250,246,239,0.5)'}
                >{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFB31D', marginBottom: 20, fontFamily: 'DM Sans, sans-serif' }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: 'M4 4h16v16H4zM4 8l8 6 8-6', text: 'hello@varadanam.com' },
                { icon: 'M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015 2h3a2 2 0 012 1.72c.13 1 .36 1.97.71 2.9a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.93.35 1.9.58 2.9.71A2 2 0 0122 16.92z', text: '+91 8088079670' },
              ].map(c => (
                <div key={c.text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF6906" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={c.icon} />
                  </svg>
                  <span style={{ fontSize: 13.5, color: 'rgba(250,246,239,0.55)' }}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,179,29,0.15), transparent)', marginBottom: 28 }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontSize: 13, color: 'rgba(250,246,239,0.3)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
            © 2026 Varadanam. Made with devotion in India.
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="mailto:hello@varadanam.com" style={{ fontSize: 12.5, color: 'rgba(250,246,239,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'rgba(250,246,239,0.6)'}
              onMouseLeave={e => e.target.style.color = 'rgba(250,246,239,0.3)'}
            >hello@varadanam.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Demo Modal ── */
function DemoModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', temple: '', role: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setDone(true);
    } catch {
      alert('Something went wrong. Please email us directly at hello@varadanam.com');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,179,29,0.15)',
    borderRadius: 8, color: '#faf6ef',
    fontFamily: 'DM Sans, sans-serif', fontSize: 14,
    outline: 'none', transition: 'border-color 0.2s',
  };
  const labelStyle = {
    fontSize: 11.5, fontWeight: 600, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'rgba(250,246,239,0.5)',
    marginBottom: 7, display: 'block', fontFamily: 'DM Sans, sans-serif',
  };

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(8,5,2,0.85)', backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.2s ease',
      }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)', zIndex: 201,
        width: 'min(560px, 94vw)', background: '#1a1108',
        border: '1px solid rgba(255,179,29,0.15)', borderRadius: 20,
        overflow: 'hidden', animation: 'modalIn 0.25s ease',
        boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
      }}>
        <div style={{ height: 3, background: 'linear-gradient(90deg, #FF6906, #FFB31D, #FF6906)' }} />
        <div style={{ padding: '28px 32px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <img src="/default-monochrome.svg" alt="Varadanam" style={{ height: 28, width: 'auto' }} />
            </div>
            {!done && <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: '#faf6ef', lineHeight: 1.2, marginTop: 12 }}>Request a Demo</div>}
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: 8,
            width: 34, height: 34, cursor: 'pointer', color: 'rgba(250,246,239,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s', flexShrink: 0,
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>
        <div style={{ padding: '20px 32px 32px' }}>
          {done ? (
            <div style={{ textAlign: 'center', padding: '32px 0 16px' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,105,6,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6906" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#faf6ef', marginBottom: 12 }}>Thank you!</div>
              <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 15, color: 'rgba(250,246,239,0.6)', lineHeight: 1.65, maxWidth: 360, margin: '0 auto 28px' }}>
                We've received your request. Our team will reach out within 24 hours to schedule your personalised demo.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,179,29,0.08)', border: '1px solid rgba(255,179,29,0.2)', borderRadius: 100, padding: '6px 18px' }}>
                <span style={{ fontSize: 11, letterSpacing: '0.2em', color: '#FFB31D', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>Om Siddhi Vinayakaya Namaha</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 14, color: 'rgba(250,246,239,0.5)', marginBottom: 28, lineHeight: 1.6 }}>
                Tell us about your temple and we'll set up a personalised walkthrough.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Your Name *</label>
                    <input required style={inputStyle} placeholder="e.g. Krishnamurthy" value={form.name} onChange={e => set('name', e.target.value)}
                      onFocus={e => e.target.style.borderColor = '#FF6906'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,179,29,0.15)'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Role *</label>
                    <select required style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} value={form.role} onChange={e => set('role', e.target.value)}
                      onFocus={e => e.target.style.borderColor = '#FF6906'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,179,29,0.15)'}
                    >
                      <option value="" disabled>Select role</option>
                      <option value="priest">Head Priest</option>
                      <option value="trustee">Trustee</option>
                      <option value="manager">Temple Manager</option>
                      <option value="committee">Committee Member</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" style={inputStyle} placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} required
                    onFocus={e => e.target.style.borderColor = '#FF6906'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,179,29,0.15)'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input required type="tel" style={inputStyle} placeholder="+91 8088079670" value={form.phone} onChange={e => set('phone', e.target.value)}
                    onFocus={e => e.target.style.borderColor = '#FF6906'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,179,29,0.15)'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Temple <span style={{ opacity: 0.45, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                  <input style={inputStyle} placeholder="e.g. Shri Venkateshwara Temple" value={form.temple} onChange={e => set('temple', e.target.value)}
                    onFocus={e => e.target.style.borderColor = '#FF6906'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,179,29,0.15)'}
                  />
                </div>
                <button type="submit" disabled={submitting} style={{
                  width: '100%', padding: '13px', borderRadius: 9, border: 'none',
                  background: '#FF6906', color: '#fff', fontSize: 15, fontWeight: 600,
                  fontFamily: 'DM Sans, sans-serif', cursor: 'pointer',
                  transition: 'all 0.2s', opacity: submitting ? 0.8 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4,
                }}>
                  {submitting ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                      </svg>
                      Sending…
                    </>
                  ) : 'Request Demo'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn { from { opacity: 0; transform: translate(-50%, calc(-50% + 20px)); } to { opacity: 1; transform: translate(-50%, -50%); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder, select::placeholder { color: rgba(250,246,239,0.25); }
        select option { background: #1a1108; color: #faf6ef; }
      `}</style>
    </>
  );
}

/* ── Blog Preview ── */
function BlogPreview() {
  const isMobile = useIsMobile();
  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return (
    <section style={{ background: '#0e0904', padding: isMobile ? '64px 20px' : '100px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 52, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 28, height: 1, background: '#FF6906' }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FF6906', fontFamily: 'DM Sans, sans-serif' }}>Blog</span>
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: '#faf6ef', lineHeight: 1.15 }}>
              Insights for temple trustees<br /><span style={{ color: '#FF6906' }}>across Kerala & India.</span>
            </h2>
          </div>
          <Link to="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: 'rgba(250,246,239,0.6)', textDecoration: 'none', fontSize: 14,
            border: '1px solid rgba(250,246,239,0.15)', padding: '10px 20px', borderRadius: 8,
            fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,179,29,0.4)'; e.currentTarget.style.color = '#FFB31D'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(250,246,239,0.15)'; e.currentTarget.style.color = 'rgba(250,246,239,0.6)'; }}
          >
            View all articles
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 7h10M7 2l5 5-5 5" />
            </svg>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
          {posts.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{
                background: 'rgba(255,179,29,0.04)',
                border: '1px solid rgba(255,179,29,0.1)',
                borderRadius: 14, padding: '28px',
                transition: 'border-color 0.2s, transform 0.2s', height: '100%',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,105,6,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,179,29,0.1)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ fontSize: 11.5, color: 'rgba(250,246,239,0.3)', fontFamily: 'DM Sans, sans-serif', marginBottom: 14 }}>
                  {formatDate(post.date)}
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 400, color: '#faf6ef', lineHeight: 1.35, marginBottom: 12 }}>
                  {post.title}
                </h3>
                <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 13.5, color: 'rgba(250,246,239,0.45)', lineHeight: 1.7, marginBottom: 20 }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#FF6906', fontSize: 13, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>
                  Read article
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 7h10M7 2l5 5-5 5" />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Home ── */
function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    document.title = 'Temple Management Software for Kerala Temples | Varadanam';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Temple management software for Kerala temples — online vazhipadu & seva booking, counter billing, devotee management, and a branded temple website. Trusted by 200+ temples.');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://varadanam.com/');
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <Navbar scrolled={scrolled} onDemo={() => setDemoOpen(true)} />
      <Hero onDemo={() => setDemoOpen(true)} />
      <FeaturesSection />
      <HowItWorksSection />
      <PreviewSection />
      <TestimonialsSection onDemo={() => setDemoOpen(true)} />
      <BlogPreview />
      <Footer />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <Suspense fallback={<div style={{ background: '#100b04', minHeight: '100vh' }} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/temple-history" element={<TempleHistory />} />
        <Route path="/temple-history/:slug" element={<TempleHistoryPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
