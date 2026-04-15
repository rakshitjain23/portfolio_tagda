'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, MapPin, ArrowUpRight } from 'lucide-react'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/rakshitjain23',
    icon: Github,
    color: 'hover:border-gray-400/40 hover:text-gray-200',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/rakshit-gang',
    icon: Linkedin,
    color: 'hover:border-blue-400/40 hover:text-blue-300',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="max-w-2xl mx-auto"
        >
          {/* Container card */}
          <motion.div
            variants={itemVariants}
            className="relative glass-card p-10 md:p-14 text-center overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-violet-600/15 blur-[80px] pointer-events-none" />

            <motion.span className="section-label justify-center" variants={itemVariants}>
              Contact
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-4 leading-tight"
              id="contact-heading"
            >
              Let&apos;s Build{' '}
              <span className="gradient-text">Something</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/50 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto"
              id="contact-subtext"
            >
              Open to internships, freelance projects, and interesting conversations. I respond quickly.
            </motion.p>

            {/* Email CTA */}
            <motion.div variants={itemVariants} className="mb-8">
              <a
                href="mailto:rakshitgang23@gmail.com"
                id="contact-email-btn"
                className="btn-primary text-sm px-7 py-3.5 inline-flex"
              >
                <Mail size={16} />
                rakshitgang23@gmail.com
                <ArrowUpRight size={14} className="opacity-70" />
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 mb-8"
            >
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`contact-social-${s.label.toLowerCase()}`}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] text-white/50 text-sm font-medium transition-all duration-200 ${s.color}`}
                >
                  <s.icon size={16} />
                  {s.label}
                </a>
              ))}
            </motion.div>

            {/* Location note */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-1.5 text-xs text-white/30"
              id="contact-location"
            >
              <MapPin size={11} />
              Based in Jaipur, India - available remotely worldwide
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
