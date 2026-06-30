export default function LogoMarquee() {
  const items = Array.from({ length: 8 })
  return (
    <div className="logo-marquee-strip">
      <div className="logo-marquee-track">
        {[...items, ...items].map((_, i) => (
          <img key={i} src="/logo/logodafaixasvg.svg" className="logo-marquee-img" alt="" aria-hidden />
        ))}
      </div>
    </div>
  )
}
