import { motion } from 'motion/react'
import { timeline } from '../data.js'
import { staggerContainer, staggerItem, viewport } from '../hooks/useAnimations'

const icons = {
  rings: (
    <>
      <circle cx="8" cy="14" r="5" />
      <circle cx="16" cy="14" r="5" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="1.5" />
      <path d="M8 8l1.5-3h5L16 8" />
      <circle cx="12" cy="14" r="3.2" />
    </>
  ),
  dinner: (
    <>
      <path d="M7 3v8a2 2 0 002 2h0a2 2 0 002-2V3" />
      <path d="M9 13v8" />
      <path d="M17 3c-1.5 0-2.5 2-2.5 5s1 5 2.5 5v8" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </>
  ),
}

export default function Timeline() {
  return (
    <motion.ol
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="relative ml-3 space-y-8 border-l border-champagne/40 pl-8"
    >
      {timeline.map((item) => (
        <motion.li key={item.label} variants={staggerItem} className="relative">
          <span className="absolute -left-[41px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-champagne bg-sand text-bottle">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {icons[item.icon]}
            </svg>
          </span>
          <p className="font-display text-lg italic text-champagne-dark">
            {item.time}
          </p>
          <p className="text-sm text-charcoal/80">{item.label}</p>
        </motion.li>
      ))}
    </motion.ol>
  )
}