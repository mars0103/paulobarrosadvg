import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Marquee from '../components/Marquee'
import { areas, blogPosts, stats } from '../data/content'

export default function Home() {
  const heroRef = useRef()
  const wordsRef = useRef([])
  const lineRef = useRef()
  const subRef = useRef()
  const ctaRef = useRef()
  const tagRef = useRef()
  const scrollIndRef = useRef()
  const badgeRef = useRef()
  const stickyAreasRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.to(tagRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .to(wordsRef.current, { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out' }, '-=0.2')
        .to(lineRef.current, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.3')
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to([scrollIndRef.current, badgeRef.current], { opacity: 1, duration: 0.8 }, '-=0.1')

      // Statement section
      ScrollTrigger.create({
        trigger: '.home-statement',
        start: 'top 75%',
        onEnter: () => {
          gsap.from('.home-statement .anim-st', {
            y: 40, opacity: 0, stagger: 0.18, duration: 1, ease: 'power3.out',
          })
        },
        once: true,
      })

      // Stats
      ScrollTrigger.create({
        trigger: '.home-stats-banner',
        start: 'top 80%',
        onEnter: () => {
          gsap.from('.home-stats-banner .stats-banner-item', {
            y: 24, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          })
          document.querySelectorAll('.stat-counter').forEach(el => {
            const target = parseInt(el.dataset.target)
            if (isNaN(target)) return
            gsap.to({ val: 0 }, {
              val: target, duration: 2.2, ease: 'power2.out',
              onUpdate() { el.textContent = Math.round(this.targets()[0].val) },
            })
          })
        },
        once: true,
      })

      // Sticky areas header
      ScrollTrigger.create({
        trigger: '.sticky-areas-header',
        start: 'top 78%',
        onEnter: () => {
          gsap.from('.sticky-areas-header .anim-up', {
            y: 24, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
          })
        },
        once: true,
      })

      // Sticky cards scroll
      const stickyCards = gsap.utils.toArray('.sticky-area-card')
      const totalCards = stickyCards.length
      const segSize = 1 / totalCards
      const cardYOffset = 4
      const cardScaleStep = 0.05

      stickyCards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50 + i * cardYOffset,
          scale: 1 - i * cardScaleStep,
        })
      })

      ScrollTrigger.create({
        trigger: stickyAreasRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 12}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const activeIndex = Math.min(Math.floor(progress / segSize), totalCards - 1)
          const segProgress = (progress - activeIndex * segSize) / segSize

          stickyCards.forEach((card, i) => {
            if (i < activeIndex) {
              gsap.set(card, { yPercent: -250, rotationX: 35 })
            } else if (i === activeIndex) {
              gsap.set(card, {
                yPercent: gsap.utils.interpolate(-50, -200, segProgress),
                rotationX: gsap.utils.interpolate(0, 35, segProgress),
                scale: 1,
              })
            } else {
              const behind = i - activeIndex
              gsap.set(card, {
                yPercent: -50 + (behind - segProgress) * cardYOffset,
                rotationX: 0,
                scale: 1 - (behind - segProgress) * cardScaleStep,
              })
            }
          })
        },
      })

      // Founder section
      ScrollTrigger.create({
        trigger: '.founder-split',
        start: 'top 75%',
        onEnter: () => {
          const photo = document.querySelector('.founder-photo')
          if (photo) photo.classList.add('revealed')
          gsap.from('.founder-split .anim-up', {
            y: 30, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power2.out',
          })
        },
        once: true,
      })

      // Blog
      ScrollTrigger.create({
        trigger: '.home-blog',
        start: 'top 78%',
        onEnter: () => {
          gsap.from('.home-blog .anim-up', {
            y: 28, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          })
          gsap.from('.blog-featured, .blog-secondary', {
            y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out', delay: 0.15,
          })
        },
        once: true,
      })

      // CTA
      ScrollTrigger.create({
        trigger: '.home-cta',
        start: 'top 80%',
        onEnter: () => {
          gsap.from('.home-cta .anim-up', {
            y: 28, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power2.out',
          })
        },
        once: true,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const areaImages = [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  ]

  const heroWords = ['Advocacia', 'que', 'move', 'o', 'negócio.']
  const heroHighlight = [false, false, true, false, false]

  return (
    <main ref={heroRef}>
      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
            alt=""
            aria-hidden
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-overlay-left" />

        <div className="hero-content">
          <div ref={tagRef} className="hero-tag" style={{ opacity: 0 }}>
            Goiânia, GO — Direito Empresarial
          </div>
          <h1 className="hero-title">
            {heroWords.map((word, i) => (
              <span
                key={i}
                ref={el => wordsRef.current[i] = el}
                className={`hero-word ${heroHighlight[i] ? 'gold-italic' : ''}`}
              >
                {word}
              </span>
            ))}
          </h1>
          <div ref={lineRef} className="hero-line" />
          <p ref={subRef} className="hero-sub" style={{ opacity: 0, transform: 'translateY(16px)' }}>
            Assessoria jurídica empresarial estratégica para quem toma decisões
            em cenários de complexidade.
          </p>
          <div ref={ctaRef} className="hero-cta-wrap" style={{ opacity: 0, transform: 'translateY(16px)' }}>
            <Link to="/escritorio" className="btn btn-ghost">
              <span>Conheça o escritório</span>
            </Link>
            <Link to="/contato" className="btn-arrow">
              <span>Falar conosco</span>
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>
        </div>

        <div ref={scrollIndRef} className="hero-scroll" style={{ opacity: 0 }}>Scroll</div>
        <div ref={badgeRef} className="hero-badge" style={{ opacity: 0 }}>OAB/GO · Desde 2010</div>
        <span className="float-chess" style={{ '--size': '80px', '--opacity': '0.03', '--dur': '9s', top: '18%', right: '8%' }}>♚</span>
        <span className="float-chess" style={{ '--size': '56px', '--opacity': '0.025', '--dur': '7s', '--delay': '-3s', bottom: '22%', right: '24%' }}>♛</span>
      </section>

      {/* ─── MARQUEE ─── */}
      <Marquee />

      {/* ─── STATEMENT / MANIFESTO ─── */}
      <section className="statement-section home-statement">
        <div className="statement-deco">15</div>
        <p className="sec-label on-dark anim-st" style={{ marginBottom: '40px' }}>01 — O Escritório</p>
        <p className="statement-big anim-st">
          Não assessoramos causas.<br />
          Construímos soluções para quem<br />
          <em>constrói empresas.</em>
        </p>
        <div className="statement-meta anim-st">
          {stats.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
              {i > 0 && <div className="statement-divider" />}
              <div className="statement-stat">
                <span className="statement-stat-val">
                  {s.text ? s.text : (
                    <>
                      <span className="stat-counter" data-target={s.value}>0</span>
                      {s.suffix}
                    </>
                  )}
                </span>
                <span className="statement-stat-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '52px' }} className="anim-st">
          <Link to="/escritorio" className="btn btn-ghost">
            <span>Saiba mais</span>
          </Link>
        </div>
      </section>

      {/* ─── AREAS — sticky cards scroll ─── */}
      <div className="sticky-areas-header">
        <p className="sec-label on-light anim-up">02 — Áreas de Atuação</p>
        <div className="sticky-areas-header-row">
          <h2 className="heading-xl anim-up">
            Onde <em className="gold-italic">atuamos.</em>
          </h2>
          <Link to="/areas" className="btn btn-dark anim-up">
            <span>Ver todas</span>
          </Link>
        </div>
      </div>

      <div ref={stickyAreasRef} className="sticky-areas-wrap">
        {areas.map((area, i) => (
          <div key={area.id} className="sticky-area-card">
            <div className="sticky-area-card__col">
              <p className="sticky-area-card__eyebrow">0{i + 1} — {area.title.split(' ')[0]}</p>
              <div>
                <h2 className="sticky-area-card__title">{area.title}</h2>
                <p className="sticky-area-card__desc">{area.short}</p>
              </div>
              <Link to="/areas" className="sticky-area-card__link">
                Saiba mais
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                  <path d="M1 4H13M13 4L10 1M13 4L10 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </Link>
            </div>
            <div className="sticky-area-card__img-col">
              <img src={areaImages[i]} alt={area.title} loading="lazy" />
            </div>
          </div>
        ))}
      </div>

      {/* ─── STATS BANNER ─── */}
      <div className="stats-banner home-stats-banner">
        {stats.map((s, i) => (
          <div key={i} className="stats-banner-item">
            <span className="stats-banner-val">
              {s.text ? s.text : (
                <>
                  <span className="stat-counter" data-target={s.value}>0</span>
                  {s.suffix}
                </>
              )}
            </span>
            <span className="stats-banner-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ─── FUNDADOR — full bleed dark split ─── */}
      <div className="founder-split">
        <div className="founder-panel">
          <p className="sec-label on-dark anim-up" style={{ marginBottom: '32px' }}>03 — Fundador</p>
          <h2 className="founder-name anim-up">Paulo<br />Barros</h2>
          <p className="founder-role anim-up">Advogado Empresarial · OAB/GO XXXXX</p>
          <p className="founder-bio anim-up">
            Advogado com atuação exclusiva em direito empresarial. Combina rigor técnico
            com visão pragmática orientada à realidade do empresário. Mais de quinze anos
            de atuação em operações complexas de reestruturação, conflitos societários e
            proteção patrimonial.
          </p>
          <div className="founder-creds anim-up">
            <div className="founder-cred"><div className="founder-cred-dot" /><span>Bacharel em Direito</span></div>
            <div className="founder-cred"><div className="founder-cred-dot" /><span>Pós-graduação em Direito Empresarial</span></div>
            <div className="founder-cred"><div className="founder-cred-dot" /><span>Comissão de Direito Empresarial — OAB/GO</span></div>
          </div>
          <Link to="/escritorio" className="btn btn-ghost anim-up">
            <span>Conheça a trajetória</span>
          </Link>
        </div>
        <div className="founder-photo img-wrap">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80"
            alt="Paulo Barros, Advogado"
          />
          <div className="founder-photo-overlay" />
        </div>
      </div>

      {/* ─── BLOG — editorial layout ─── */}
      <section className="section on-light home-blog">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p className="sec-label on-light anim-up">04 — Blog</p>
            <h2 className="heading-xl anim-up">
              Pensamento <em className="gold-italic">estratégico</em> aplicado.
            </h2>
          </div>
          <Link to="/blog" className="btn btn-dark anim-up" style={{ flexShrink: 0 }}>
            <span>Ver todos</span>
          </Link>
        </div>

        {/* Featured post */}
        <Link to={`/blog/${blogPosts[0].slug}`} className="blog-featured">
          <div className="blog-featured-img">
            <img src={blogPosts[0].image} alt={blogPosts[0].title} loading="lazy" />
          </div>
          <div className="blog-featured-body">
            <p className="blog-card-cat" style={{ marginBottom: '14px' }}>{blogPosts[0].category}</p>
            <h3 className="blog-featured-title">{blogPosts[0].title}</h3>
            <p className="blog-featured-excerpt">{blogPosts[0].excerpt}</p>
            <span className="blog-featured-cta">
              Ler artigo
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M1 4H13M13 4L10 1M13 4L10 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
        </Link>

        {/* Secondary posts */}
        <div className="blog-secondary-grid">
          {blogPosts.slice(1).map(post => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="blog-secondary">
              <div className="blog-secondary-img">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
              <div className="blog-secondary-body">
                <p className="blog-card-cat" style={{ marginBottom: '8px' }}>{post.category}</p>
                <h3 className="blog-secondary-title">{post.title}</h3>
                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <span className="blog-card-date">{post.date}</span>
                  <span className="blog-card-read">{post.readTime} de leitura</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-section home-cta">
        <div className="cta-glow">
          <div className="cta-glow-1" />
          <div className="cta-glow-2" />
        </div>
        <div className="cta-content">
          <p className="cta-small-title anim-up">Entre em contato</p>
          <h2 className="heading-xl anim-up" style={{ color: 'var(--white)', marginBottom: '20px' }}>
            Precisa de <em className="gold-italic">clareza</em> para decidir?
          </h2>
          <p className="cta-sub anim-up">
            Entre em contato. Sem compromisso, com a discrição que o momento exige.
          </p>
          <div className="anim-up">
            <Link to="/contato" className="btn btn-gold">
              Falar com o escritório
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
