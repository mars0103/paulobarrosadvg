import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { areas } from '../data/content'

const cardVariants = ['black', 'beige', 'white']

const areaImages = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
]

export default function StickyAreasCards() {
  const outerRef = useRef()
  const wrapRef = useRef()

  useEffect(() => {
    const cards = gsap.utils.toArray('.sticky-area-card')
    if (!cards.length || !outerRef.current) return

    const total = cards.length
    const segSize = 1 / total
    const yOff = 4
    const scaleStep = 0.05

    cards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + i * yOff,
        scale: 1 - i * scaleStep,
      })
    })

    // Use outer (tall) container as trigger — no pin:true, no position:fixed
    const st = ScrollTrigger.create({
      trigger: outerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate(self) {
        const p = self.progress
        const active = Math.min(Math.floor(p / segSize), total - 1)
        const seg = (p - active * segSize) / segSize

        cards.forEach((card, i) => {
          if (i < active) {
            gsap.set(card, { yPercent: -250, rotationX: 35 })
          } else if (i === active) {
            const isLast = active === total - 1
            gsap.set(card, {
              yPercent: isLast ? -50 : gsap.utils.interpolate(-50, -200, seg),
              rotationX: isLast ? 0 : gsap.utils.interpolate(0, 35, seg),
              scale: 1,
            })
          } else {
            const b = i - active
            gsap.set(card, {
              yPercent: -50 + (b - seg) * yOff,
              rotationX: 0,
              scale: 1 - (b - seg) * scaleStep,
            })
          }
        })
      },
    })

    return () => st.kill()
  }, [])

  return (
    <>
      <div className="sticky-areas-header">
        <p className="sec-label on-light">02 — Áreas de Atuação</p>
        <div className="sticky-areas-header-row">
          <h2 className="heading-xl">
            Onde <em className="gold-italic">atuamos.</em>
          </h2>
          <Link to="/areas" className="btn btn-dark">
            <span>Ver todas</span>
          </Link>
        </div>
      </div>

      {/* Tall outer container drives scroll progress */}
      <div ref={outerRef} className="sticky-areas-outer">
        {/* CSS sticky keeps this in viewport during scroll */}
        <div ref={wrapRef} className="sticky-areas-wrap">
          {areas.map((area, i) => (
            <div key={area.id} className={`sticky-area-card sticky-area-card--${cardVariants[i % cardVariants.length]}`}>
              <div className="sticky-area-card__col">
                <p className="sticky-area-card__eyebrow">0{i + 1} — {area.title.split(' ')[0]}</p>
                <div>
                  <h2 className="sticky-area-card__title">
                    {area.title.split(' ').map((word, wi) => (
                      <span key={wi} className="sticky-area-card__title-word">{word}</span>
                    ))}
                  </h2>
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
      </div>
    </>
  )
}
