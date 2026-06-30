import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Marquee from '../components/Marquee'

const areas = [
  'Reestruturação Empresarial',
  'Conflitos Societários',
  'Governança Corporativa',
  'Proteção Patrimonial',
  'Contratos Empresariais',
  'Consultoria Estratégica',
  'Outro',
]

export default function Contato() {
  const rootRef = useRef()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    nome: '', empresa: '', email: '', telefone: '', area: '', mensagem: '',
  })

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.page-enter', {
        opacity: 0, y: 36, stagger: 0.12,
        duration: 0.9, ease: 'power3.out', delay: 0.1,
      })

      ScrollTrigger.create({
        trigger: '.contact-section',
        start: 'top 75%',
        onEnter: () => {
          gsap.from('.contact-section .anim-up', {
            y: 28, opacity: 0, stagger: 0.1,
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
      {/* BANNER */}
      <div className="page-banner on-dark">
        <div className="page-banner-bg">
          <div className="page-banner-glow" />
        </div>
        <div className="page-banner-content">
          <p className="sec-label on-dark page-enter">05 — Contato</p>
          <h1 className="heading-display page-enter">
            Vamos <span className="gold-italic">conversar.</span>
          </h1>
          <p className="page-enter" style={{
            fontFamily: 'var(--font-body)', fontSize: '14px',
            color: 'rgba(255,255,255,0.35)', lineHeight: 1.9,
            maxWidth: '440px', marginTop: '20px',
          }}>
            Sem compromisso, com a discrição que o momento exige. Preencha o formulário
            e retornaremos em até 24 horas.
          </p>
          <div className="gold-line page-enter" style={{ marginTop: '28px' }} />
        </div>
      </div>

      <Marquee />

      {/* CONTACT */}
      <section className="section on-dark contact-section">
        <div className="contact-grid">
          {/* Info */}
          <div>
            <p className="sec-label on-dark anim-up" style={{ marginBottom: '36px' }}>Informações</p>

            <div className="contact-info-item anim-up">
              <p className="contact-info-label">Localização</p>
              <p className="contact-info-value">
                Goiânia, GO — Brasil<br />
                Atendimento presencial e remoto
              </p>
            </div>

            <div className="contact-info-item anim-up">
              <p className="contact-info-label">E-mail</p>
              <p className="contact-info-value">contato@paulobarrosadv.com.br</p>
            </div>

            <div className="contact-info-item anim-up">
              <p className="contact-info-label">Telefone / WhatsApp</p>
              <p className="contact-info-value">(62) 9 9999-9999</p>
            </div>

            <div className="contact-info-item anim-up">
              <p className="contact-info-label">Horário de atendimento</p>
              <p className="contact-info-value">Segunda a sexta, das 9h às 18h</p>
            </div>

            <div className="anim-up" style={{ marginTop: '48px' }}>
              <div style={{
                background: 'rgba(200,168,75,0.04)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(200,168,75,0.1)',
                padding: '32px',
              }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
                  Discrição garantida
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.9, color: 'rgba(255,255,255,0.35)' }}>
                  Todas as informações compartilhadas são tratadas com absoluto sigilo
                  profissional, em conformidade com o Código de Ética da OAB.
                </p>
              </div>
            </div>

            {/* Social / Chess piece decoration */}
            <div style={{ marginTop: '52px', position: 'relative' }}>
              <span style={{
                position: 'absolute', right: 0, bottom: 0,
                fontSize: '120px', color: 'rgba(200,168,75,0.04)',
                fontFamily: 'serif', lineHeight: 1,
                userSelect: 'none',
              }}>♛</span>
            </div>
          </div>

          {/* Form */}
          <div className="anim-up">
            {sent ? (
              <div style={{
                textAlign: 'center', padding: '80px 40px',
                border: '1px solid rgba(200,168,75,0.15)',
                background: 'rgba(200,168,75,0.03)',
              }}>
                <div style={{ fontSize: '48px', color: 'var(--gold)', marginBottom: '20px', fontFamily: 'serif' }}>♞</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--white)', marginBottom: '14px' }}>
                  Mensagem enviada.
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}>
                  Retornaremos em até 24 horas com a discrição que o seu momento exige.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn btn-ghost"
                  style={{ marginTop: '32px' }}
                  data-cursor
                >
                  <span>Enviar outra mensagem</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Nome completo</label>
                    <input
                      type="text" name="nome" required
                      className="form-input" placeholder="Seu nome"
                      value={form.nome} onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Empresa</label>
                    <input
                      type="text" name="empresa"
                      className="form-input" placeholder="Sua empresa"
                      value={form.empresa} onChange={handleChange}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">E-mail</label>
                    <input
                      type="email" name="email" required
                      className="form-input" placeholder="seu@email.com"
                      value={form.email} onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Telefone / WhatsApp</label>
                    <input
                      type="tel" name="telefone"
                      className="form-input" placeholder="(62) 9 9999-9999"
                      value={form.telefone} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Área de interesse</label>
                  <select
                    name="area"
                    className="form-input"
                    value={form.area} onChange={handleChange}
                    style={{ appearance: 'none', WebkitAppearance: 'none' }}
                  >
                    <option value="" disabled>Selecione uma área</option>
                    {areas.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Mensagem</label>
                  <textarea
                    name="mensagem" required
                    className="form-textarea"
                    placeholder="Descreva brevemente sua situação..."
                    value={form.mensagem} onChange={handleChange}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '1px', color: 'rgba(255,255,255,0.18)', lineHeight: 1.7, maxWidth: '240px' }}>
                    Seus dados são tratados com absoluto sigilo profissional.
                  </p>
                  <button type="submit" className="btn btn-gold" data-cursor>
                    Enviar mensagem
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* MAP / LOCATION */}
      <section className="section on-dark" style={{ paddingTop: '0', paddingBottom: '80px' }}>
        <div style={{
          height: '320px',
          background: 'rgba(200,168,75,0.03)',
          border: '1px solid rgba(200,168,75,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '12px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(200,168,75,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
          <span style={{ fontSize: '48px', color: 'rgba(200,168,75,0.25)', fontFamily: 'serif' }}>♜</span>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
            Goiânia — Goiás, Brasil
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.15)' }}>
            Atendimento presencial e remoto
          </p>
        </div>
      </section>
    </main>
  )
}
