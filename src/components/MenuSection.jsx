import { motion } from 'motion/react'
import { staggerContainer, staggerItem, viewport } from '../hooks/useAnimations'

export default function MenuSection({ title, items }) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="hairline rounded-sm bg-sand px-6 py-7 sm:px-8"
      style={{ willChange: 'opacity' }}
    >
      <motion.h2
        variants={staggerItem}
        className="text-center font-display text-3xl italic text-champagne-dark"
      >
        {title}
      </motion.h2>

      <motion.ul
        variants={staggerItem}
        className="mt-6 space-y-3 text-center"
      >
        {items.map((item) => (
          <li
            key={item}
            className="text-base leading-relaxed text-charcoal/85 sm:text-lg"
          >
            {item}
          </li>
        ))}
      </motion.ul>
    </motion.section>
  )
}