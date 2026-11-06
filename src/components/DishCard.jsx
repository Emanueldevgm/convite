import { motion } from 'motion/react'
import { staggerItem } from '../hooks/useAnimations'

export default function DishCard({ dish, index }) {
  return (
    <motion.div
      variants={staggerItem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.06 }}
      className="hairline group relative flex flex-col justify-between rounded-sm bg-sand px-5 py-5 transition-colors hover:bg-champagne/10"
      style={{ willChange: 'opacity, transform' }}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className="text-[10px] uppercase tracking-widest2 text-champagne-dark">
            {dish.category}
          </span>
          <span className="rounded-sm border border-champagne/50 px-2 py-0.5 text-[10px] uppercase tracking-widest2 text-champagne-dark/80">
            {dish.tag}
          </span>
        </div>

        <p className="mt-3 font-display text-xl leading-tight text-bottle">
          {dish.name}
        </p>

        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
          {dish.description}
        </p>
      </div>

      <div className="mt-5 h-px w-full bg-champagne/30" />
    </motion.div>
  )
}