'use client'

import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.05] py-8" id="footer">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {year} Built by{' '}
            <a
              href="https://devrakshit.me"
              className="text-violet-400/70 hover:text-violet-400 transition-colors"
            >
              Rakshit Gang
            </a>
            {' '}- designed &amp; coded with care.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/rakshitjain23"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-github"
              className="text-white/30 hover:text-white/70 transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com/in/rakshit-gang"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-linkedin"
              className="text-white/30 hover:text-white/70 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:rakshitgang23@gmail.com"
              id="footer-email"
              className="text-white/30 hover:text-white/70 transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
