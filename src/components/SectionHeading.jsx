import { LeafDivider } from './Ornament.jsx'

export default function SectionHeading({ eyebrow, title, tone = 'light' }) {
  const isDark = tone === 'dark'
  return (
    <div className="mb-8 text-center">
      {eyebrow && (
        <p
          className={`text-xs italic tracking-widest2 ${
            isDark ? 'text-champagne/80' : 'text-champagne-dark'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2 font-display text-3xl ${
          isDark ? 'text-sand' : 'text-bottle'
        }`}
      >
        {title}
      </h2>
      <LeafDivider tone={isDark ? 'sand' : 'champagne'} className="mx-auto mt-4" />
    </div>
  )
}
