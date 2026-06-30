import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function SplashScreen({ onComplete }) {
  const rootRef = useRef()
  const logoRef = useRef()
  const barRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline()

    tl.from(logoRef.current, {
      scale: 0.88,
      opacity: 0,
      duration: 1.3,
      ease: 'power3.out',
    })
    .to(barRef.current, {
      scaleX: 1,
      opacity: 0.5,
      duration: 0.8,
      ease: 'power2.inOut',
    }, '-=0.5')
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.55,
      ease: 'power2.out',
    }, '-=0.3')
    .to(rootRef.current, {
      opacity: 0,
      duration: 0.9,
      delay: 0.7,
      ease: 'power2.inOut',
      onComplete,
    })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={rootRef} className="splash">
      <img
        ref={logoRef}
        src="/logo/logoreduzida.svg"
        alt="Paulo Barros Advogados"
        className="splash-logo-img"
      />
      <div ref={barRef} className="splash-bar" />
      <div ref={textRef} className="splash-text">
        Paulo Barros &nbsp;·&nbsp; Advogados
      </div>
    </div>
  )
}
