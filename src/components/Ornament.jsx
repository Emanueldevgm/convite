import { colors } from '../theme.js'

// Ornamento de folhagem em traço fino, usado como motivo recorrente
// que une as secções sem depender de fotografias de flores.

export function LeafDivider({ tone = 'champagne', className = '' }) {
  const stroke = tone === 'sand' ? colors.sand : colors.gold
  return (
    <svg
      viewBox="0 0 240 32"
      className={`h-6 w-auto ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 16 C 60 4, 100 4, 120 16 C 140 4, 180 4, 236 16"
        stroke={stroke}
        strokeWidth="1"
        opacity="0.9"
      />
      <circle cx="120" cy="16" r="3" fill={stroke} />
      <path
        d="M110 16c4-6 12-8 18-4M130 16c-4-6-12-8-18-4"
        stroke={stroke}
        strokeWidth="1"
      />
    </svg>
  )
}

export function CornerLeaves({ tone = 'champagne', className = '' }) {
  const stroke = tone === 'sand' ? colors.sand : colors.gold
  return (
    <svg
      viewBox="0 0 160 160"
      className={`pointer-events-none absolute h-16 w-16 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 8 C 40 10, 60 30, 62 62"
        stroke={stroke}
        strokeWidth="1.1"
      />
      <path d="M8 8 C 30 14, 44 30, 40 50" stroke={stroke} strokeWidth="0.8" opacity="0.7" />
      <path d="M8 8 C 14 30, 30 44, 50 40" stroke={stroke} strokeWidth="0.8" opacity="0.7" />
      <circle cx="8" cy="8" r="2.5" fill={stroke} />
    </svg>
  )
}
