/* Varadanam – Dashboard Preview section */

const PREVIEW_TABS = ['Dashboard', 'Counter Billing', 'Seva Booking'];

function PreviewSection() {
  const [tab, setTab] = React.useState(0);

  return (
    <section id="preview" style={{
      background: '#0e0904',
      padding: '100px 48px',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 28, height: 1, background: '#FF6906' }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FF6906', fontFamily: 'DM Sans, sans-serif' }}>Product Preview</span>
            </div>
            <h2 style={{ fontFamily: 'Fondamento, serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 400, lineHeight: 1.15, color: '#faf6ef', maxWidth: 520, textWrap: 'pretty' }}>
              Built for how temples<br /><span style={{ color: '#FF6906' }}>actually work.</span>
            </h2>
          </div>
          {/* Tabs */}
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

        {/* Mock screen */}
        <div style={{
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
        }}>
          {/* Browser chrome */}
          <div style={{
            background: '#1c1409', padding: '12px 20px',
            display: 'flex', alignItems: 'center', gap: 10,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
            </div>
            <div style={{
              flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 6,
              padding: '5px 14px', fontSize: 12, color: 'rgba(255,255,255,0.3)',
              fontFamily: 'monospace', textAlign: 'center',
            }}>admin.varadanam.com / {PREVIEW_TABS[tab].toLowerCase().replace(' ', '-')}</div>
          </div>

          {/* Screen content */}
          <div style={{ display: 'flex', height: 480, background: '#f5ede0' }}>
            {/* Sidebar */}
            <div style={{ width: 200, background: '#1a1108', padding: 16, display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
              <div style={{ padding: '12px 8px', marginBottom: 8 }}>
                <img src="uploads/default-monochrome.svg" alt="Varadanam" style={{ height: 24, width: 'auto' }} />
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
                  fontFamily: 'DM Sans, sans-serif',
                  cursor: 'pointer',
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
        </div>
      </div>
    </section>
  );
}

/* ── Dashboard mock ── */
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
          <div style={{ fontSize: 17, fontWeight: 600, color: '#1a1108', fontFamily: 'Fondamento, serif' }}>Good morning, Admin</div>
          <div style={{ fontSize: 12, color: '#9a8a74', marginTop: 2 }}>Wednesday, 30 April 2026</div>
        </div>
        <div style={{ background: '#FF6906', color: '#fff', borderRadius: 6, padding: '7px 16px', fontSize: 12, fontWeight: 500, fontFamily: 'DM Sans, sans-serif' }}>+ New Booking</div>
      </div>
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '1px solid rgba(42,26,6,0.07)' }}>
            <div style={{ fontSize: 10, color: '#9a8a74', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, fontFamily: 'DM Sans, sans-serif' }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1108', fontFamily: 'DM Sans, sans-serif' }}>{s.value}</div>
            {s.change && <div style={{ fontSize: 11, color: s.up ? '#16a34a' : '#dc2626', marginTop: 4 }}>{s.up ? '↑' : '↓'} {s.change} vs yesterday</div>}
          </div>
        ))}
      </div>
      {/* Recent sevas table */}
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid rgba(42,26,6,0.07)', overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(42,26,6,0.06)', fontSize: 13, fontWeight: 600, color: '#1a1108', fontFamily: 'DM Sans, sans-serif' }}>Today's Sevas</div>
        {recentSevas.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderBottom: i < recentSevas.length-1 ? '1px solid rgba(42,26,6,0.05)' : 'none', gap: 12 }}>
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

/* ── Counter Billing mock ── */
function CounterMock() {
  const items = [
    { name: 'Ganesha Abhishekam', price: 501 },
    { name: 'Sahasranamam', price: 251 },
    { name: 'Prasad (Large)', price: 100 },
  ];
  const total = items.reduce((a, b) => a + b.price, 0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', height: '100%', background: '#f9f5ee' }}>
      {/* Seva list */}
      <div style={{ padding: 20, overflow: 'auto' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1108', marginBottom: 14, fontFamily: 'DM Sans, sans-serif' }}>Select Seva / Item</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {['Ganesha Abhishekam','Rudrabhishekam','Sahasranamam','Kumkumarchana','Lakshmi Pooja','Satyanarayana Pooja','Archana','Prasad (Small)','Prasad (Large)'].map(seva => (
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
      {/* Bill panel */}
      <div style={{ background: '#fff', borderLeft: '1px solid rgba(42,26,6,0.08)', padding: 20, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1108', marginBottom: 16, fontFamily: 'DM Sans, sans-serif' }}>Current Bill</div>
        <div style={{ flex: 1 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(42,26,6,0.06)', fontSize: 12.5, color: '#1a1108', fontFamily: 'DM Sans, sans-serif' }}>
              <span>{item.name}</span>
              <span style={{ fontWeight: 600 }}>₹{item.price}</span>
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

/* ── Seva Booking mock ── */
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
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1108', fontFamily: 'Fondamento, serif' }}>Book a Seva</div>
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

Object.assign(window, { PreviewSection });
