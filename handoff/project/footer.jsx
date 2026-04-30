/* Varadanam – Footer */

function Footer() {
  return (
    <footer style={{
      background: '#080500',
      borderTop: '1px solid rgba(255,179,29,0.1)',
      padding: '72px 48px 36px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48,
          marginBottom: 64,
        }}>

          {/* Brand column */}
          <div>
            <img src="uploads/default-monochrome.svg" alt="Varadanam"
              style={{ height: 36, width: 'auto', marginBottom: 20 }} />
            <p style={{
              fontSize: 14, lineHeight: 1.7,
              color: 'rgba(250,246,239,0.45)',
              fontFamily: 'Lora, serif', fontStyle: 'italic',
              maxWidth: 280, marginBottom: 28,
            }}>
              A complete digital platform built for Hindu temples — bringing devotees and divinity closer through technology.
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'Twitter/X', path: 'M18 4L13.5 9.5M6 20l5.5-5.5M18 4l-12 16M18 4h-4M6 20h4' },
                { label: 'Instagram', path: 'M16 3H8a5 5 0 00-5 5v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5zM12 8a4 4 0 100 8 4 4 0 000-8zm4.5-1.5a1 1 0 100 2 1 1 0 000-2z' },
                { label: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z' },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label} style={{
                  width: 36, height: 36, borderRadius: 8,
                  border: '1px solid rgba(255,179,29,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(250,246,239,0.45)',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
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

          {/* Product links */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFB31D', marginBottom: 20, fontFamily: 'DM Sans, sans-serif' }}>Product</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Features', 'How it works', 'Pricing', 'Roadmap'].map(l => (
                <a key={l} href="#" style={{ color: 'rgba(250,246,239,0.5)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#faf6ef'}
                  onMouseLeave={e => e.target.style.color = 'rgba(250,246,239,0.5)'}
                >{l}</a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFB31D', marginBottom: 20, fontFamily: 'DM Sans, sans-serif' }}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['About Us', 'Blog', 'Careers', 'Contact'].map(l => (
                <a key={l} href="#" style={{ color: 'rgba(250,246,239,0.5)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#faf6ef'}
                  onMouseLeave={e => e.target.style.color = 'rgba(250,246,239,0.5)'}
                >{l}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFB31D', marginBottom: 20, fontFamily: 'DM Sans, sans-serif' }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: 'M4 4h16v16H4zM4 8l8 6 8-6', text: 'hello@varadanam.com' },
                { icon: 'M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015 2h3a2 2 0 012 1.72c.13 1 .36 1.97.71 2.9a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.93.35 1.9.58 2.9.71A2 2 0 0122 16.92z', text: '+91 98765 43210' },
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

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,179,29,0.15), transparent)', marginBottom: 28 }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}>
          <span style={{ fontSize: 13, color: 'rgba(250,246,239,0.3)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
            © 2026 Varadanam. Made with devotion in India.
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" style={{ fontSize: 12.5, color: 'rgba(250,246,239,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'rgba(250,246,239,0.6)'}
                onMouseLeave={e => e.target.style.color = 'rgba(250,246,239,0.3)'}
              >{l}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
