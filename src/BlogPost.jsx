import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost, posts } from './blogPosts.js';
import { useIsMobile } from './useIsMobile.js';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderContent(content) {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) { i++; continue; }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 400, color: '#faf6ef', margin: '48px 0 16px', lineHeight: 1.25 }}>
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 400, color: '#FFB31D', margin: '32px 0 12px', lineHeight: 1.3 }}>
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      const listItems = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        listItems.push(lines[i].trim().replace('- ', ''));
        i++;
      }
      elements.push(
        <ul key={i} style={{ margin: '16px 0', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {listItems.map((item, j) => (
            <li key={j} style={{ fontFamily: 'Lora, serif', fontSize: 16, color: 'rgba(250,246,239,0.72)', lineHeight: 1.7 }}>
              {item.includes('[') ? renderLinks(item) : item}
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 15, color: '#faf6ef', margin: '24px 0 8px' }}>
          {line.replace(/\*\*/g, '')}
        </p>
      );
    } else {
      elements.push(
        <p key={i} style={{ fontFamily: 'Lora, serif', fontSize: 16.5, color: 'rgba(250,246,239,0.72)', lineHeight: 1.85, margin: '0 0 20px' }}>
          {line.includes('[') ? renderLinks(line) : line}
        </p>
      );
    }
    i++;
  }
  return elements;
}

