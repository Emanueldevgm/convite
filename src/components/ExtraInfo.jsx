import { motion } from 'motion/react'
import { extraInfo } from '../data.js'
import {
  staggerContainer,
  staggerItem,
  viewport,
} from '../hooks/useAnimations'

export default function ExtraInfo() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="space-y-3"
    >
      {extraInfo.map((item) => (
        <motion.details
          key={item.title}
          variants={staggerItem}
          className="hairline group rounded-sm bg-sand px-5 py-4"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg text-champagne-dark">
            {item.title}
            <span className="text-champagne-dark transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-champagne-dark">
            {item.text}
          </p>
        </motion.details>
      ))}
    </motion.div>
  )
}