/* Varadanam – Testimonials section */

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

function TestimonialsSection({ onDemo }) {
  return (
    <section id="testimonials" style={{
      background: '#faf6ef',
      padding: '100px 48px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 28, height: 1, background: '#FF6906' }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FF6906', fontFamily: 'DM Sans, sans-serif' }}>Testimonials</span>
            <div style={{ width: 28, height: 1, background: '#FF6906' }} />
          </div>
          <h2 style={{ fontFamily: 'Fondamento, serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 400, lineHeight: 1.15, color: '#1a1108', marginBottom: 14, textWrap: 'pretty' }}>
            Trusted by temples<br />
            <span style={{ color: '#FF6906' }}>across India.</span>
          </h2>
          <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 17, color: '#7a6a54', maxWidth: 480, margin: '0 auto' }}>
            Hear from the priests and trustees who run their temples on Varadanam.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 72 }}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

        {/* CTA band */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1108 0%, #2a1a08 100%)',
          borderRadius: 16,
          padding: '56px 64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 32, flexWrap: 'wrap',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative ring */}
          <div style={{ position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)', width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(255,179,29,0.1)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: -60, top: '50%', transform: 'translateY(-50%)', width: 280, height: 280, borderRadius: '50%', border: '1px solid rgba(255,105,6,0.1)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative' }}>
            <h3 style={{ fontFamily: 'Fondamento, serif', fontSize: 'clamp(24px, 3vw, 36px)', color: '#faf6ef', lineHeight: 1.2, marginBottom: 12, textWrap: 'pretty' }}>
              Ready to modernise your temple?
            </h3>
            <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 16, color: 'rgba(250,246,239,0.55)', maxWidth: 420 }}>
              Join 200+ temples already using Varadanam. Setup takes less than a day.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexShrink: 0, position: 'relative' }}>
            <a href="#demo" onClick={e => { e.preventDefault(); onDemo && onDemo(); }} style={{
              background: '#FF6906', color: '#fff', textDecoration: 'none',
              padding: '14px 32px', borderRadius: 8, fontSize: 15, fontWeight: 600,
              fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s',
              boxShadow: '0 6px 24px rgba(255,105,6,0.35)',
            }}
            onMouseEnter={e => { e.target.style.transform='translateY(-2px)'; e.target.style.boxShadow='0 10px 32px rgba(255,105,6,0.5)'; }}
            onMouseLeave={e => { e.target.style.transform='none'; e.target.style.boxShadow='0 6px 24px rgba(255,105,6,0.35)'; }}
            >Request a Demo</a>
            <a href="#features" style={{
              color: 'rgba(250,246,239,0.7)', textDecoration: 'none',
              padding: '14px 28px', borderRadius: 8, fontSize: 15,
              border: '1px solid rgba(250,246,239,0.15)', transition: 'all 0.2s',
              fontFamily: 'DM Sans, sans-serif',
            }}
            onMouseEnter={e => { e.target.style.borderColor='rgba(255,179,29,0.4)'; e.target.style.color='#FFB31D'; }}
            onMouseLeave={e => { e.target.style.borderColor='rgba(250,246,239,0.15)'; e.target.style.color='rgba(250,246,239,0.7)'; }}
            >Learn more</a>
          </div>
        </div>

      </div>
    </section>
  );
}

function TestimonialCard({ t }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      padding: '32px',
      border: '1px solid rgba(42,26,6,0.08)',
      display: 'flex', flexDirection: 'column', gap: 0,
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(255,105,6,0.1)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.04)'; }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFB31D">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>

      {/* Quote mark */}
      <div style={{ fontFamily: 'Georgia, serif', fontSize: 52, color: '#FF6906', lineHeight: 0.7, marginBottom: 12, opacity: 0.25 }}>"</div>

      <p style={{
        fontFamily: 'Lora, serif', fontStyle: 'italic',
        fontSize: 15, lineHeight: 1.75, color: '#4a3a28',
        marginBottom: 28, flex: 1,
      }}>{t.quote}</p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #FF6906, #FFB31D)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Fondamento, serif', fontSize: 16, color: '#fff',
        }}>{t.initials}</div>
        <div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#1a1108' }}>{t.name}</div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#9a8a74', marginTop: 2 }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TestimonialsSection });
