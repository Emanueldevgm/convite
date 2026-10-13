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
      className="relative overflow-hidden bg-sand px-4 pb-10 pt-10 text-center sm:px-6 sm:pb-14 sm:pt-12 lg:px-12 lg:py-16"
    >
      <CornerLeaves className="left-2 top-4 sm:left-4 sm:top-6" />
      <CornerLeaves className="right-2 top-4 -scale-x-100 sm:right-4 sm:top-6" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-5xl"
      >
        <motion.div variants={staggerItem}>
          <p className="font-display text-xs italic tracking-widest2 text-champagne-dark sm:text-sm">
            Com a bênção de seus pais
          </p>

          <h1 className="mx-auto mt-5 flex flex-col items-center gap-1 font-display text-5xl font-semibold leading-none text-bottle sm:mt-6 sm:text-6xl">
            <span>{couple.bride}</span>
            <span className="my-1 text-2xl italic text-champagne-dark">&amp;</span>
            <span>{couple.groom}</span>
          </h1>

          <LeafDivider className="mx-auto mt-5 sm:mt-6" />

          <p className="mt-4 font-display text-3xl text-bottle sm:mt-5 sm:text-4xl">
            {weddingDate.day}{' '}
            <span className="italic text-champagne-dark">·</span>{' '}
            {weddingDate.displayMonth}
          </p>

          <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-charcoal/60 sm:text-xs sm:tracking-widest2">
            {weddingDate.year} — {weddingDate.weekday}
          </p>
        </motion.div>

        <div className="mx-auto mt-7 grid w-full max-w-4xl grid-cols-1 items-center gap-7 sm:mt-9 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-20">
          <motion.figure
            variants={staggerItem}
            className="hairline mx-auto w-full max-w-xs overflow-hidden rounded-t-[64px] rounded-b-sm sm:rounded-t-[80px] md:max-w-sm"
          >
            <img
              src="/assets/casal.jpg"
              alt={`${couple.bride} e ${couple.groom}`}
              className="aspect-[3/4] w-full object-cover"
            />
          </motion.figure>

          <div className="mx-auto w-full max-w-sm text-center">
            <motion.p
              variants={staggerItem}
              className="text-sm leading-relaxed text-charcoal/75 sm:text-base"
            >
              <strong>
                O casal {couple.groom} e {couple.bride} anuncia o seu
                Alambamento.
              </strong>{' '}
              Temos a honra de convidá-lo para participar no copo-d'água.
            </motion.p>

            <motion.p
              variants={staggerItem}
              className="mx-auto mt-4 max-w-xs text-xs leading-relaxed text-charcoal/65 sm:text-sm"
            >
              {couple.parents}
            </motion.p>

            <motion.div variants={staggerItem} className="mx-auto mt-6 w-full sm:mt-8">
              <MusicPlayer />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}