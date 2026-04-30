import { Link } from 'react-router-dom';
import { posts } from './blogPosts.js';
import { useIsMobile } from './useIsMobile.js';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Blog() {
  const isMobile = useIsMobile();
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
          {!isMobile && <Link to="/blog" style={{ color: '#FFB31D', textDecoration: 'none', fontSize: 14.5 }}>Blog</Link>}
          <Link to="/" style={{
            background: '#FF6906', color: '#fff', textDecoration: 'none',
            fontSize: 14, fontWeight: 500, padding: '9px 18px', borderRadius: 8,
          }}>Request a Demo</Link>
        </div>
      </nav>

      {/* Header */}
      <div style={{ paddingTop: 72 }}>
        <div style={{
          padding: isMobile ? '48px 20px 36px' : '72px 48px 56px',
          borderBottom: '1px solid rgba(255,179,29,0.1)',
          maxWidth: 1200, margin: '0 auto',
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 28, height: 1, background: '#FF6906' }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FF6906', fontFamily: 'DM Sans, sans-serif' }}>Blog</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 400, color: '#faf6ef', marginBottom: 16, lineHeight: 1.15 }}>
            Temple Management Insights
          </h1>
          <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 18, color: 'rgba(250,246,239,0.55)', maxWidth: 540, lineHeight: 1.65 }}>
            Guides, tips, and best practices for temple trustees and priests across Kerala and India.
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 20px' : '64px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))', gap: isMobile ? 20 : 32 }}>
          {posts.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{
                background: 'rgba(255,179,29,0.04)',
                border: '1px solid rgba(255,179,29,0.1)',
                borderRadius: 14, padding: '32px',
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'pointer', height: '100%',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,105,6,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,179,29,0.1)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ fontSize: 12, color: 'rgba(250,246,239,0.35)', fontFamily: 'DM Sans, sans-serif', marginBottom: 14, letterSpacing: '0.05em' }}>
                  {formatDate(post.date)} · {post.author}
                </div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 400, color: '#faf6ef', lineHeight: 1.35, marginBottom: 14 }}>
                  {post.title}
                </h2>
                <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 14.5, color: 'rgba(250,246,239,0.5)', lineHeight: 1.7, marginBottom: 24 }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#FF6906', fontSize: 13.5, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>
                  Read article
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 7h10M7 2l5 5-5 5" />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,179,29,0.1)', padding: '32px 20px', textAlign: 'center' }}>
        <span style={{ fontSize: 13, color: 'rgba(250,246,239,0.3)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
          © 2026 Varadanam. Made with devotion in India.
        </span>
      </div>
    </div>
  );
}
