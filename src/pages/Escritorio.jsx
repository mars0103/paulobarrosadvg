import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Marquee from '../components/Marquee'
import { stats } from '../data/content'

export default function Escritorio() {
  const rootRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.page-enter', {
        opacity: 0, y: 36, stagger: 0.12,
        duration: 0.9, ease: 'power3.out', delay: 0.1,
      })

      // Proposta section
      ScrollTrigger.create({
        trigger: '.escritorio-proposta',
        start: 'top 75%',
        onEnter: () => {
          gsap.from('.escritorio-proposta .anim-up', {
            y: 36, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          })
        },
        once: true,
      })

      // Stats banner
      ScrollTrigger.create({
        trigger: '.escritorio-stats',
        start: 'top 80%',
        onEnter: () => {
          gsap.from('.escritorio-stats .stats-banner-item', {
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

      // Process list
      ScrollTrigger.create({
        trigger: '.escritorio-process',
        start: 'top 76%',
        onEnter: () => {
          gsap.from('.escritorio-process .anim-up', {
            y: 28, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
          })
          gsap.from('.process-row', {
            y: 20, opacity: 0, stagger: 0.07, duration: 0.7, ease: 'power2.out', delay: 0.2,
          })
        },
        once: true,
      })

      // CTA
      ScrollTrigger.create({
        trigger: '.escritorio-cta',
        start: 'top 80%',
        onEnter: () => {
          gsap.from('.escritorio-cta .anim-up', {
            y: 28, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power2.out',
          })
        },
        once: true,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const processo = [
    {
      num: '01',
      title: 'Diagnóstico Preciso',
      desc: 'Antes de qualquer orientação, compreendemos a fundo a estrutura, os objetivos e os riscos do negócio. O diagnóstico correto é a base de qualquer estratégia eficaz.',
      tag: 'Fundação',
    },
    {
      num: '02',
      title: 'Visão de Negócio',
      desc: 'O Direito está a serviço do negócio, não o contrário. Cada orientação considera o impacto econômico, operacional e estratégico para o cliente.',
      tag: 'Estratégia',
    },
    {
      num: '03',
      title: 'Discrição Absoluta',
      desc: 'A confiança é o fundamento da relação. Tratamos cada situação com o sigilo que o empresário precisa para tomar decisões sem expor seu momento interno.',
      tag: 'Ética',
    },
    {
      num: '04',
      title: 'Antecipação de Riscos',
      desc: 'O melhor litígio é o que não acontece. Atuamos preventivamente, identificando vulnerabilidades antes que se tornem crises que destroem valor.',
      tag: 'Prevenção',
    },
    {
      num: '05',
      title: 'Clareza na Comunicação',
      desc: 'Traduzimos o técnico em linguagem de negócio. O cliente precisa entender o cenário para decidir com segurança e velocidade.',
      tag: 'Eficiência',
    },
    {
      num: '06',
      title: 'Compromisso com Resultado',
      desc: 'Medimos nosso sucesso pelo resultado concreto para o cliente — não pelo volume de processos ou pela complexidade aparente da solução.',
      tag: 'Resultado',
    },
  ]

  return (
    <main ref={rootRef}>
      {/* ─── HERO ─── */}
      <section className="escritorio-hero on-dark">
        {/* Grid background */}
        <div className="escritorio-hero-grid" aria-hidden />

        {/* Text block */}
        <div className="escritorio-hero-text">
          <h1 className="heading-display page-enter">
            Advocacia como{' '}
            <em className="gold-italic">parceria</em>{' '}
            estratégica.
          </h1>
          <p className="page-enter" style={{
            fontFamily: 'var(--font-body)', fontSize: '15px',
            color: 'rgba(255,255,255,0.38)', lineHeight: 1.9,
            maxWidth: '560px', marginTop: '20px',
          }}>
            Não somos apenas assessores jurídicos. Somos parceiros de decisão
            para empresários que constroem em cenários de complexidade.
          </p>
        </div>

        {/* Video */}
        <div className="escritorio-hero-video">
          <video
            src="/heroescritorio.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* CTA */}
        <div className="escritorio-hero-cta page-enter">
          <Link to="/contato" className="btn btn-gold">
            Falar com o escritório
          </Link>
        </div>
      </section>

      <Marquee theme="light" />

      {/* ─── PROPOSTA — large asymmetric text ─── */}
      <section className="section on-dark escritorio-proposta" style={{ paddingBottom: '80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start',
        }}>
          <div>
            <p className="sec-label on-dark anim-up">A proposta</p>
            <h2 className="heading-xl anim-up" style={{ marginBottom: '0', lineHeight: 1.08 }}>
              Profundidade técnica.<br />
              <em className="gold-italic">Visão de negócio.</em>
            </h2>
          </div>
          <div style={{ paddingTop: '4px' }}>
            <p className="body-text on-dark anim-up" style={{ marginBottom: '20px' }}>
              Paulo Barros Advogados é um escritório de advocacia empresarial estratégica,
              posicionado como parceiro de decisão para empresários que enfrentam cenários
              de alta complexidade jurídica e econômica.
            </p>
            <p className="body-text on-dark anim-up" style={{ marginBottom: '20px' }}>
              Combinamos profundidade técnica com visão de negócio, entendendo que as decisões
              jurídicas têm impacto direto sobre a continuidade, o valor e o crescimento das
              empresas que assessoramos.
            </p>
            <p className="body-text on-dark anim-up">
              Não tratamos casos isolados. Construímos relações de longo prazo com empresários
              que valorizam um parceiro jurídico capaz de antecipar riscos e orientar movimentos
              estratégicos com segurança.
            </p>
          </div>
        </div>
      </section>

      {/* ─── STATS BANNER ─── */}
      <div className="stats-banner escritorio-stats">
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

      {/* ─── PROCESSO — numbered vertical list ─── */}
      <section className="section escritorio-process" style={{ paddingTop: '100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0' }}>
          <div>
            <p className="sec-label anim-up">Nossa abordagem</p>
            <h2 className="heading-xl anim-up">
              Como <em className="gold-italic">trabalhamos.</em>
            </h2>
          </div>
        </div>

        <div className="process-list">
          {processo.map(v => (
            <div key={v.num} className="process-row">
              <span className="process-num">{v.num}</span>
              <div>
                <p className="process-content-title">{v.title}</p>
                <p className="process-content-desc">{v.desc}</p>
              </div>
              <span className="process-tag">{v.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-section escritorio-cta">
        <div className="cta-glow">
          <div className="cta-glow-1" />
          <div className="cta-glow-2" />
        </div>
        <div className="cta-content">
          <p className="cta-small-title anim-up">Próximo passo</p>
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
