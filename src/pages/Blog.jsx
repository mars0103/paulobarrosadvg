import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { blogPosts } from '../data/content'

const categories = ['Todos', 'Governança', 'Reestruturação', 'Patrimônio']

export default function Blog() {
  const rootRef = useRef()
  const [activeCategory, setActiveCategory] = useState('Todos')

  const filtered = activeCategory === 'Todos'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.page-enter', {
        opacity: 0, y: 36, stagger: 0.12,
        duration: 0.9, ease: 'power3.out', delay: 0.1,
      })

      ScrollTrigger.create({
        trigger: '.blog-grid-wrap',
        start: 'top 78%',
        onEnter: () => {
          gsap.from('.blog-post-card', {
            y: 40, opacity: 0, stagger: 0.1,
            duration: 0.8, ease: 'power2.out',
          })
        },
        once: true,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    gsap.from('.blog-post-card', {
      y: 20, opacity: 0, stagger: 0.08,
      duration: 0.6, ease: 'power2.out',
    })
  }, [activeCategory])

  return (
    <main ref={rootRef}>
      {/* BLOG CONTENT */}
      <section className="section on-dark" style={{ paddingTop: '140px' }}>
        {/* Filter */}
        <div style={{
          display: 'flex', gap: '6px', marginBottom: '48px',
          flexWrap: 'wrap',
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-cursor
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '9px',
                letterSpacing: '2.5px', textTransform: 'uppercase',
                padding: '10px 20px',
                border: `1px solid ${activeCategory === cat ? 'var(--gold)' : 'rgba(200,168,75,0.15)'}`,
                background: activeCategory === cat ? 'var(--gold)' : 'transparent',
                color: activeCategory === cat ? 'var(--black)' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="blog-grid-wrap" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'rgba(200,168,75,0.06)',
        }}>
          {filtered.map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="blog-post-card"
              data-cursor
              style={{
                background: 'var(--black)',
                border: '1px solid rgba(200,168,75,0.05)',
                overflow: 'hidden',
                display: 'block',
                transition: 'border-color 0.4s, transform 0.4s',
              }}
            >
              <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.8s var(--ease-out)',
                    filter: 'brightness(0.65) saturate(0.55)',
                  }}
                />
              </div>
              <div style={{ padding: '28px 28px 32px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  marginBottom: '14px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontSize: '8px',
                    letterSpacing: '2.5px', textTransform: 'uppercase',
                    color: 'var(--gold)',
                    border: '1px solid rgba(200,168,75,0.25)',
                    padding: '4px 10px',
                  }}>
                    {post.category}
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: 'rgba(255,255,255,0.18)', letterSpacing: '1px' }}>
                    {post.readTime}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontSize: 'clamp(18px,1.8vw,24px)',
                  fontWeight: 400, color: 'var(--white)', lineHeight: 1.35,
                  marginBottom: '12px',
                }}>
                  {post.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '12px',
                  color: 'rgba(255,255,255,0.3)', lineHeight: 1.8,
                  marginBottom: '20px',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: 'rgba(255,255,255,0.15)' }}>
                    {post.date}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontSize: '9px',
                    color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}>
                    Ler
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                      <path d="M1 4H13M13 4L10 1M13 4L10 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Notice */}
        <div style={{
          marginTop: '64px',
          textAlign: 'center',
          padding: '40px',
          border: '1px solid rgba(200,168,75,0.08)',
          background: 'rgba(200,168,75,0.02)',
        }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
            Em breve
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.25)', lineHeight: 1.8 }}>
            Novos artigos são publicados regularmente. Em breve, publicações direto do WordPress.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-glow"><div className="cta-glow-1" /><div className="cta-glow-2" /></div>
        <div className="cta-content">
          <p className="cta-small-title">Quer aprofundar?</p>
          <h2 className="heading-xl" style={{ color: 'var(--white)', marginBottom: '20px' }}>
            Fale com quem <span className="gold-italic">entende</span> o seu setor.
          </h2>
          <p className="cta-sub">
            A leitura é o primeiro passo. A consulta é o que transforma clareza em ação.
          </p>
          <Link to="/contato" className="btn btn-gold" data-cursor>
            Agendar consulta
          </Link>
        </div>
      </section>
    </main>
  )
}
