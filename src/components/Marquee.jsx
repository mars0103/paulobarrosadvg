import { marqueeItems } from '../data/content'

export default function Marquee({ reverse = false, theme = 'dark' }) {
  const doubled = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
    <div className={`marquee-strip ${theme === 'light' ? 'on-light' : 'on-dark'}`}>
      <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            {item}
            <span className="marquee-dot" />
          </div>
        ))}
      </div>
    </div>
  )
}
