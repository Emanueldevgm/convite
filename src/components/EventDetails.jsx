import { motion } from 'motion/react'
import { events } from '../data.js'
import { staggerContainer, staggerItem, viewport } from '../hooks/useAnimations'

export default function EventDetails() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="space-y-4"
    >
      {events.map((event) => (
        <motion.div
          key={event.title}
          variants={staggerItem}
          className="hairline rounded-sm bg-sand px-5 py-5"
        >
          <p className="font-display text-xl text-bottle">{event.title}</p>
          <p className="mt-1 font-display text-2xl italic text-champagne-dark">
            {event.time}
          </p>
          <p className="mt-2 text-sm text-charcoal/80">{event.venue}</p>
          <p className="text-sm text-charcoal/60">{event.address}</p>
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest2 text-champagne-dark underline decoration-champagne/50 underline-offset-4 transition-colors hover:text-bottle"
          >
            Ver localização
          </a>
        </motion.div>
      ))}
    </motion.div>
  )
}