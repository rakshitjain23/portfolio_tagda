'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Fast dot
  const dotX = useSpring(mx, { stiffness: 800, damping: 35, mass: 0.3 })
  const dotY = useSpring(my, { stiffness: 800, damping: 35, mass: 0.3 })

  // Lagging ring
  const ringX = useSpring(mx, { stiffness: 180, damping: 20, mass: 0.8 })
  const ringY = useSpring(my, { stiffness: 180, damping: 20, mass: 0.8 })

  // Slow glow blob
  const blobX = useSpring(mx, { stiffness: 60, damping: 15, mass: 1.5 })
  const blobY = useSpring(my, { stiffness: 60, damping: 15, mass: 1.5 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my])

  return (
    <>
      {/* Glow blob - slowest lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9990]"
        style={{
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Ring - medium lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 34,
          height: 34,
          borderRadius: '50%',
          border: '1.5px solid rgba(139,92,246,0.6)',
          boxShadow: '0 0 12px rgba(124,58,237,0.3)',
        }}
      />

      {/* Dot - snappy */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#a78bfa',
          boxShadow: '0 0 8px rgba(167,139,250,0.9)',
        }}
      />
    </>
  )
}