function renderLinks(text) {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      return <a key={i} href={match[2]} style={{ color: '#FF6906', textDecoration: 'underline' }}>{match[1]}</a>;
    }
    return part;
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!post) return;
    const title = `${post.title} | Varadanam`;
    const desc = post.excerpt;
    const canonical = `https://varadanam.com/blog/${slug}`;

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', desc);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);

    const existingScript = document.getElementById('blog-ld-json');
    if (existingScript) existingScript.remove();
    const script = document.createElement('script');
    script.id = 'blog-ld-json';
    script.type = 'application/ld+json';
    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: desc,
        url: canonical,
        datePublished: post.date,
        author: { '@type': 'Organization', name: post.author || 'Varadanam' },
        publisher: { '@type': 'Organization', name: 'Varadanam', url: 'https://varadanam.com' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://varadanam.com/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://varadanam.com/blog' },
          { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
        ],
      },
    ];

    if (slug === 'digitize-temple-seva-bookings-one-day') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: post.title,
        description: desc,
        url: canonical,
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'List Your Vazhipadu and Sevas',
            text: 'Make a complete list of every vazhipadu and seva your temple offers — name in Malayalam and English, price (dakshina), duration, available days, and maximum bookings per time slot.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Gather Devotee Booking Requirements',
            text: 'Set up your digital booking system to capture full name, nakshatram, gothram, rashi, and phone number — details the melshanti needs to prepare for the seva.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Set Up Online Payment',
            text: 'Enable UPI (GPay, PhonePe, Paytm), debit/credit cards, net banking, and international cards for NRI devotees through a payment gateway like Razorpay.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Go Live and Inform Devotees',
            text: 'Share the booking link via your temple WhatsApp group, notice board QR code, and Facebook page. Varadanam onboarding sets everything up and trains kazhakam staff on the same day.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Manage the Temple from Your Dashboard',
            text: "Use the admin dashboard for today's booking list, counter billing for walk-ins, WhatsApp receipts, daily collection reports, and festival slot management.",
          },
        ],
      });
    }

    script.textContent = JSON.stringify(schemas);
    document.head.appendChild(script);

    return () => {
      document.title = 'Varadanam — Temple Management Software | Online Vazhipadu & Seva Booking India';
      document.querySelector('meta[name="description"]')?.setAttribute('content', "Varadanam is India's temple management software.");
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://varadanam.com/');
      document.getElementById('blog-ld-json')?.remove();
    };
  }, [post, slug]);

  if (!post) {
    return (
      <div style={{ background: '#100b04', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, color: '#faf6ef', marginBottom: 16 }}>Post not found</div>
          <Link to="/blog" style={{ color: '#FF6906', fontFamily: 'DM Sans, sans-serif' }}>← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const otherPosts = posts.filter(p => p.slug !== slug).slice(0, 2);

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
          <Link to="/" style={{
            background: '#FF6906', color: '#fff', textDecoration: 'none',
            fontSize: 14, fontWeight: 500, padding: '9px 18px', borderRadius: 8,
          }}>Request a Demo</Link>
        </div>
      </nav>

      <div style={{ paddingTop: 72 }}>
        {/* Article header */}
        <div style={{ maxWidth: 760, margin: '0 auto', padding: isMobile ? '48px 20px 32px' : '72px 32px 48px' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(250,246,239,0.4)', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, marginBottom: 40 }}
            onMouseEnter={e => e.currentTarget.style.color = '#FF6906'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,246,239,0.4)'}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 7H2M7 2L2 7l5 5" />
            </svg>
            Back to Blog
          </Link>

          <div style={{ fontSize: 12, color: 'rgba(250,246,239,0.35)', fontFamily: 'DM Sans, sans-serif', marginBottom: 20, letterSpacing: '0.05em' }}>
            {formatDate(post.date)} · {post.author}
          </div>

          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: '#faf6ef', lineHeight: 1.2, marginBottom: 24 }}>
            {post.title}
          </h1>

          <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 18, color: 'rgba(250,246,239,0.55)', lineHeight: 1.7, borderLeft: '3px solid #FF6906', paddingLeft: 20 }}>
            {post.excerpt}
          </p>
        </div>

        {/* Divider */}
        <div style={{ maxWidth: 760, margin: '0 auto', padding: isMobile ? '0 20px' : '0 32px' }}>
          <div style={{ height: 1, background: 'linear-gradient(90deg, #FF6906, rgba(255,179,29,0.3), transparent)' }} />
        </div>

        {/* Article body */}
        <div style={{ maxWidth: 760, margin: '0 auto', padding: isMobile ? '32px 20px 60px' : '48px 32px 80px' }}>
          {renderContent(post.content)}
        </div>

        {/* CTA box */}
        <div style={{ maxWidth: 760, margin: '0 auto 60px', padding: isMobile ? '0 20px' : '0 32px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a1108 0%, #2a1a08 100%)',
            borderRadius: 14, padding: '40px 48px',
            border: '1px solid rgba(255,179,29,0.15)',
          }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#faf6ef', marginBottom: 12, fontWeight: 400 }}>
              Ready to modernise your temple?
            </h3>
            <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 15, color: 'rgba(250,246,239,0.55)', marginBottom: 24, lineHeight: 1.65 }}>
              Join 200+ temples across Kerala and India already using Varadanam. Setup takes less than a day.
            </p>
            <Link to="/" style={{
              display: 'inline-block', background: '#FF6906', color: '#fff', textDecoration: 'none',
              padding: '13px 30px', borderRadius: 8, fontSize: 14.5, fontWeight: 600,
              fontFamily: 'DM Sans, sans-serif',
            }}>Request a Free Demo</Link>
          </div>
        </div>

        {/* Related posts */}
        {otherPosts.length > 0 && (
          <div style={{ maxWidth: 760, margin: '0 auto', padding: isMobile ? '0 20px 60px' : '0 32px 80px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FF6906', fontFamily: 'DM Sans, sans-serif', marginBottom: 24 }}>More Articles</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {otherPosts.map(p => (
                <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'rgba(255,179,29,0.04)', border: '1px solid rgba(255,179,29,0.1)',
                    borderRadius: 10, padding: '24px', transition: 'border-color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,105,6,0.4)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,179,29,0.1)'}
                  >
                    <div style={{ fontSize: 11, color: 'rgba(250,246,239,0.3)', fontFamily: 'DM Sans, sans-serif', marginBottom: 10 }}>{formatDate(p.date)}</div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, color: '#faf6ef', lineHeight: 1.35, marginBottom: 12 }}>{p.title}</div>
                    <div style={{ color: '#FF6906', fontSize: 13, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>Read →</div>
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
