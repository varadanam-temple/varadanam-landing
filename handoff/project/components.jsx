/* Varadanam – shared components */

function GaneshaIcon({ color = "#FFB31D", size = 48 }) {
  return (
    <svg width={size} height={Math.round(size * 1.15)} viewBox="0 0 100 115" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="38" y="10" width="24" height="8" rx="2" />
      <ellipse cx="50" cy="8" rx="5" ry="4" />
      <path d="M35 18 Q50 8 65 18" />
      <ellipse cx="50" cy="38" rx="24" ry="22" />
      <ellipse cx="20" cy="36" rx="12" ry="16" />
      <ellipse cx="80" cy="36" rx="12" ry="16" />
      <ellipse cx="20" cy="36" rx="7" ry="10" strokeOpacity="0.4" />
      <ellipse cx="80" cy="36" rx="7" ry="10" strokeOpacity="0.4" />
      <circle cx="42" cy="32" r="3.5" />
      <circle cx="58" cy="32" r="3.5" />
      <circle cx="42" cy="32" r="1.2" fill={color} stroke="none" />
      <circle cx="58" cy="32" r="1.2" fill={color} stroke="none" />
      <circle cx="50" cy="25" r="2.2" fill={color} stroke="none" />
      <path d="M50 44 Q44 54 38 58 Q30 63 34 70 Q38 76 44 72" />
      <circle cx="45" cy="72" r="4" />
      <path d="M60 46 Q68 52 66 62 Q65 66 62 64" />
      <path d="M26 60 Q20 75 22 90 Q24 100 50 102 Q76 100 78 90 Q80 75 74 60" />
      <circle cx="50" cy="82" r="4" />
      <path d="M26 65 Q14 60 10 50 Q8 42 14 40 Q18 38 18 44" />
      <line x1="10" y1="42" x2="8" y2="36" />
      <line x1="12" y1="40" x2="10" y2="34" />
      <line x1="14" y1="40" x2="14" y2="33" />
      <path d="M74 65 Q86 60 90 50 Q92 42 86 40" />
      <path d="M36 100 Q32 108 40 110 Q50 112 60 110 Q68 108 64 100" />
    </svg>
  );
}

function MandalaBg({ opacity = 0.05 }) {
  const spokes = Array.from({ length: 24 }).map((_, i) => {
    const rad = (i * 15) * Math.PI / 180;
    return { x1: 300 + 40 * Math.cos(rad), y1: 300 + 40 * Math.sin(rad), x2: 300 + 280 * Math.cos(rad), y2: 300 + 280 * Math.sin(rad) };
  });
  return (
    <svg viewBox="0 0 600 600" fill="none" style={{ width: '100%', height: '100%', opacity }}>
      {[40,80,120,160,200,240,280].map(r => (
        <circle key={r} cx="300" cy="300" r={r} stroke="#FFB31D" strokeWidth={r % 80 === 0 ? 1 : 0.5} />
      ))}
      {spokes.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#FFB31D" strokeWidth="0.5" opacity="0.7" />
      ))}
      {[120,200].map(r => (
        <circle key={'p'+r} cx="300" cy="300" r={r} stroke="#FF6906" strokeWidth="0.6" strokeDasharray="4 8" />
      ))}
    </svg>
  );
}

function Navbar({ scrolled, onDemo }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 48px', height: 72,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(16,11,4,0.93)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'rgba(255,179,29,0.12)' : 'transparent'}`,
      transition: 'all 0.4s ease',
    }}>
      {/* Logo */}
      <a href="#hero" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="uploads/default-monochrome.svg" alt="Varadanam" style={{ height: 40, width: 'auto', display: 'block' }} />
      </a>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {['Features', 'How it works', 'Pricing'].map(label => (
          <a key={label} href="#" style={{ color: 'rgba(250,246,239,0.7)', textDecoration: 'none', fontSize: 14.5, letterSpacing: '0.02em', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(250,246,239,0.7)'}
          >{label}</a>
        ))}
        <a href="#demo" onClick={e => { e.preventDefault(); onDemo && onDemo(); }} style={{
          background: '#FF6906', color: '#fff', textDecoration: 'none',
          fontSize: 14, fontWeight: 500, padding: '10px 22px', borderRadius: 8,
          transition: 'all 0.2s', boxShadow: '0 2px 12px rgba(255,105,6,0.3)',
        }}
          onMouseEnter={e => { e.target.style.background='#e55a00'; e.target.style.boxShadow='0 4px 20px rgba(255,105,6,0.45)'; }}
          onMouseLeave={e => { e.target.style.background='#FF6906'; e.target.style.boxShadow='0 2px 12px rgba(255,105,6,0.3)'; }}
        >Request a Demo</a>
      </div>
    </nav>
  );
}

function Hero({ onDemo }) {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => { setTimeout(() => setVis(true), 80); }, []);

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
    <section style={{
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
          fontFamily: 'Fondamento, serif',
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
          A complete platform for Hindu temples — online seva booking, counter billing, devotee management, and a branded temple website.
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
            onMouseEnter={e => { e.target.style.transform='translateY(-2px)'; e.target.style.boxShadow='0 10px 36px rgba(255,105,6,0.48)'; }}
            onMouseLeave={e => { e.target.style.transform='none'; e.target.style.boxShadow='0 6px 28px rgba(255,105,6,0.35)'; }}
          >Request a Demo</a>
          <a href="#features" style={{
            color: 'rgba(250,246,239,0.75)', textDecoration: 'none', fontSize: 15,
            padding: '16px 28px', borderRadius: 10,
            border: '1px solid rgba(250,246,239,0.15)',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,179,29,0.4)'; e.currentTarget.style.color='#FFB31D'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(250,246,239,0.15)'; e.currentTarget.style.color='rgba(250,246,239,0.75)'; }}
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
          display: 'flex', gap: 0, justifyContent: 'center',
          marginTop: 72,
          padding: '32px 0 0',
          borderTop: '1px solid rgba(255,179,29,0.1)',
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              padding: '0 40px',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,179,29,0.12)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'Fondamento, serif', fontSize: 32, color: '#FFB31D', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: 'rgba(250,246,239,0.5)', letterSpacing: '0.06em', marginTop: 6, textTransform: 'uppercase' }}>{s.label}</div>
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

Object.assign(window, { GaneshaIcon, MandalaBg, Navbar, Hero });
