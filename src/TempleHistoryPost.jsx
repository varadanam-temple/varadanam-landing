import { useParams, Link } from 'react-router-dom';
import { getTemple, temples } from './templeHistories.js';

function renderBody(text) {
  const lines = text.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }

    if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 15, color: '#faf6ef', margin: '28px 0 8px' }}>
          {line.replace(/\*\*/g, '')}
        </p>
      );
    } else if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={i} style={{ margin: '16px 0', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item, j) => (
            <li key={j} style={{ fontFamily: 'Lora, serif', fontSize: 16, color: 'rgba(250,246,239,0.72)', lineHeight: 1.75 }}>
              {item}
            </li>
          ))}
        </ul>
      );
      continue;
    } else {
      elements.push(
        <p key={i} style={{ fontFamily: 'Lora, serif', fontSize: 16.5, color: 'rgba(250,246,239,0.72)', lineHeight: 1.9, margin: '0 0 22px' }}>
          {line}
        </p>
      );
    }
    i++;
  }
  return elements;
}

export default function TempleHistoryPost() {
  const { slug } = useParams();
  const temple = getTemple(slug);

  if (!temple) {
    return (
      <div style={{ background: '#100b04', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, color: '#faf6ef', marginBottom: 16 }}>Temple not found</div>
          <Link to="/temple-history" style={{ color: '#FFB31D', fontFamily: 'DM Sans, sans-serif' }}>← Back to Temple History</Link>
        </div>
      </div>
    );
  }

  const others = temples.filter(t => t.slug !== slug).slice(0, 2);

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

      <div style={{ paddingTop: 72 }}>
        {/* Hero header */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(255,179,29,0.06) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,179,29,0.1)',
          padding: '72px 32px 56px',
        }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <Link to="/temple-history" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: 'rgba(250,246,239,0.4)', textDecoration: 'none',
              fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, marginBottom: 36,
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#FFB31D'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,246,239,0.4)'}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 7H2M7 2L2 7l5 5" />
              </svg>
              Temple History
            </Link>

            {/* Tag */}
            <div style={{
              display: 'inline-block', background: 'rgba(255,179,29,0.1)',
              border: '1px solid rgba(255,179,29,0.3)', borderRadius: 6,
              padding: '5px 14px', marginBottom: 24,
              fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#FFB31D', fontFamily: 'DM Sans, sans-serif',
            }}>
              {temple.heroTag}
            </div>

            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(30px, 4.5vw, 52px)',
              fontWeight: 400, color: '#faf6ef', lineHeight: 1.15, marginBottom: 20,
            }}>
              {temple.name}
            </h1>

            <div style={{ fontSize: 13, color: 'rgba(250,246,239,0.4)', fontFamily: 'DM Sans, sans-serif', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <span>{temple.location}</span>
              <span style={{ color: 'rgba(255,179,29,0.3)' }}>·</span>
              <span>Deity: {temple.deity}</span>
            </div>

            <p style={{
              fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 19,
              color: 'rgba(250,246,239,0.6)', lineHeight: 1.7,
              borderLeft: '3px solid #FFB31D', paddingLeft: 22, maxWidth: 720,
            }}>
              {temple.excerpt}
            </p>
          </div>
        </div>

        {/* Quick facts bar */}
        <div style={{ borderBottom: '1px solid rgba(255,179,29,0.1)', background: 'rgba(255,179,29,0.03)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 32px', display: 'flex', flexWrap: 'wrap', gap: 32 }}>
            {temple.quickFacts.map(f => (
              <div key={f.label}>
                <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(250,246,239,0.3)', fontFamily: 'DM Sans, sans-serif', marginBottom: 4 }}>
                  {f.label}
                </div>
                <div style={{ fontSize: 14, color: '#faf6ef', fontFamily: 'DM Sans, sans-serif', fontWeight: 400 }}>
                  {f.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table of contents */}
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 32px 0' }}>
          <div style={{
            background: 'rgba(255,179,29,0.04)', border: '1px solid rgba(255,179,29,0.12)',
            borderRadius: 12, padding: '28px 32px',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFB31D', fontFamily: 'DM Sans, sans-serif', marginBottom: 16 }}>
              Contents
            </div>
            <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {temple.sections.map((s, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: 'rgba(250,246,239,0.55)', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFB31D'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,246,239,0.55)'}
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Article body */}
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '56px 32px 80px' }}>
          {temple.sections.map((section, i) => (
            <div key={i} id={`section-${i}`} style={{ marginBottom: 72 }}>
              {/* Section number + heading */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 28 }}>
                <div style={{
                  minWidth: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,179,29,0.1)', border: '1px solid rgba(255,179,29,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 600, color: '#FFB31D', fontFamily: 'DM Sans, sans-serif',
                  marginTop: 4, flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h2 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(22px, 2.8vw, 30px)',
                  fontWeight: 400, color: '#faf6ef', lineHeight: 1.2,
                }}>
                  {section.heading}
                </h2>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(255,179,29,0.25), transparent)', marginBottom: 32 }} />

              {/* Body */}
              <div style={{ paddingLeft: 0 }}>
                {renderBody(section.body)}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ maxWidth: 860, margin: '0 auto 80px', padding: '0 32px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a1108 0%, #2a1a08 100%)',
            borderRadius: 14, padding: '40px 48px',
            border: '1px solid rgba(255,179,29,0.15)',
          }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#faf6ef', marginBottom: 12, fontWeight: 400 }}>
              Manage your temple with Varadanam
            </h3>
            <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 15, color: 'rgba(250,246,239,0.55)', marginBottom: 24, lineHeight: 1.65, maxWidth: 540 }}>
              Online vazhipadu booking, counter billing, WhatsApp confirmations, and daily reports — built for Kerala temples. Setup in one day.
            </p>
            <Link to="/" style={{
              display: 'inline-block', background: '#FF6906', color: '#fff', textDecoration: 'none',
              padding: '13px 30px', borderRadius: 8, fontSize: 14.5, fontWeight: 600,
              fontFamily: 'DM Sans, sans-serif',
            }}>Request a Free Demo</Link>
          </div>
        </div>

        {/* Other temples */}
        {others.length > 0 && (
          <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 32px 80px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FFB31D', fontFamily: 'DM Sans, sans-serif', marginBottom: 24 }}>
              More Temples
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {others.map(t => (
                <Link key={t.slug} to={`/temple-history/${t.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'rgba(255,179,29,0.04)', border: '1px solid rgba(255,179,29,0.1)',
                    borderRadius: 10, padding: '24px', transition: 'border-color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,179,29,0.35)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,179,29,0.1)'}
                  >
                    <div style={{ fontSize: 11, color: 'rgba(250,246,239,0.3)', fontFamily: 'DM Sans, sans-serif', marginBottom: 10 }}>{t.location}</div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, color: '#faf6ef', lineHeight: 1.35, marginBottom: 12 }}>{t.name}</div>
                    <div style={{ color: '#FFB31D', fontSize: 13, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>Read history →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(255,179,29,0.1)', padding: '32px 48px', textAlign: 'center' }}>
          <span style={{ fontSize: 13, color: 'rgba(250,246,239,0.3)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
            © 2026 Varadanam. Made with devotion in India.
          </span>
        </div>
      </div>
    </div>
  );
}
