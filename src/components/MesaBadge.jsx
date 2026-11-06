import { motion } from 'motion/react'
import { LeafDivider } from './Ornament.jsx'

export default function MesaBadge({ tableLabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
      style={{ willChange: 'opacity, transform' }}
    >
      <p className="font-display text-base italic tracking-widest2 text-champagne-dark">
        Bem-vindos à
      </p>
      <h1 className="mt-3 font-display text-5xl font-semibold leading-tight text-bottle sm:text-6xl">
        Mesa {tableLabel || 'da Festa'}
      </h1>
      <LeafDivider className="mx-auto mt-6" />
      <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-charcoal/60">
        Consulte abaixo o menu completo da celebração
      </p>
    </motion.div>
  )
}