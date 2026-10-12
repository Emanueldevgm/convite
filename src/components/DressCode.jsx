import { motion } from 'motion/react'
import { dressCode } from '../data.js'
import {
  staggerContainer,
  staggerItem,
  viewport,
} from '../hooks/useAnimations'

export default function DressCode() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="hairline rounded-sm bg-sand px-5 py-6 text-center"
    >
      <motion.p variants={staggerItem} className="font-display text-xl text-bottle">
        Dress Code
      </motion.p>
      <motion.p variants={staggerItem} className="mt-1 text-sm text-charcoal/70">
        {dressCode.label}
      </motion.p>
      <motion.div variants={staggerItem} className="mt-5 flex justify-center gap-4">
        {dressCode.palette.map((color) => (
          <div key={color.hex} className="flex flex-col items-center gap-2">
            <span
              className="h-9 w-9 rounded-full border border-black/10"
              style={{ backgroundColor: color.hex }}
              aria-hidden="true"
            />
            <span className="text-[10px] uppercase tracking-wide text-charcoal/60">
              {color.name}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}