'use client'

import { motion } from 'framer-motion'

const ROW_1 = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
  'FastAPI', 'Python', 'Node.js', 'PostgreSQL', 'Supabase',
]

const ROW_2 = [
  'MongoDB', 'Redis', 'AWS S3', 'AWS Textract', 'Docker',
  'Git', 'Linux', 'JWT Auth', 'System Design', 'Celery',
]


export default function Skills() {
  return (
    <section id="skills" className="section-padding overflow-hidden">
      <div className="section-container mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="section-label justify-center">Skills</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2" id="skills-heading">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-white/40 mt-3 text-sm max-w-sm mx-auto">
            Tools I use to build production-grade applications.
          </p>
        </motion.div>
      </div>

      {/* Marquee rows - FULL WIDTH, edge to edge */}
      <div className="flex flex-col gap-5">
        {/* Row 1 - left to right */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
          >
            {[...ROW_1, ...ROW_1].map((item, i) => (
              <div
                key={i}
                id={`skill-r1-${i}`}
                className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/[0.07] bg-white/[0.025] text-white/60 text-sm font-semibold whitespace-nowrap hover:border-violet-500/30 hover:text-violet-200 hover:bg-violet-500/[0.08] transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - right to left */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          >
            {[...ROW_2, ...ROW_2].map((item, i) => (
              <div
                key={i}
                id={`skill-r2-${i}`}
                className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-violet-500/10 bg-violet-500/[0.04] text-violet-300/60 text-sm font-semibold whitespace-nowrap hover:border-violet-500/35 hover:text-violet-200 hover:bg-violet-500/[0.1] transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Category breakdown below marquee */}
      <div className="section-container mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { cat: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Framer Motion'] },
            { cat: 'Backend', items: ['FastAPI', 'Python', 'Node.js', 'Celery'] },
            { cat: 'DB & Cloud', items: ['PostgreSQL', 'Supabase', 'Redis', 'MongoDB', 'AWS', 'Docker'] },
            { cat: 'Tools', items: ['Git', 'Linux', 'JWT Auth', 'Postman', 'System Design'] },
          ].map((group, i) => (
            <div key={i} className="glass-card p-5" id={`skill-cat-${i}`}>
              <p className="text-[11px] font-black uppercase tracking-[0.12em] text-violet-400 mb-3">{group.cat}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item, j) => (
                  <span key={j} className="tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
