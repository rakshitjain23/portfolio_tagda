'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'

const TYPING_PHRASES = [
  'Full-Stack Developer',
  'SaaS Builder',
  'Open to Internships',
  'Available for Freelance',
]

function useTyping(phrases: string[]) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const ref = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const current = phrases[index]
    if (!deleting && text === current) {
      ref.current = setTimeout(() => setDeleting(true), 2400)
      return
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % phrases.length)
      return
    }
    ref.current = setTimeout(() => {
      setText((t) => deleting ? t.slice(0, -1) : current.slice(0, t.length + 1))
    }, deleting ? 40 : 72)
    return () => clearTimeout(ref.current)
  }, [text, deleting, index, phrases])

  return text
}

export default function Hero() {
  const typed = useTyping(TYPING_PHRASES)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0 z-[1] pointer-events-none" />

      {/* Soft background glow — no harsh grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Main central glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(90,30,200,0.18) 0%, rgba(124,58,237,0.06) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Top-left accent */}
        <div
          className="animate-orb-1 absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Bottom-right accent */}
        <div
          className="animate-orb-2 absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(90,20,180,0.12) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Very subtle grid — almost invisible */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)`,
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/[0.07] text-violet-300 text-[11px] font-bold mb-10 tracking-widest uppercase"
          id="hero-badge"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          Available for hire
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <h1
            className="font-black leading-[0.95] tracking-tight mb-8"
            id="hero-heading"
            style={{ fontSize: 'clamp(3.8rem, 11vw, 9.5rem)' }}
          >
            <span className="block text-white">Hi, I&apos;m</span>
            <span
              className="block glitch-text gradient-text-white"
              data-text="Rakshit."
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', letterSpacing: '-0.04em' }}
            >
              Rakshit.
            </span>
          </h1>
        </motion.div>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="flex items-center justify-center gap-2 text-base sm:text-lg md:text-xl font-semibold text-white/50 mb-7"
          id="hero-typing"
        >
          <span className="gradient-text font-bold">{typed}</span>
          <span className="cursor-blink w-[2px] h-5 bg-violet-400 rounded inline-block" />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-[15px] sm:text-[16px] text-white/40 max-w-md mx-auto mb-12 leading-relaxed"
          id="hero-bio"
        >
          I build production-grade web apps and SaaS products.
          CS student at JECRC, Jaipur.{' '}
          <span className="text-white/60 font-semibold">I turn ideas into real, deployed products.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#projects" id="hero-cta-projects" className="btn-primary text-sm px-7 py-3.5">
            View My Work
            <ArrowRight size={15} />
          </a>
          <a href="/resume.pdf" download id="hero-cta-resume" className="btn-secondary text-sm px-7 py-3.5">
            <Download size={15} />
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}
