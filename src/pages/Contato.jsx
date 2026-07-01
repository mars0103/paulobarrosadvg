import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import DarkVeil from '../components/DarkVeil'

const areasList = [
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
  const handleSubmit = e => { e.preventDefault(); setSent(true) }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-hero-left > *', {
        opacity: 0, y: 32, stagger: 0.14,
        duration: 0.9, ease: 'power3.out', delay: 0.15,
      })
      gsap.from('.contact-hero-right', {
        opacity: 0, y: 24,
        duration: 0.9, ease: 'power3.out', delay: 0.35,
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={rootRef}>
      {/* ─── HERO ─── */}
      <section className="contact-hero">
        {/* Background */}
        <div className="contact-hero-bg">
          <DarkVeil
            hueShift={218}
            noiseIntensity={0.02}
            scanlineIntensity={0}
            speed={0.8}
            scanlineFrequency={0}
            warpAmount={0.12}
          />
          <div className="contact-hero-photo">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
              alt=""
              aria-hidden
            />
          </div>
          <div className="contact-hero-overlay" />
        </div>

        {/* Content: left text + right form */}
        <div className="contact-hero-inner">
          {/* Left */}
          <div className="contact-hero-left">
            <h1 className="heading-display">
              Vamos <em className="gold-italic">conversar.</em>
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '14px',
              color: 'rgba(255,255,255,0.38)', lineHeight: 1.9,
              maxWidth: '380px', marginTop: '24px',
            }}>
              Sem compromisso, com a discrição que o momento exige.
              Retornaremos em até 24 horas.
            </p>

            <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { label: 'E-mail', value: 'contato@paulobarrosadv.com.br' },
                { label: 'WhatsApp', value: '(62) 9 9999-9999' },
                { label: 'Localização', value: 'Goiânia, GO — Brasil' },
              ].map(item => (
                <div key={item.label}>
                  <p style={{
                    fontFamily: 'var(--font-sans)', fontSize: '9px',
                    letterSpacing: '2.5px', textTransform: 'uppercase',
                    color: 'rgba(200,168,75,0.55)', marginBottom: '4px',
                  }}>{item.label}</p>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '13px',
                    color: 'rgba(255,255,255,0.55)',
                  }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '48px',
              borderTop: '1px solid rgba(200,168,75,0.12)',
              paddingTop: '24px',
              maxWidth: '320px',
            }}>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: '9px',
                letterSpacing: '2px', textTransform: 'uppercase',
                color: 'var(--gold)', marginBottom: '8px',
              }}>Discrição garantida</p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '12px',
                color: 'rgba(255,255,255,0.28)', lineHeight: 1.9,
              }}>
                Todas as informações são tratadas com absoluto sigilo,
                em conformidade com o Código de Ética da OAB.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-hero-right">
            {sent ? (
              <div style={{
                textAlign: 'center', padding: '60px 40px',
                background: 'rgba(8,8,8,0.7)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(200,168,75,0.15)',
              }}>
                <div style={{ fontSize: '40px', color: 'var(--gold)', marginBottom: '16px', fontFamily: 'serif' }}>♞</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--white)', marginBottom: '12px' }}>
                  Mensagem enviada.
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}>
                  Retornaremos em até 24 horas com a discrição que o seu momento exige.
                </p>
                <button onClick={() => setSent(false)} className="btn btn-ghost" style={{ marginTop: '28px' }}>
                  <span>Enviar outra mensagem</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form contact-form--hero">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Nome completo</label>
                    <input type="text" name="nome" required className="form-input" placeholder="Seu nome" value={form.nome} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Empresa</label>
                    <input type="text" name="empresa" className="form-input" placeholder="Sua empresa" value={form.empresa} onChange={handleChange} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">E-mail</label>
                    <input type="email" name="email" required className="form-input" placeholder="seu@email.com" value={form.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Telefone / WhatsApp</label>
                    <input type="tel" name="telefone" className="form-input" placeholder="(62) 9 9999-9999" value={form.telefone} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Área de interesse</label>
                  <select name="area" className="form-input" value={form.area} onChange={handleChange} style={{ appearance: 'none', WebkitAppearance: 'none' }}>
                    <option value="" disabled>Selecione uma área</option>
                    {areasList.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Mensagem</label>
                  <textarea name="mensagem" required className="form-textarea" placeholder="Descreva brevemente sua situação..." value={form.mensagem} onChange={handleChange} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '1px', color: 'rgba(255,255,255,0.16)', lineHeight: 1.7, maxWidth: '200px' }}>
                    Seus dados são tratados com absoluto sigilo profissional.
                  </p>
                  <button type="submit" className="btn btn-gold">
                    Enviar mensagem
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
