"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

// Text animation variants
const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20, rotate: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl dark:bg-primary/20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/30 rounded-full blur-3xl dark:bg-secondary/20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl dark:bg-primary/5 animate-pulse" />
      </div>

      <div className="container py-12 md:py-24 lg:py-32">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Enhanced Hero Section */}
          <section className="flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center">
            <motion.div 
              className="flex-1 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div>
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent font-display inline-block"
                    variants={textVariants}
                  >
                    Hi, I&apos;m{" "}
                  </motion.span>
                  <motion.span 
                    className="inline-block text-primary font-display"
                    variants={textVariants}
                  >
                    {" Rakshit Jain".split("").map((letter, index) => (
                      <motion.span
                        key={index}
                        variants={letterVariants}
                        className="inline-block hover:text-primary/80 transition-colors"
                        style={{
                          display: "inline-block",
                          transformOrigin: "bottom",
                        }}
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))}
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className="mt-4 text-xl text-muted-foreground font-medium bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Full Stack Developer | AI Enthusiast | DSA Learner | Open Source Contributor
                </motion.p>
              </div>
              <motion.p 
                className="text-lg text-muted-foreground font-light leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Specializing in Next.js, React, Node.js, Python, and C++. Currently learning Data Structures & Algorithms and diving into AI development. Building and deploying scalable applications on Vercel, Hostinger, and GitHub.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Link 
                  href="/projects" 
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-base font-medium shadow-lg transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-primary/25"
                >
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background/50 backdrop-blur-sm px-6 py-3 text-base font-medium shadow-lg transition-all hover:bg-accent hover:text-accent-foreground hover:scale-105 hover:shadow-accent/25"
                >
                  Contact Me
                </Link>
              </motion.div>
              <motion.div 
                className="flex items-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <a 
                  href="https://github.com/rakshitjain23" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-all hover:scale-110 hover:rotate-12"
                >
                  <FaGithub className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/rakshit-gang" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-all hover:scale-110 hover:-rotate-12"
                >
                  <FaLinkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </motion.div>
            </motion.div>
            <motion.div 
              className="flex-shrink-0 relative"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-4 border-primary/20 relative shadow-2xl"
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
              >
                <Image 
                  src="/profile.jpg" 
                  alt="Rakshit Jain" 
                  fill
                  sizes="(max-width: 768px) 280px, 320px"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay" />
              </motion.div>
            </motion.div>
          </section>

          {/* Featured Section */}
          <motion.section 
            className="py-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent font-display">Featured Projects</h2>
              <p className="text-muted-foreground font-light">Some of my recent work that I&apos;m proud of.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <motion.div 
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group rounded-lg border bg-card text-card-foreground shadow-lg overflow-hidden backdrop-blur-sm bg-opacity-50"
              >
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold font-display">Aashayein - The Life Saviours</h3>
                  <p className="text-sm text-muted-foreground font-light">Member & developer for my college social club. Built and maintain this impactful website for a great cause.</p>
                  <div className="flex justify-end">
                    <a 
                      href="https://www.thelifesaviours.org/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary inline-flex items-center hover:underline group-hover:translate-x-1 transition-transform"
                    >
                      Visit Website <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group rounded-lg border bg-card text-card-foreground shadow-lg overflow-hidden backdrop-blur-sm bg-opacity-50"
              >
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold font-display">Rakun Voice Assistant</h3>
                  <p className="text-sm text-muted-foreground font-light">A smart voice assistant powered by Google Gemini AI, built with Flutter.</p>
                  <div className="flex justify-end">
                    <a 
                      href="https://github.com/rakshitjain23/rakun-voice-assistant" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary inline-flex items-center hover:underline group-hover:translate-x-1 transition-transform"
                    >
                      View Project <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group rounded-lg border bg-card text-card-foreground shadow-lg overflow-hidden backdrop-blur-sm bg-opacity-50"
              >
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold font-display">Rakshit Communication</h3>
                  <p className="text-sm text-muted-foreground font-light">Modern website for an electronics shop, built with Next.js and TypeScript.</p>
                  <div className="flex justify-end">
                    <a 
                      href="https://rakshit-communication.vercel.app/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary inline-flex items-center hover:underline group-hover:translate-x-1 transition-transform"
                    >
                      Visit Website <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
