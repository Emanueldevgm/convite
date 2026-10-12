import { motion } from 'motion/react'
import { gifts } from '../data.js'
import { colorRgb } from '../theme.js'
import { scaleIn, viewport } from '../hooks/useAnimations'

export default function Gifts() {
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&color=${colorRgb.sand}&bgcolor=${colorRgb.forest}&data=${encodeURIComponent(
    gifts.qrValue,
  )}`

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="hairline rounded-sm bg-forest px-6 py-8 text-center text-sand"
    >
      <p className="font-display text-xl italic text-champagne-light">
        {gifts.heading}
      </p>
      <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-champagne-light/90">
        {gifts.note}
      </p>

      <div className="mx-auto mt-6 w-fit rounded-sm border border-champagne/40 bg-forest-dark p-3">
        <img
          src={qrSrc}
          alt="QR code para contribuição de presente"
          width="160"
          height="160"
          className="h-40 w-40"
        />
      </div>
    </motion.div>
  )
}