import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Threads from '../components/Threads'
import { areas } from '../data/content'

const chessImages = [
  '/xadrez/torre.png',
  '/xadrez/cavalo.png',
  '/xadrez/rainha.png',
  '/xadrez/rei.png',
  '/xadrez/peão.png',
  '/xadrez/bispo.png',
]

export default function Areas() {
  const rootRef = useRef()

  useEffect(() => {
    document.body.setAttribute('data-light-nav', '1')
    return () => document.body.removeAttribute('data-light-nav')
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.page-enter', {
        opacity: 0, y: 36, stagger: 0.12,
        duration: 0.9, ease: 'power3.out', delay: 0.1,
      })

      ScrollTrigger.create({
        trigger: '.areas-full-grid',
        start: 'top 78%',
        onEnter: () => {
          gsap.from('.area-full-card', {
            y: 40, opacity: 0, stagger: 0.08,
            duration: 0.8, ease: 'power2.out',
          })
        },
        once: true,
      })

    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={rootRef}>
      {/* HERO */}
      <section className="areas-hero">
        <div className="areas-hero-threads">
          <Threads color={[0, 0, 0]} amplitude={1} distance={0} enableMouseInteraction />
        </div>

        <div className="areas-hero-inner">
          <div className="areas-hero-left">
            <h1 className="heading-display page-enter" style={{ color: 'var(--black)' }}>
              Advocacia com{' '}
              <em className="gold-italic">foco cirúrgico.</em>
            </h1>
            <p className="page-enter" style={{
              fontFamily: 'var(--font-body)', fontSize: '15px',
              color: 'rgba(8,8,8,0.55)', lineHeight: 1.9,
              maxWidth: '440px', marginTop: '24px',
            }}>
              A especialização não é uma limitação — é um diferencial. Ao concentrar
              nossa atuação em direito empresarial, desenvolvemos profundidade técnica
              e visão de negócio que advogados generalistas não conseguem oferecer.
            </p>
          </div>

          <div className="areas-hero-pieces">
            <img src="/xadrez/cavalo.png" className="areas-hero-piece-main" alt="" aria-hidden />
            <img src="/xadrez/torre.png" className="areas-hero-piece-back" alt="" aria-hidden />
          </div>
        </div>

        <div className="areas-hero-watermark" aria-hidden>
          <img src="/logo/logodafaixasvg.svg" alt="" />
        </div>
      </section>

      {/* AREAS FULL GRID */}
      <section className="section on-dark" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
        <div className="areas-full-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1px',
          background: 'rgba(200,168,75,0.07)',
        }}>
          {areas.map((area, i) => (
            <div
              key={area.id}
              className="area-full-card"
              data-cursor
              style={{
                background: 'var(--black)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'stretch',
                minHeight: '380px',
              }}
            >

              {/* Content */}
              <div style={{
                flex: '1 1 55%', padding: '44px 40px',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', position: 'relative', zIndex: 1,
              }}>
                <div>
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '10px',
                    letterSpacing: '3px', textTransform: 'uppercase',
                    color: 'rgba(200,168,75,0.5)', display: 'block', marginBottom: '28px',
                  }}>
                    0{i + 1}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px,1.8vw,26px)',
                    fontWeight: 400, lineHeight: 1.25, marginBottom: '16px',
                  }}>
                    <em style={{ color: 'var(--gold)', fontStyle: 'italic', display: 'block' }}>
                      {area.title.split(' ').slice(0, 1).join(' ')}
                    </em>
                    <span style={{ color: 'var(--white)' }}>
                      {area.title.split(' ').slice(1).join(' ')}
                    </span>
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '13px',
                    lineHeight: 1.9, color: 'rgba(255,255,255,0.38)',
                    maxWidth: '260px',
                  }}>
                    {area.short}
                  </p>
                </div>
                <Link to="/contato" style={{
                  fontFamily: 'var(--font-body)', fontSize: '10px',
                  letterSpacing: '2.5px', textTransform: 'uppercase',
                  color: 'rgba(200,168,75,0.55)',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  marginTop: '28px',
                }}>
                  Consultar
                  <svg width="12" height="8" viewBox="0 0 14 8" fill="none">
                    <path d="M1 4H13M13 4L10 1M13 4L10 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </Link>
              </div>

              {/* Chess piece image */}
              <div style={{
                flex: '0 0 42%', position: 'relative',
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <img
                  src={chessImages[i]}
                  alt=""
                  aria-hidden
                  style={{
                    height: '112%', width: 'auto', objectFit: 'contain',
                    transform: 'translateY(6%)',
                    filter: 'drop-shadow(0 -16px 40px rgba(200,168,75,0.18))',
                    mixBlendMode: 'screen',
                    userSelect: 'none',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* APPROACH */}
      <section className="section on-dark scroll-section" style={{ paddingTop: '60px' }}>
        <div style={{
          background: 'rgba(200,168,75,0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(200,168,75,0.1)',
          padding: '60px 52px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '52px',
          alignItems: 'center',
        }}>
          <div>
            <h2 className="heading-lg" style={{ marginBottom: '20px' }}>
              Por que atuação <span className="gold-italic">especializada</span>?
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 2, color: 'rgba(255,255,255,0.4)' }}>
              A advocacia empresarial eficaz exige mais do que conhecimento jurídico.
              Exige compreensão do negócio, do setor, das dinâmicas de mercado e das
              consequências práticas de cada orientação.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              'Profundidade técnica em direito empresarial',
              'Visão orientada ao resultado do negócio',
              'Antecipação de riscos antes que se tornem crises',
              'Relação de longo prazo com os clientes',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)', fontSize: '20px', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>—</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-glow"><div className="cta-glow-1" /><div className="cta-glow-2" /></div>
        <div className="cta-content">
          <p className="cta-small-title">Próximo passo</p>
          <h2 className="heading-xl" style={{ color: 'var(--white)', marginBottom: '20px' }}>
            Identifique a área certa para o <span className="gold-italic">seu caso.</span>
          </h2>
          <p className="cta-sub">
            Agende uma consulta e avaliamos juntos a melhor estratégia para a sua situação.
          </p>
          <Link to="/contato" className="btn btn-gold" data-cursor>
            Agendar consulta
          </Link>
        </div>
      </section>
    </main>
  )
}
