'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Mail, Github, Linkedin } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'About', num: '01' },
  { href: '#projects', label: 'Projects', num: '02' },
  { href: '#skills', label: 'Skills', num: '03' },
  { href: '#contact', label: 'Contact', num: '04' },
]

const socialLinks = [
  { href: 'mailto:rakshitgang23@gmail.com', icon: Mail, label: 'Email' },
  { href: 'https://github.com/rakshitjain23', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/rakshit-gang', icon: Linkedin, label: 'LinkedIn' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const sections = ['about', 'projects', 'skills', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(10,10,15,0.88)] backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center font-black text-sm text-white shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/55 transition-all duration-300 group-hover:scale-105">
              RG
            </div>
            <span className="font-bold text-[15px] text-white/90 hidden sm:block">
              Rakshit Gang
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white/90'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/[0.07] rounded-lg"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:rakshitgang23@gmail.com"
              id="nav-hire-me"
              className="btn-primary text-xs px-4 py-2 hidden sm:inline-flex"
            >
              Hire Me
            </a>

            {/* Hamburger - animated to X */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] transition-all"
              aria-label="Toggle mobile menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="block w-[18px] h-[1.5px] bg-white/80 rounded-full origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-[18px] h-[1.5px] bg-white/80 rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="block w-[18px] h-[1.5px] bg-white/80 rounded-full origin-center"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ===== FULL-SCREEN MOBILE MENU ===== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 52px) 32px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 52px) 32px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 52px) 32px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[55] md:hidden flex flex-col"
            style={{ background: 'rgba(5,5,8,0.98)', backdropFilter: 'blur(24px)' }}
          >
            {/* Background glow */}
            <div
              className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 65%)',
                filter: 'blur(40px)',
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(90,20,180,0.1) 0%, transparent 65%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Nav links - vertically centered */}
            <div className="flex-1 flex flex-col justify-center px-10 pt-20 pb-8">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    id={`mobile-nav-${link.label.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: 'easeOut' }}
                    className="group flex items-center gap-4 py-4 border-b border-white/[0.06] last:border-none"
                  >
                    <span className="text-[11px] font-black text-violet-500/60 group-hover:text-violet-400 transition-colors w-6">
                      {link.num}
                    </span>
                    <span className="text-3xl font-black text-white/80 group-hover:text-white transition-colors tracking-tight">
                      {link.label}
                    </span>
                    <span className="ml-auto text-white/10 group-hover:text-violet-500/40 transition-colors text-xl font-light">
                      →
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.42 }}
                className="mt-10"
              >
                <a
                  href="mailto:rakshitgang23@gmail.com"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center text-base py-4"
                  id="mobile-hire-btn"
                >
                  Hire Me
                  <Mail size={16} />
                </a>
              </motion.div>
            </div>

            {/* Social links at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="px-10 pb-12 flex items-center gap-6"
            >
              {socialLinks.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 rounded-xl border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-white/40 hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/[0.08] transition-all"
                >
                  <s.icon size={17} />
                </a>
              ))}
              <span className="ml-auto text-xs text-white/20 font-medium">devrakshit.me</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
