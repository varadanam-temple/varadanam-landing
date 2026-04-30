/* Varadanam – Request Demo Modal */

function DemoModal({ open, onClose }) {
  const [form, setForm] = React.useState({
    name: '', email: '', phone: '', temple: '', role: ''
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  // Close on Escape
  React.useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  // Lock body scroll
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone(true); }, 1400);
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
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(8,5,2,0.85)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.2s ease',
      }} />

      {/* Modal */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 201,
        width: 'min(560px, 94vw)',
        background: '#1a1108',
        border: '1px solid rgba(255,179,29,0.15)',
        borderRadius: 20,
        overflow: 'hidden',
        animation: 'modalIn 0.25s ease',
        boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
      }}>
        {/* Top accent */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, #FF6906, #FFB31D, #FF6906)' }} />

        {/* Header */}
        <div style={{ padding: '28px 32px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <img src="uploads/default-monochrome.svg" alt="Varadanam" style={{ height: 28, width: 'auto' }} />
            </div>
            {!done && <div style={{ fontFamily: 'Fondamento, serif', fontSize: 22, color: '#faf6ef', lineHeight: 1.2, marginTop: 12 }}>
              Request a Demo
            </div>}
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
              <path d="M1 1l12 12M13 1L1 13"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 32px 32px' }}>
          {done ? (
            /* ── Success state ── */
            <div style={{ textAlign: 'center', padding: '32px 0 16px' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(255,105,6,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6906" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div style={{ fontFamily: 'Fondamento, serif', fontSize: 24, color: '#faf6ef', marginBottom: 12 }}>Thank you!</div>
              <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 15, color: 'rgba(250,246,239,0.6)', lineHeight: 1.65, maxWidth: 360, margin: '0 auto 28px' }}>
                We've received your request. Our team will reach out within 24 hours to schedule your personalised demo.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,179,29,0.08)', border: '1px solid rgba(255,179,29,0.2)', borderRadius: 100, padding: '6px 18px' }}>
                <span style={{ fontSize: 11, letterSpacing: '0.2em', color: '#FFB31D', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>Om Siddhi Vinayakaya Namaha</span>
              </div>
            </div>
          ) : (
            /* ── Form ── */
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
                    <label style={labelStyle}>Email Address <span style={{ opacity: 0.45, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                    <input type="email" style={inputStyle} placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)}
                      onFocus={e => e.target.style.borderColor = '#FF6906'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,179,29,0.15)'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number *</label>
                    <input required type="tel" style={inputStyle} placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)}
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
                    background: '#FF6906', color: '#fff',
                    fontSize: 15, fontWeight: 600,
                    fontFamily: 'DM Sans, sans-serif', cursor: 'pointer',
                    transition: 'all 0.2s', opacity: submitting ? 0.8 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    marginTop: 4,
                  }}>
                    {submitting ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
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

Object.assign(window, { DemoModal });
