import { Parallax } from 'react-scroll-parallax'
import { motion } from 'motion/react'
import { couple } from '../data.js'
import { fadeUp, viewport } from '../hooks/useAnimations'

export default function Closing() {
  return (
    <section className="bg-forest px-6 py-16 text-center text-sand">
      <Parallax speed={-8} className="mx-auto w-full max-w-xs">
        <motion.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="hairline overflow-hidden rounded-sm"
        >
          <img
            src="/assets/casal.jpg"
            alt={`${couple.bride} e ${couple.groom}`}
            className="aspect-[4/3] w-full object-cover"
          />
        </motion.figure>
      </Parallax>

    </section>
  )
}