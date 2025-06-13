"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background py-6">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Rakshit Jain. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <motion.a 
            href="https://github.com/rakshitjain23" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="h-5 w-5" />
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/rakshit-gang" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="h-5 w-5" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
} 