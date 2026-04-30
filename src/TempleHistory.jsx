import { Link } from 'react-router-dom';
import { temples } from './templeHistories.js';

export default function TempleHistory() {
  return (
    <div style={{ background: '#100b04', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 48px', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(16,11,4,0.93)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,179,29,0.12)',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/default-monochrome.svg" alt="Varadanam" style={{ height: 40, width: 'auto' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <Link to="/#features" style={{ color: 'rgba(250,246,239,0.7)', textDecoration: 'none', fontSize: 14.5 }}>Features</Link>
          <Link to="/blog" style={{ color: 'rgba(250,246,239,0.7)', textDecoration: 'none', fontSize: 14.5 }}>Blog</Link>
          <Link to="/temple-history" style={{ color: '#FFB31D', textDecoration: 'none', fontSize: 14.5 }}>Temple History</Link>
          <Link to="/" style={{
            background: '#FF6906', color: '#fff', textDecoration: 'none',
            fontSize: 14, fontWeight: 500, padding: '10px 22px', borderRadius: 8,
          }}>Request a Demo</Link>
        </div>
      </nav>

      {/* Header */}
      <div style={{ paddingTop: 72 }}>
        <div style={{
          padding: '72px 48px 56px',
          borderBottom: '1px solid rgba(255,179,29,0.1)',
          maxWidth: 1200, margin: '0 auto',
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 28, height: 1, background: '#FFB31D' }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FFB31D', fontFamily: 'DM Sans, sans-serif' }}>Temple History</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 400, color: '#faf6ef', marginBottom: 16, lineHeight: 1.15 }}>
            The Living Temples of Kerala
          </h1>
          <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 18, color: 'rgba(250,246,239,0.55)', maxWidth: 600, lineHeight: 1.65 }}>
            Centuries of history, legend, and devotion — deep dives into Kerala's most sacred temples, their origins, architecture, rituals, and stories that have shaped South Indian civilisation.
          </p>
        </div>
      </div>

      {/* Temples grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 36 }}>
          {temples.map(temple => (
            <Link key={temple.slug} to={`/temple-history/${temple.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{
                background: 'rgba(255,179,29,0.04)',
                border: '1px solid rgba(255,179,29,0.1)',
                borderRadius: 14, padding: '36px',
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'pointer', height: '100%',
                display: 'flex', flexDirection: 'column', gap: 0,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,179,29,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,179,29,0.1)'; e.currentTarget.style.transform = 'none'; }}
              >
                {/* Hero tag */}
                <div style={{
                  display: 'inline-block', background: 'rgba(255,179,29,0.1)',
                  border: '1px solid rgba(255,179,29,0.25)', borderRadius: 6,
                  padding: '4px 12px', marginBottom: 20,
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: '#FFB31D', fontFamily: 'DM Sans, sans-serif',
                  alignSelf: 'flex-start',
                }}>
                  {temple.heroTag}
                </div>

                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 400, color: '#faf6ef', lineHeight: 1.3, marginBottom: 10 }}>
                  {temple.name}
                </h2>

                <div style={{ fontSize: 12.5, color: 'rgba(250,246,239,0.4)', fontFamily: 'DM Sans, sans-serif', marginBottom: 16 }}>
                  {temple.location}
                </div>

                <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 14.5, color: 'rgba(250,246,239,0.5)', lineHeight: 1.7, marginBottom: 24, flex: 1 }}>
                  {temple.excerpt}
                </p>

                {/* Quick facts strip */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                  {temple.quickFacts.slice(0, 3).map(f => (
                    <span key={f.label} style={{
                      background: 'rgba(255,105,6,0.08)', border: '1px solid rgba(255,105,6,0.2)',
                      borderRadius: 5, padding: '3px 10px',
                      fontSize: 11.5, color: 'rgba(250,246,239,0.55)', fontFamily: 'DM Sans, sans-serif',
                    }}>
                      {f.label}: {f.value}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#FFB31D', fontSize: 13.5, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>
                  Read full history
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 7h10M7 2l5 5-5 5" />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Coming soon teaser */}
        <div style={{ marginTop: 48, padding: '32px 40px', border: '1px dashed rgba(255,179,29,0.2)', borderRadius: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,246,239,0.25)', fontFamily: 'DM Sans, sans-serif', marginBottom: 12 }}>
            Coming Soon
          </div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'rgba(250,246,239,0.4)', marginBottom: 8 }}>
            Padmanabhaswamy Temple · Sabarimala · Vaikom Mahadeva Temple · Ettumanoor Mahadeva Temple
          </div>
          <div style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 13.5, color: 'rgba(250,246,239,0.25)' }}>
            More temples added regularly
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,179,29,0.1)', padding: '32px 48px', textAlign: 'center' }}>
        <span style={{ fontSize: 13, color: 'rgba(250,246,239,0.3)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
          © 2026 Varadanam. Made with devotion in India.
        </span>
      </div>
    </div>
  );
}
