'use client'

import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Briefcase, Rocket } from 'lucide-react'

const highlights = [
  {
    icon: GraduationCap,
    title: 'CSE Student',
    desc: 'JECRC Foundation, Jaipur',
  },
  {
    icon: Rocket,
    title: 'Real SaaS Products',
    desc: 'Not just tutorials - shipped & live',
  },
  {
    icon: Briefcase,
    title: 'Open to Opportunities',
    desc: 'Internships & freelance projects',
  },
  {
    icon: MapPin,
    title: 'Based in Jaipur, India',
    desc: 'Available remotely worldwide',
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

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={containerVariants}
          >
            <motion.span className="section-label" variants={itemVariants}>
              About Me
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
              id="about-heading"
            >
              A developer who actually{' '}
              <span className="gradient-text">ships things</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-white/55 leading-relaxed mb-4 text-[15px]">
              I&apos;m Rakshit Gang, a Full-Stack Developer and SaaS builder studying Computer Science at JECRC Foundation, Jaipur. I don&apos;t just build tutorial projects - I build and ship real products that solve real problems.
            </motion.p>
            <motion.p variants={itemVariants} className="text-white/55 leading-relaxed mb-8 text-[15px]">
              From AI-powered compliance platforms to healthcare interoperability tools, my work spans the full spectrum - frontend to backend, cloud infrastructure to developer tooling. I care deeply about both performance and design.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a
                href="mailto:rakshitgang23@gmail.com"
                id="about-cta-email"
                className="btn-primary text-sm"
              >
                Get in Touch
              </a>
              <a
                href="https://github.com/rakshitjain23"
                target="_blank"
                rel="noopener noreferrer"
                id="about-cta-github"
                className="btn-secondary text-sm"
              >
                View GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* Right - cards grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={containerVariants}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass-card p-5"
                id={`about-highlight-${i}`}
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center mb-3 border border-violet-500/20">
                  <item.icon size={18} className="text-violet-400" />
                </div>
                <h3 className="text-sm font-semibold text-white/90 mb-1">{item.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}

            {/* Decorative card */}
            <motion.div
              variants={itemVariants}
              className="col-span-2 glass-card p-5 flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/25 to-violet-700/25 flex items-center justify-center border border-violet-500/20 font-bold text-violet-300 text-lg">
                RG
              </div>
              <div>
                <p className="text-sm font-semibold text-white/90">devrakshit.me</p>
                <p className="text-xs text-white/45">Building & learning in public</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span className="text-xs text-green-400 font-medium">Open to work</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
