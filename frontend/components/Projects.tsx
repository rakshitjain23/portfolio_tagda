'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Lock, Star } from 'lucide-react'

type Project = {
  title: string
  subtitle: string
  description: string
  tags: string[]
  github?: string
  live?: string
  badge?: string
  featured?: boolean
  privateRepo?: boolean
}

const projects: Project[] = [
  {
    title: 'Ledger Orbit',
    subtitle: 'AI-Powered CA Compliance Platform',
    description:
      'A production SaaS platform for CA firms to automate GST, TDS & Income Tax compliance. Features AI document extraction via AWS Textract, real-time Kanban board, magic-link client upload portal, JWT multi-tenant auth, and async Celery + Redis background workers.',
    tags: ['Next.js', 'FastAPI', 'Supabase', 'AWS', 'Redis', 'Docker', 'TypeScript'],
    live: 'https://ledgerorbit.tech',
    badge: 'Live Product',
    featured: true,
    privateRepo: true,
  },
  {
    title: 'Reddit Mastermind',
    subtitle: 'AI Marketing Automation',
    description:
      'Automated tool that generates authentic Reddit marketing threads using AI persona simulation. Built with real-time Supabase auth and Zod type-safe validation throughout the stack.',
    tags: ['Next.js', 'Supabase', 'TypeScript', 'DeepSeek API'],
    github: 'https://github.com/rakshitjain23/reddit-mastermind',
  },
  {
    title: 'FHIR-Fly',
    subtitle: 'Healthcare Interoperability Tool',
    description:
      'Backend service mapping Ayurveda medical codes to ICD-11 international standards via HL7 FHIR-compliant FastAPI endpoints. Bridges traditional and modern medical systems.',
    tags: ['FastAPI', 'Python', 'HL7 FHIR'],
    github: 'https://github.com/hacknrollers/FHIR_fly',
  },
]

function TiltCard({ project, i }: { project: Project; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width
    const relY = (e.clientY - rect.top) / rect.height
    const tiltX = (relY - 0.5) * 12
    const tiltY = (relX - 0.5) * -12
    setTilt({ x: tiltX, y: tiltY })
    setGlowPos({ x: relX * 100, y: relY * 100 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlowPos({ x: 50, y: 50 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: i * 0.1 }}
      style={{ perspective: 1200 }}
      id={`project-card-${i}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative rounded-2xl overflow-hidden ${
          project.featured
            ? 'border border-violet-500/30'
            : 'border border-white/[0.06]'
        }`}
      >
        {/* Dynamic mouse glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(300px circle at ${glowPos.x}% ${glowPos.y}%, rgba(124,58,237,0.12), transparent 60%)`,
          }}
        />

        {/* Card background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: project.featured
              ? 'linear-gradient(135deg, rgba(124,58,237,0.07), rgba(10,10,20,0.97))'
              : 'rgba(10,10,20,0.97)',
          }}
        />

        {/* Featured glow behind card */}
        {project.featured && (
          <div className="absolute -inset-1 bg-violet-600/10 blur-xl z-0 pointer-events-none" />
        )}

        <div className="relative z-10 p-7 md:p-8">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.featured && (
              <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
                <Star size={9} fill="currentColor" /> Featured
              </span>
            )}
            {project.badge && (
              <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                🚀 {project.badge}
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-black text-white/95 mb-1 leading-tight">
                {project.title}
              </h3>
              <p className="text-sm font-bold text-violet-400 mb-4">{project.subtitle}</p>
              <p className="text-[13.5px] text-white/45 leading-relaxed mb-5 max-w-xl">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, ti) => (
                  <span key={ti} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-2 flex-shrink-0">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`project-${i}-live`}
                  className="btn-primary text-xs px-4 py-2.5"
                >
                  <ExternalLink size={12} />
                  Live Site
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`project-${i}-github`}
                  className="btn-secondary text-xs px-4 py-2.5"
                >
                  <Github size={12} />
                  GitHub
                </a>
              )}
              {project.privateRepo && (
                <div className="btn-secondary text-xs px-4 py-2.5 opacity-40 cursor-default">
                  <Lock size={12} />
                  Private
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label justify-center">Projects</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2" id="projects-heading">
            Things I&apos;ve <span className="gradient-text">Built & Shipped</span>
          </h2>
          <p className="text-white/40 mt-3 text-sm max-w-md mx-auto">
            Real products deployed and used by real people - not just tutorial clones.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <TiltCard key={i} project={project} i={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/rakshitjain23"
            target="_blank"
            rel="noopener noreferrer"
            id="projects-view-all"
            className="btn-secondary text-sm"
          >
            <Github size={15} />
            See more on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
