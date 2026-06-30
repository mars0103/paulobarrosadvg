import { useEffect, useRef } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { blogPosts } from '../data/content'

export default function BlogPost() {
  const { slug } = useParams()
  const rootRef = useRef()
  const post = blogPosts.find(p => p.slug === slug)

  useEffect(() => {
    if (!post) return
    const ctx = gsap.context(() => {
      gsap.from('.post-enter', {
        opacity: 0, y: 28, stagger: 0.1,
        duration: 0.9, ease: 'power3.out', delay: 0.1,
      })

      ScrollTrigger.create({
        trigger: '.post-body',
        start: 'top 80%',
        onEnter: () => {
          gsap.from('.post-body > *', {
            y: 24, opacity: 0, stagger: 0.08,
            duration: 0.7, ease: 'power2.out',
          })
        },
        once: true,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [post])

  if (!post) return <Navigate to="/blog" replace />

  const related = blogPosts.filter(p => p.id !== post.id).slice(0, 2)

  return (
    <main ref={rootRef}>
      {/* HERO */}
      <div className="post-hero">
        <img src={post.image} alt={post.title} />
        <div className="post-hero-overlay" />
        <div className="post-hero-content">
          <div className="post-enter" style={{ marginBottom: '16px' }}>
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: '8px',
              letterSpacing: '2.5px', textTransform: 'uppercase',
              color: 'var(--gold)', border: '1px solid rgba(200,168,75,0.3)',
              padding: '5px 12px',
            }}>
              {post.category}
            </span>
          </div>
          <h1 className="heading-xl post-enter" style={{ maxWidth: '680px', marginBottom: '16px' }}>
            {post.title}
          </h1>
          <div className="post-enter" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '1px', color: 'rgba(255,255,255,0.3)' }}>
              {post.date}
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '1px', color: 'rgba(255,255,255,0.2)' }}>
              {post.readTime} de leitura
            </span>
          </div>
        </div>
      </div>

      {/* BACK */}
      <div className="post-back on-dark">
        <Link to="/blog" className="btn-arrow" data-cursor style={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px', letterSpacing: '2px' }}>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" style={{ transform: 'rotate(180deg)' }}>
            <path d="M1 4H13M13 4L10 1M13 4L10 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span>Todos os artigos</span>
        </Link>
      </div>

      {/* CONTENT */}
      <div className="on-dark">
        <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="section on-dark" style={{ borderTop: '1px solid rgba(200,168,75,0.08)' }}>
          <p className="sec-label on-dark" style={{ marginBottom: '36px' }}>Leia também</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: 'rgba(200,168,75,0.06)',
          }}>
            {related.map(rp => (
              <Link
                key={rp.id}
                to={`/blog/${rp.slug}`}
                data-cursor
                style={{
                  background: 'var(--black)',
                  border: '1px solid rgba(200,168,75,0.05)',
                  overflow: 'hidden',
                  display: 'flex',
                  gap: '28px',
                  padding: '28px',
                  transition: 'border-color 0.4s',
                  alignItems: 'center',
                }}
              >
                <div style={{ width: '120px', flexShrink: 0, aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img
                    src={rp.image} alt={rp.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6) saturate(0.5)' }}
                  />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {rp.category}
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 400, color: 'var(--white)', lineHeight: 1.35, marginBottom: '8px' }}>
                    {rp.title}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: 'rgba(255,255,255,0.2)' }}>
                    {rp.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-glow"><div className="cta-glow-1" /><div className="cta-glow-2" /></div>
        <div className="cta-content">
          <p className="cta-small-title">Próximo passo</p>
          <h2 className="heading-xl" style={{ color: 'var(--white)', marginBottom: '20px' }}>
            Precisa de <span className="gold-italic">clareza</span> para decidir?
          </h2>
          <p className="cta-sub">
            Entre em contato. Sem compromisso, com a discrição que o momento exige.
          </p>
          <Link to="/contato" className="btn btn-gold" data-cursor>
            Falar com o escritório
          </Link>
        </div>
      </section>
    </main>
  )
}
