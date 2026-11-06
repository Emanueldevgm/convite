import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export default function MenuIntro({ onComplete }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Bloqueia scroll durante a animação
    document.body.style.overflow = 'hidden'

    // Tempo total: 1.4s (0.9s animação + 0.5s fade out)
    const timer = setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ''
      onComplete?.()
    }, 1400)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="menu-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-sand"
        >
          {/* Garfo (esquerda) */}
          <motion.svg
            viewBox="0 0 40 160"
            className="absolute h-40 w-10 text-champagne-dark"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ x: '-2vw', rotate: 0 }}
            animate={{ x: '-24vw', rotate: -12 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'transform' }}
          >
            <path d="M14 4v20M20 4v20M26 4v20" />
            <path d="M14 24h12v10c0 3-2 5-6 5s-6-2-6-5V24z" />
            <path d="M20 39v100" />
            <path d="M20 139c0 8-3 12-3 16s3 4 3 4" />
          </motion.svg>

          {/* Faca (direita) */}
          <motion.svg
            viewBox="0 0 40 160"
            className="absolute h-40 w-10 text-champagne-dark"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ x: '2vw', rotate: 0 }}
            animate={{ x: '24vw', rotate: 12 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'transform' }}
          >
            <path d="M18 4c6 0 10 6 10 16s-4 12-10 12-10-2-10-12S12 4 18 4z" />
            <path d="M18 32v100" />
            <path d="M13 132h10v10c0 4-2 6-5 6s-5-2-5-6v-10z" />
          </motion.svg>

          {/* Ornamento central (aparece brevemente) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="pointer-events-none select-none text-center"
          >
            <p className="font-display text-sm italic tracking-[0.4em] text-champagne-dark/70">
              MENU
            </p>
            <p className="mt-2 font-display text-2xl italic text-bottle">
              da Festa
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}