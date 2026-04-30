/* Varadanam – Features section */

const FEATURES = [
{
  icon:
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>,

  title: 'Online Seva Booking',
  desc: 'Devotees can browse, book, and pay for sevas from anywhere — on mobile or desktop. Automated confirmations and receipts.'
},
{
  icon:
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 10h20M6 15h4M14 15h4" />
      </svg>,

  title: 'Counter Billing',
  desc: 'Fast POS-style billing at the temple counter. Print receipts, manage queues, and handle cash or card with ease.'
},
{
  icon:
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="4" /><circle cx="17" cy="10" r="3" />
        <path d="M2 21v-1a7 7 0 0114 0v1M20 21v-1a4 4 0 00-3-3.87" />
      </svg>,

  title: 'Devotee Management',
  desc: 'Maintain a complete database of devotees — family details, booking history, gotra, nakshatra, and prasad preferences.'
},
{
  icon:
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
      </svg>,

  title: 'Temple Website',
  desc: 'A beautiful, branded website for your temple — with seva listing, event calendar, photo gallery, and live darshan schedule.'
},
{
  icon:
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M7 16l4-5 4 3 4-6" />
      </svg>,

  title: 'Reports & Analytics',
  desc: 'Daily, monthly, and annual reports on collections, seva popularity, and devotee footfall — exportable to PDF or Excel.'
},
{
  icon:
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v4H4zM4 12h16v4H4zM4 20h10" />
        <circle cx="19" cy="20" r="2" />
        <path d="M19 18v-4" />
      </svg>,

  title: 'Event & Festival Calendar',
  desc: 'Plan and publish upcoming festivals, special poojas, and utsavams. Notify devotees automatically via SMS or WhatsApp.'
}];


function FeaturesSection() {
  return (
    <section id="features" style={{
      background: '#faf6ef',
      padding: '100px 48px'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            marginBottom: 18
          }}>
            <div style={{ width: 28, height: 1, background: '#f96404' }} />
            <span style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: '#f96404',
              fontFamily: 'DM Sans, sans-serif'
            }}>Features</span>
          </div>
          <h2 style={{
            fontFamily: 'Fondamento, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 400,
            lineHeight: 1.15,
            color: '#1a1108',
            maxWidth: 580,
            textWrap: 'pretty',
            marginBottom: 16
          }}>
            Everything a temple needs,<br />
            <span style={{ color: '#f96404' }}>in one place.</span>
          </h2>
          <p style={{
            fontFamily: 'Lora, serif',
            fontStyle: 'italic',
            fontSize: 17,
            lineHeight: 1.7,
            color: '#7a6a54',
            maxWidth: 520
          }}>
            From the first devotee booking to end-of-day collection reports — Varadanam handles it all, so your priests can focus on the divine.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          background: 'rgba(42,26,6,0.07)',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid rgba(42,26,6,0.07)'
        }}>
          {FEATURES.map((f, i) =>
          <FeatureCard key={f.title} feature={f} index={i} />
          )}
        </div>

        {/* Trust bar */}
        <div style={{
          marginTop: 56,
          padding: '28px 36px',
          background: '#fff',
          borderRadius: 12,
          border: '1px solid rgba(42,26,6,0.08)',
          display: 'flex', alignItems: 'center',
          gap: 0,
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a6a54', fontFamily: 'DM Sans, sans-serif', marginRight: 32, whiteSpace: 'nowrap' }}>Works with</span>

          {/* Razorpay */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 28px', borderRight: '1px solid rgba(42,26,6,0.08)' }}>
            {/* Razorpay logo SVG */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M17.5 3L6 14.5l4 1.5L7.5 21 19 9.5l-4-1.5L17.5 3z" fill="#2D9EE0" />
            </svg>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#072654', fontFamily: 'DM Sans, sans-serif', letterSpacing: '-0.02em' }}>razorpay</span>
          </div>

          {/* WhatsApp */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 28px', borderRight: '1px solid rgba(42,26,6,0.08)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.979-1.401A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-1.5 13.5c-2.5-1.333-4-3.5-4.167-3.833-.167-.333-.083-.583.083-.75l.584-.583c.166-.167.25-.25.333-.417.083-.167 0-.333-.083-.5L6.5 8.5c-.083-.167-.25-.333-.417-.25-.583.25-1.5.833-1.583 1.75C4.417 11 5.25 12.917 7.25 15c2 2.083 3.917 2.833 5.25 2.833.917 0 1.5-.916 1.75-1.5.083-.166-.083-.333-.25-.416l-1.667-.75c-.166-.083-.333-.167-.5-.083-.166.083-.25.166-.416.333-.167.167-.417.25-.667.083z" fill="#25D366" />
            </svg>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#128C7E', fontFamily: 'DM Sans, sans-serif' }}>WhatsApp</span>
          </div>

          {/* SMS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 28px', borderRight: '1px solid rgba(42,26,6,0.08)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f96404" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#2a1a06', fontFamily: 'DM Sans, sans-serif' }}>SMS </span>
          </div>

          {/* Multi-device */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 28px', borderRight: '1px solid rgba(42,26,6,0.08)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f96404" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18" />
            </svg>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#2a1a06', fontFamily: 'DM Sans, sans-serif' }}>Any Device</span>
          </div>

          {/* Multi-language */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 28px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f96404" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
            </svg>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#2a1a06', fontFamily: 'DM Sans, sans-serif' }}>Multi-language</span>
          </div>
        </div>
      </div>
    </section>);

}

function FeatureCard({ feature, index }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#fff' : '#faf6ef',
        padding: '40px 36px',
        transition: 'background 0.2s',
        cursor: 'default',
        position: 'relative'
      }}>
      
      {/* Icon */}
      <div style={{
        width: 48, height: 48,
        borderRadius: 10,
        background: hovered ? 'rgba(249,100,4,0.1)' : 'rgba(249,100,4,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#f96404',
        marginBottom: 20,
        transition: 'background 0.2s'
      }}>
        {feature.icon}
      </div>

      <h3 style={{
        fontFamily: 'Fondamento, serif',
        fontSize: 19,
        fontWeight: 400,
        color: '#1a1108',
        marginBottom: 10,
        lineHeight: 1.25
      }}>{feature.title}</h3>

      <p style={{
        fontSize: 14,
        lineHeight: 1.7,
        color: '#7a6a54',
        fontFamily: 'DM Sans, sans-serif'
      }}>{feature.desc}</p>

      {/* Hover accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 2,
        background: 'linear-gradient(90deg, #f96404, #FFB31D)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.25s'
      }} />
    </div>);

}

Object.assign(window, { FeaturesSection, FeatureCard });