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

      const section = rootRef.current.querySelector('.areas-hscroll-section')
      const track = rootRef.current.querySelector('.areas-hscroll-track')
      const progressFill = rootRef.current.querySelector('.areas-hscroll-progress-fill')

      const getScrollDist = () => track.scrollWidth - section.offsetWidth

      const hScroll = gsap.to(track, {
        x: () => -getScrollDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDist()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressFill) {
              progressFill.style.width = `${self.progress * 100}%`
            }
          },
        },
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

      {/* AREAS HORIZONTAL SCROLL */}
      <section className="areas-hscroll-section on-dark">
        {/* Header row */}
        <div className="areas-hscroll-header">
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '10px',
            letterSpacing: '3px', textTransform: 'uppercase',
            color: 'rgba(200,168,75,0.5)',
          }}>
            Áreas de atuação
          </p>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '10px',
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <svg width="32" height="10" viewBox="0 0 32 10" fill="none">
              <path d="M1 5H31M31 5L27 1M31 5L27 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            scroll
          </span>
        </div>

        {/* Scrolling track */}
        <div className="areas-hscroll-track">
          {areas.map((area, i) => (
            <div key={area.id} className="area-full-card" data-cursor>
              {/* Content */}
              <div className="area-card-content">
                <div>
                  <span className="area-card-num">0{i + 1}</span>
                  <h3 className="area-card-title">
                    <em>{area.title.split(' ').slice(0, 1).join(' ')}</em>
                    <span>{area.title.split(' ').slice(1).join(' ')}</span>
                  </h3>
                  <p className="area-card-desc">{area.short}</p>
                </div>
                <Link to="/contato" className="area-card-link">
                  Consultar
                  <svg width="12" height="8" viewBox="0 0 14 8" fill="none">
                    <path d="M1 4H13M13 4L10 1M13 4L10 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </Link>
              </div>

              {/* Chess piece */}
              <div className="area-card-piece">
                <img
                  src={chessImages[i]}
                  alt=""
                  aria-hidden
                />
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="areas-hscroll-progress">
          <div className="areas-hscroll-progress-fill" />
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
