import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTemple, temples } from './templeHistories.js';
import { useIsMobile } from './useIsMobile.js';

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
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!temple) return;
    const title = `${temple.name} — History, Significance & Traditions | Varadanam`;
    const desc = temple.excerpt || `Learn about the history, deity, architecture and festivals of ${temple.name} in ${temple.location}.`;
    const canonical = `https://varadanam.com/temple-history/${slug}`;

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', desc);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);

    // Inject structured data for this temple
    const existingScript = document.getElementById('temple-ld-json');
    if (existingScript) existingScript.remove();
    const script = document.createElement('script');
    script.id = 'temple-ld-json';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: desc,
      url: canonical,
      author: { '@type': 'Organization', name: 'Varadanam' },
      publisher: { '@type': 'Organization', name: 'Varadanam', url: 'https://varadanam.com' },
      about: {
        '@type': 'LandmarksOrHistoricalBuildings',
        name: temple.name,
        address: { '@type': 'PostalAddress', addressLocality: temple.location, addressCountry: 'IN' },
      },
    });
    document.head.appendChild(script);

    return () => {
      document.title = 'Varadanam — Temple Management Software | Online Vazhipadu & Seva Booking India';
      document.querySelector('meta[name="description"]')?.setAttribute('content', 'Varadanam is India\'s temple management software.');
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://varadanam.com/');
      document.getElementById('temple-ld-json')?.remove();
    };
  }, [temple, slug]);

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
        padding: isMobile ? '0 20px' : '0 48px', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(16,11,4,0.93)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,179,29,0.12)',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/default-monochrome.svg" alt="Varadanam" style={{ height: 36, width: 'auto' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 16 : 36 }}>
          {!isMobile && <Link to="/#features" style={{ color: 'rgba(250,246,239,0.7)', textDecoration: 'none', fontSize: 14.5 }}>Features</Link>}
          {!isMobile && <Link to="/blog" style={{ color: 'rgba(250,246,239,0.7)', textDecoration: 'none', fontSize: 14.5 }}>Blog</Link>}
          {!isMobile && <Link to="/temple-history" style={{ color: '#FFB31D', textDecoration: 'none', fontSize: 14.5 }}>Temple History</Link>}
          <Link to="/" style={{
            background: '#FF6906', color: '#fff', textDecoration: 'none',
            fontSize: 14, fontWeight: 500, padding: '9px 18px', borderRadius: 8,
          }}>Request a Demo</Link>
        </div>
      </nav>

      <div style={{ paddingTop: 72 }}>
        {/* Hero header */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(255,179,29,0.06) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,179,29,0.1)',
          padding: isMobile ? '48px 20px 40px' : '72px 32px 56px',
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

        {/* Hero image */}
        {temple.heroImage && (
          <div style={{ maxWidth: 860, margin: '0 auto', padding: isMobile ? '24px 20px 0' : '40px 32px 0' }}>
            <figure style={{ margin: 0 }}>
              <img
                src={temple.heroImage.src}
                alt={temple.heroImage.alt}
                style={{
                  width: '100%', borderRadius: 12,
                  display: 'block',
                  border: '1px solid rgba(255,179,29,0.15)',
                  objectFit: 'cover', maxHeight: 480,
                }}
              />
              <figcaption style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 12.5,
                color: 'rgba(250,246,239,0.3)', marginTop: 10,
                fontStyle: 'italic', textAlign: 'center', lineHeight: 1.5,
              }}>
                {temple.heroImage.caption}
              </figcaption>
            </figure>
          </div>
        )}

        {/* Quick facts bar */}
        <div style={{ borderBottom: '1px solid rgba(255,179,29,0.1)', background: 'rgba(255,179,29,0.03)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', padding: isMobile ? '20px' : '24px 32px', display: 'flex', flexWrap: 'wrap', gap: isMobile ? 16 : 32 }}>
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
        <div style={{ maxWidth: 860, margin: '0 auto', padding: isMobile ? '32px 20px 0' : '48px 32px 0' }}>
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
        <div style={{ maxWidth: 860, margin: '0 auto', padding: isMobile ? '40px 20px 60px' : '56px 32px 80px' }}>
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

              {/* Section image */}
              {section.image && (
                <figure style={{ margin: '0 0 32px' }}>
                  <img
                    src={section.image.src}
                    alt={section.image.alt}
                    style={{
                      width: '100%', borderRadius: 10,
                      display: 'block',
                      border: '1px solid rgba(255,179,29,0.12)',
                      objectFit: 'cover', maxHeight: 420,
                    }}
                  />
                  <figcaption style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 12,
                    color: 'rgba(250,246,239,0.28)', marginTop: 8,
                    fontStyle: 'italic', textAlign: 'center', lineHeight: 1.5,
                  }}>
                    {section.image.caption}
                  </figcaption>
                </figure>
              )}

              {/* Body */}
              <div style={{ paddingLeft: 0 }}>
                {renderBody(section.body)}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ maxWidth: 860, margin: '0 auto 60px', padding: isMobile ? '0 20px' : '0 32px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a1108 0%, #2a1a08 100%)',
            borderRadius: 14, padding: isMobile ? '32px 24px' : '40px 48px',
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
          <div style={{ maxWidth: 860, margin: '0 auto', padding: isMobile ? '0 20px 60px' : '0 32px 80px' }}>
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
        <div style={{ borderTop: '1px solid rgba(255,179,29,0.1)', padding: '32px 20px', textAlign: 'center' }}>
          <span style={{ fontSize: 13, color: 'rgba(250,246,239,0.3)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
            © 2026 Varadanam. Made with devotion in India.
          </span>
        </div>
      </div>
    </div>
  );
}
