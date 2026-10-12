import { motion } from 'motion/react'
import { viewport } from '../hooks/useAnimations'

export default function AnimateInView({
  children,
  variants,
  className = '',
  delay = 0,
  as = 'div',
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}