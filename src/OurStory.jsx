import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BURNT = '#DF8E40';
const DARK = '#2A1A0A';
const serif = "'Noto Serif', serif";
const newsreader = "'Newsreader', serif";

const content = {
  en: {
    lang: 'English',
    hero: {
      label: 'Our Story',
      title: ['Rooted in Tradition.', 'Built for the Future.'],
      subtitle: 'Varadanam was born from a simple truth: our temples deserve better.',
    },
    sections: [
      {
        num: '01',
        label: 'The Moment',
        paras: [
          'There is a moment every devotee knows — standing before the sanctum sanctorum, the air thick with incense, the sound of the bell dissolving into silence. In that moment, nothing else exists. Only the divine.',
          'We built Varadanam to protect that moment.',
          'Not to replace it with technology. Not to turn a sacred act into a transaction. But to remove every obstacle that stands between a devotee and their offering — the missed phone calls, the forgotten dates, the long queues, the paper registers that flood in the rains and fade in the sun.',
        ],
      },
      {
        num: '02',
        label: 'The Truth',
        paras: [
          'For centuries, temples have been the beating heart of our communities. They have survived invasions, weathered monsoons, outlasted empires. Their priests have kept the fire burning through every generation. Their rituals — the Pushpanjali at dawn, the Deeparadhana at dusk, the Thulabharam offered with a trembling heart — carry within them an unbroken thread that stretches back thousands of years.',
          "But the way we manage these sacred institutions has not kept pace. Trustees struggle with handwritten records. Devotees living abroad cannot book a vazhipad for their father's birthday. Priests have no way to know who is coming or what they need. The heritage is timeless. The tools are not.",
        ],
      },
      {
        num: '03',
        label: 'The Name',
        paras: [
          'Varadanam means "the giver of blessings."',
          'That name was chosen deliberately. We are not a temple management system. We are a bridge — between the ancient and the present, between the devotee in Chennai and the one in Canada, between the priest who has given his life to service and the trustee who wants to honour that service with dignity.',
          'Every feature we build asks one question first: Does this serve the devotee? Does this honour the temple? If yes, we build it. If it gets in the way, we leave it out.',
        ],
      },
      {
        num: '04',
        label: 'The Roots',
        paras: [
          'We started with Kerala temples because that is where our roots are. The tradition of Malayalam temple worship — its precision, its depth, its insistence on doing things right — shaped how we think about this platform.',
          'We are people who grew up visiting temples, who know what it means to light a lamp for a departed grandmother, who understand that a nakshatra is not just a dropdown field. That lived understanding is in every line of code we write.',
          'But the need is universal. Wherever there is a community gathered around the sacred, there is a place for Varadanam.',
        ],
      },
    ],
    pullQuote: '"We are not a temple management system. We are a bridge — between the ancient and the present, between the devotee in Chennai and the one in Canada."',
    closing: {
      line1: 'We are just getting started.',
      line2: 'The heritage is ancient. The mission is new.',
      sub: 'Come, be part of it.',
      cta: 'Get Your Temple Online',
    },
  },

  ml: {
    lang: 'മലയാളം',
    hero: {
      label: 'ഞങ്ങളുടെ കഥ',
      title: ['പുരാതനമായ വിശ്വാസം.', 'ആധുനികമായ ലളിതവൽക്കരണം.'],
      subtitle: 'ഒരു ലളിതമായ സത്യത്തിൽ നിന്ന് ജനിച്ചത്: നമ്മുടെ ക്ഷേത്രങ്ങൾക്ക് ഇനിയും മികച്ചത് അർഹിക്കുന്നു.',
    },
    sections: [
      {
        num: '01',
        label: 'ആ നിമിഷം',
        paras: [
          'ഓരോ ഭക്തനും അറിയുന്ന ഒരു നിമിഷമുണ്ട് — ശ്രീകോവിലിന് മുന്നിൽ കൈകൂപ്പി നിൽക്കുമ്പോൾ, ചന്ദനത്തിരിയുടെ സുഗന്ധവും മണിനാദവും ആ നിശ്ശബ്ദതയിൽ അലിഞ്ഞുചേരുന്ന നിമിഷം. അവിടെ മറ്റൊന്നും പ്രസക്തമല്ല, ഭഗവാനും ഭക്തനും മാത്രം.',
          'ഈ പവിത്രമായ നിമിഷത്തെ സംരക്ഷിക്കാനാണ് ഞങ്ങൾ വരദാനം ഒരുക്കിയിരിക്കുന്നത്.',
          'ഭക്തിയെ ഒരു സാങ്കേതിക വിദ്യ കൊണ്ട് മാറ്റിസ്ഥാപിക്കാനല്ല ഞങ്ങൾ ആഗ്രഹിക്കുന്നത്. മറിച്ച്, ഭക്തനും ഈശ്വരനും ഇടയിലുള്ള തടസ്സങ്ങളെ നീക്കാനാണ്. തിരക്കുപിടിച്ച വരികളും, വിട്ടുപോയ വിളികളും, മഴയത്ത് നനഞ്ഞും വെയിലത്ത് മങ്ങിയും പോകുന്ന കടലാസ് രജിസ്റ്ററുകളും ഇനി നിങ്ങളുടെ പ്രാർത്ഥനയ്ക്ക് തടസ്സമാകരുത്.',
        ],
      },
      {
        num: '02',
        label: 'സത്യം',
        paras: [
          'നൂറ്റാണ്ടുകളായി നമ്മുടെ സമൂഹത്തിന്റെ ജീവനാഡിയാണ് ക്ഷേത്രങ്ങൾ. വിദേശ ആക്രമണങ്ങളെയും പ്രകൃതിക്ഷോഭങ്ങളെയും അതിജീവിച്ച്, തലമുറകളായി കെടാവിളക്കുപോലെ നമ്മുടെ സംസ്കാരത്തെ അവ കാത്തുസൂക്ഷിക്കുന്നു. പുലർകാലത്തെ പുഷ്പാഞ്ജലിയും സന്ധ്യാനേരത്തെ ദീപാരാധനയും ഹൃദയം ഉരുകി നടത്തുന്ന തുലാഭാരവുമെല്ലാം ആയിരക്കണക്കിന് വർഷങ്ങളായി തുടരുന്ന അഭേദ്യമായ വിശ്വാസത്തിന്റെ കണ്ണികളാണ്.',
          'എന്നാൽ, കാലം മാറിയപ്പോൾ ക്ഷേത്രഭരണ രീതികൾക്ക് മാറ്റമുണ്ടായില്ല. കൈപ്പടയിലെഴുതിയ കണക്കുകൾ സൂക്ഷിക്കാൻ ഭാരവാഹികൾ ബുദ്ധിമുട്ടുന്നു. വിദേശത്ത് കഴിയുന്ന ഭക്തർക്ക് പ്രിയപ്പെട്ടവരുടെ ജന്മനാളിൽ ഒരു വഴിപാട് കഴിക്കാൻ സാധിക്കുന്നില്ല. പൈതൃകം പൗരാണികമാണെങ്കിലും, നാം ഉപയോഗിക്കുന്ന ഉപകരണങ്ങൾ കാലഹരണപ്പെട്ടതാണ്. ഈ വിടവ് നികത്താനാണ് വരദാനം ശ്രമിക്കുന്നത്.',
        ],
      },
      {
        num: '03',
        label: 'പേരിന് പിന്നിൽ',
        paras: [
          '\'വരദാനം\' എന്നാൽ \'അനുഗ്രഹങ്ങൾ നൽകുന്നത്\' എന്നാണർത്ഥം.',
          'ഞങ്ങൾ ഇതൊരു കേവല സോഫ്റ്റ്‌വെയറായി കാണുന്നില്ല. ഇതൊരു പാലമാണ് — പ്രാചീന സംസ്കാരവും ആധുനിക കാലവും തമ്മിലുള്ള പാലം. ചെന്നൈയിലോ കാനഡയിലോ ഇരിക്കുന്ന ഒരു ഭക്തനെ തന്റെ ഗ്രാമത്തിലെ ക്ഷേത്രവുമായി ബന്ധിപ്പിക്കുന്ന പാലം.',
          'ഓരോ പുതിയ ഫീച്ചർ വികസിപ്പിക്കുമ്പോഴും ഞങ്ങൾ സ്വയം ചോദിക്കുന്നത് ഒന്നുമാത്രം: "ഇത് ഭക്തന് ഉപകരിക്കുമോ? ഇത് ക്ഷേത്രത്തിന്റെ പവിത്രതയെ ആദരിക്കുന്നുണ്ടോ?" ഉത്തരം \'അതെ\' എന്നാണെങ്കിൽ മാത്രം ഞങ്ങൾ അത് നടപ്പിലാക്കുന്നു.',
        ],
      },
      {
        num: '04',
        label: 'ഞങ്ങളുടെ വേരുകൾ',
        paras: [
          'കേരളത്തിലെ ക്ഷേത്രങ്ങളിൽ നിന്നാണ് ഞങ്ങൾ തുടങ്ങിയത്. അതുകൊണ്ടുതന്നെ കേരളീയ ക്ഷേത്രവിശ്വാസത്തിലെ നിഷ്ഠയും ആഴവും കൃത്യതയുമാണ് ഈ പ്ലാറ്റ്‌ഫോമിന്റെ അടിത്തറ.',
          'ക്ഷേത്രമുറ്റങ്ങളിൽ ഓടിക്കളിച്ചു വളർന്ന, പിതൃക്കൾക്കായി വിളക്ക് തെളിക്കുന്നതിന്റെ പുണ്യം അറിയുന്ന, ഓരോ \'നക്ഷത്രവും\' വെറുമൊരു വാക്കല്ല മറിച്ച് ഒരാളുടെ ജീവിതമാണെന്ന് തിരിച്ചറിയുന്ന ഒരു കൂട്ടം ആളുകളാണ് ഇതിന് പിന്നിൽ. ആ ബോധ്യം ഞങ്ങൾ എഴുതുന്ന ഓരോ കോഡിലുമുണ്ട്.',
          'കേരളത്തിൽ നിന്നാണ് തുടക്കമെങ്കിലും, പവിത്രമായ ആത്മീയത തേടുന്ന ലോകത്തെവിടെയുള്ള ഭക്തർക്കും സമാധാനത്തോടെ ഉപയോഗിക്കാവുന്ന ഒന്നാണ് വരദാനം.',
        ],
      },
    ],
    pullQuote: '"ഞങ്ങൾ ഇതൊരു കേവല സോഫ്റ്റ്‌വെയറായി കാണുന്നില്ല. ഇതൊരു പാലമാണ് — പ്രാചീന സംസ്കാരവും ആധുനിക കാലവും തമ്മിലുള്ള പാലം."',
    closing: {
      line1: 'ഇനിയും ഏറെ ദൂരം പോകാനുണ്ട്.',
      line2: 'പൈതൃകം പൗരാണികം. ദൗത്യം നവീനം.',
      sub: 'വരൂ, ഇതിന്റെ ഭാഗമാകൂ.',
      cta: 'നിങ്ങളുടെ ക്ഷേത്രം ഓൺലൈനിൽ',
    },
  },
};

