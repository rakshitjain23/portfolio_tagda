'use client'

import { motion } from 'framer-motion'
import { Calendar, Users, Code2 } from 'lucide-react'

const experience = [
  {
    role: 'Web Developer & Event Volunteer',
    org: 'ACM Student Chapter, JECRC Jaipur',
    period: 'Sept 2024 – Present',
    type: 'Volunteer',
    highlights: [
      'Built and deployed the official ACM JECRC chapter website',
      'Led tech operations for Thinkathon\'25 with 100+ participants',
      'Organized developer workshops and hackathons for the student community',
    ],
    icon: Code2,
  },
]

const certifications = [
  {
    name: 'GitHub Foundations',
    issuer: 'GitHub',
    badge: 'GH',
    color: 'from-gray-500/20 to-gray-600/10',
    border: 'border-gray-500/20',
    text: 'text-gray-300',
  },
  {
    name: 'Supervised Machine Learning',
    issuer: 'Stanford / Coursera',
    badge: 'ML',
    color: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/20',
    text: 'text-blue-300',
  },
  {
    name: 'Full Stack Development',
    issuer: 'Udemy',
    badge: 'FS',
    color: 'from-orange-500/20 to-orange-600/10',
    border: 'border-orange-500/20',
    text: 'text-orange-300',
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

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span className="section-label justify-center" variants={itemVariants}>
            Experience
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold"
            id="experience-heading"
          >
            Where I&apos;ve <span className="gradient-text">Contributed</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={containerVariants}
          >
            <motion.h3 variants={itemVariants} className="text-xs font-bold uppercase tracking-wider text-white/35 mb-6">
              Work Experience
            </motion.h3>

            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-violet-500/20 to-transparent" />

              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative pl-14 pb-8"
                  id={`experience-item-${i}`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
                    <exp.icon size={16} className="text-violet-400" />
                  </div>

                  <div className="glass-card p-5">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
                        {exp.type}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white/90 mb-0.5">{exp.role}</h4>
                    <p className="text-sm font-medium text-violet-400/80 mb-1">{exp.org}</p>
                    <div className="flex items-center gap-1.5 text-xs text-white/35 mb-4">
                      <Calendar size={11} />
                      {exp.period}
                    </div>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, hi) => (
                        <li key={hi} className="flex items-start gap-2 text-xs text-white/50 leading-relaxed">
                          <span className="text-violet-500 mt-0.5 flex-shrink-0">◆</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={containerVariants}
          >
            <motion.h3 variants={itemVariants} className="text-xs font-bold uppercase tracking-wider text-white/35 mb-6">
              Certifications
            </motion.h3>

            <div className="flex flex-col gap-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="glass-card p-5 flex items-center gap-4"
                  id={`cert-${i}`}
                >
                  <div className={`w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br ${cert.color} border ${cert.border} flex items-center justify-center font-bold text-sm ${cert.text}`}>
                    {cert.badge}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/85">{cert.name}</p>
                    <p className="text-xs text-white/40 mt-0.5">{cert.issuer}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="w-5 h-5 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center text-green-400 text-[10px]">
                      ✓
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Education card */}
            <motion.div variants={itemVariants} className="mt-4 glass-card p-5" id="education-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
                  <Users size={18} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/35 mb-1">Education</p>
                  <p className="text-sm font-semibold text-white/85">B.Tech, Computer Science</p>
                  <p className="text-xs text-violet-400/80 mt-0.5">JECRC Foundation, Jaipur</p>
                  <p className="text-xs text-white/35 mt-1">2024 - 2028</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
