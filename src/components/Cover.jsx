import { useEffect } from 'react'
import { useReward } from 'partycles'
import { motion } from 'motion/react'
import { couple, weddingDate } from '../data.js'
import { LeafDivider, CornerLeaves } from './Ornament.jsx'
import MusicPlayer from './MusicPlayer.jsx'
import { staggerContainer, staggerItem } from '../hooks/useAnimations'

export default function Cover() {
  const { reward } = useReward('cover-petals', 'petals', {
    particleCount: 30,
    physics: { gravity: 0.05, wind: 0.2 },
  })

  useEffect(() => {
    const t = setTimeout(() => reward(), 1200)
    return () => clearTimeout(t)
  }, [reward])

  return (
    <section
      id="cover-petals"
      className="relative overflow-hidden bg-sand px-6 pb-14 pt-12 text-center"
    >
      <CornerLeaves className="left-4 top-6" />
      <CornerLeaves className="right-4 top-6 -scale-x-100" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={staggerItem}
          className="font-display text-sm italic tracking-widest2 text-champagne-dark"
        >
          Com a bênção de seus pais
        </motion.p>

        <motion.h1
          variants={staggerItem}
          className="mx-auto mt-6 flex flex-col items-center gap-1 font-display text-5xl font-semibold leading-none text-bottle"
        >
          <span>{couple.bride}</span>
          <span className="my-1 text-2xl italic text-champagne-dark">&amp;</span>
          <span>{couple.groom}</span>
        </motion.h1>

        <motion.div variants={staggerItem}>
          <LeafDivider className="mx-auto mt-6" />
        </motion.div>

        <motion.p
          variants={staggerItem}
          className="mt-5 font-display text-4xl text-bottle"
        >
          {weddingDate.day}{' '}
          <span className="italic text-champagne-dark">·</span>{' '}
          {weddingDate.displayMonth}
        </motion.p>

        <motion.p
          variants={staggerItem}
          className="mt-1 text-xs uppercase tracking-widest2 text-charcoal/60"
        >
          {weddingDate.year} — {weddingDate.weekday}
        </motion.p>

        <motion.figure
          variants={staggerItem}
          className="hairline mx-auto mt-9 w-full max-w-xs overflow-hidden rounded-t-[80px] rounded-b-sm"
        >
          <img
            src="/assets/casal.jpg"
            alt={`${couple.bride} e ${couple.groom}`}
            className="aspect-[3/4] w-full object-cover"
          />
        </motion.figure>

        <motion.p
          variants={staggerItem}
          className="mx-auto mt-8 max-w-xs text-sm leading-relaxed text-charcoal/75"
        >
          <strong>Anunciamos o nosso Alambamento.</strong> Temos a honra de
          convidar o Casal {couple.bride} e {couple.groom} para participar no
          copo-d'água.
        </motion.p>

        <motion.p
          variants={staggerItem}
          className="mx-auto mt-4 max-w-xs text-xs leading-relaxed text-charcoal/65"
        >
          {couple.parents}
        </motion.p>

        <motion.div variants={staggerItem} className="mx-auto mt-8 max-w-xs">
          <MusicPlayer />
        </motion.div>
      </motion.div>
    </section>
  )
}