function Navbar({ lang, toggleLang }) {
  return (
    <nav style={{ backdropFilter: 'blur(12px)', background: 'rgba(255,249,235,0.92)', borderBottom: '1px solid rgba(29,28,19,0.08)', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ fontFamily: serif, fontWeight: 700, color: BURNT, fontSize: 22, letterSpacing: -1, textDecoration: 'none' }}>
          🛕 Varadanam
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link to="/" style={{ fontFamily: serif, color: DARK, fontSize: 16, opacity: 0.8, textDecoration: 'none' }}>Home</Link>
          <button
            onClick={toggleLang}
            style={{ fontFamily: serif, fontWeight: 700, fontSize: 14, color: BURNT, background: 'transparent', border: `1.5px solid rgba(223,142,64,0.5)`, borderRadius: 20, padding: '8px 18px', cursor: 'pointer' }}>
            {lang === 'en' ? 'മലയാളം' : 'English'}
          </button>
          <Link to="/#contact" style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, background: BURNT, color: '#fff', textDecoration: 'none', borderRadius: 24, padding: '10px 24px', boxShadow: '0 10px 25px -6px rgba(223,142,64,0.4)' }}>
            Begin Onboarding
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function OurStory() {
  const [lang, setLang] = useState('ml');
  const c = content[lang];

  useEffect(() => {
    document.title = 'Our Story — Varadanam | Temple Management Software Born in Kerala';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'The story behind Varadanam — built to protect the sacred moment between devotee and divine. Temple management software rooted in Kerala\'s temple tradition.');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://varadanam.com/our-story');
    return () => {
      document.title = 'Varadanam — Temple Management Software | Online Vazhipadu & Seva Booking India';
      document.querySelector('meta[name="description"]')?.setAttribute('content', 'Temple management software for Kerala temples — online vazhipadu & seva booking, counter billing, devotee management, and a branded temple website. Trusted by 200+ temples.');
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://varadanam.com/');
    };
  }, []);

  return (
    <div style={{ background: '#fff9eb', minHeight: '100vh' }}>
      <Navbar lang={lang} toggleLang={() => setLang(l => l === 'en' ? 'ml' : 'en')} />

      {/* Hero */}
      <div style={{ paddingTop: 120, paddingBottom: 80, borderBottom: '1px solid rgba(29,28,19,0.08)', background: 'linear-gradient(180deg, #fff3dc 0%, #fff9eb 100%)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <p style={{ fontFamily: serif, fontWeight: 700, color: BURNT, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>
            {c.hero.label}
          </p>
          <h1 style={{ fontFamily: serif, fontWeight: 700, color: DARK, fontSize: 'clamp(36px,6vw,64px)', lineHeight: 1.1, letterSpacing: -1, marginBottom: 28 }}>
            {c.hero.title[0]}<br />
            <span style={{ color: BURNT }}>{c.hero.title[1]}</span>
          </h1>
          <p style={{ fontFamily: newsreader, fontSize: 22, color: 'rgba(29,28,19,0.7)', lineHeight: 1.7 }}>
            {c.hero.subtitle}
          </p>
        </div>
      </div>

      {/* Story body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 32px' }}>
        {c.sections.map((s, i) => (
          <div key={s.num} style={{ marginBottom: 72 }}>
            <p style={{ fontFamily: serif, fontWeight: 700, color: BURNT, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>
              {s.num} — {s.label}
            </p>
            {s.paras.map((para, j) => (
              <p key={j} style={{ fontFamily: newsreader, fontSize: 20, color: 'rgba(29,28,19,0.85)', lineHeight: 1.9, marginBottom: 24 }}>
                {para}
              </p>
            ))}
          </div>
        ))}

        {/* Pull quote */}
        <div style={{ borderLeft: `4px solid ${BURNT}`, paddingLeft: 32, margin: '48px 0', maxWidth: 640 }}>
          <p style={{ fontFamily: newsreader, fontStyle: 'italic', color: DARK, fontSize: 24, lineHeight: 1.7 }}>
            {c.pullQuote}
          </p>
        </div>

        {/* Closing */}
        <div style={{ marginTop: 80, paddingTop: 64, borderTop: '1px solid rgba(29,28,19,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>ॐ</div>
          <h2 style={{ fontFamily: serif, fontWeight: 700, color: DARK, fontSize: 'clamp(28px,4vw,38px)', lineHeight: 1.3, marginBottom: 16 }}>
            {c.closing.line1}<br />
            <span style={{ color: BURNT }}>{c.closing.line2}</span>
          </h2>
          <p style={{ fontFamily: newsreader, fontSize: 20, color: 'rgba(29,28,19,0.7)', lineHeight: 1.7, marginBottom: 40 }}>
            {c.closing.sub}
          </p>
          <Link to="/#contact"
            style={{ fontFamily: serif, fontWeight: 700, fontSize: 18, background: BURNT, color: '#fff', textDecoration: 'none', borderRadius: 24, padding: '18px 48px', boxShadow: '0 25px 50px -12px rgba(223,142,64,0.5)', display: 'inline-block' }}>
            {c.closing.cta}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#fff9eb', borderTop: '1px solid rgba(29,28,19,0.1)', padding: '48px 32px', marginTop: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <span style={{ fontFamily: serif, fontWeight: 700, color: BURNT, fontSize: 20 }}>🛕 Varadanam</span>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service', 'Contact Us'].map(l => (
              <a key={l} href="#" style={{ fontFamily: newsreader, fontStyle: 'italic', color: 'rgba(29,28,19,0.7)', fontSize: 15, textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
          <p style={{ fontFamily: newsreader, fontStyle: 'italic', color: '#805600', fontSize: 14 }}>
            © 2026 Varadanam. Rooted in Tradition, Guided by Grace.
          </p>
        </div>
      </footer>
    </div>
  );
}
