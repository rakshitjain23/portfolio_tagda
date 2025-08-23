"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { usePerformanceOptimization } from "../components/performance-optimizer";

// Optimized text animation variants
const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.05
    }
  }
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition:
    {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export default function Home() {
  const { shouldReduceAnimations } = usePerformanceOptimization();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Optimized Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl dark:bg-primary/10" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl dark:bg-secondary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl dark:bg-primary/3" />
      </div>

      <div className="container py-12 md:py-24 lg:py-32">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Optimized Hero Section */}
          <section className="flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center">
            <motion.div 
              className="flex-1 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div>
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                  initial="hidden"
                  animate="visible"
                  variants={shouldReduceAnimations ? undefined : textVariants}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent font-display inline-block"
                    variants={shouldReduceAnimations ? undefined : textVariants}
                  >
                    Hi, I&apos;m&nbsp;
                  </motion.span>
                  <motion.span 
                    className="inline-block text-primary font-display"
                    variants={shouldReduceAnimations ? undefined : textVariants}
                  >
                    {shouldReduceAnimations ? (
                      "Rakshit Jain"
                    ) : (
                      "Rakshit Jain".split("").map((letter, index) => (
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
                      ))
                    )}
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className="mt-4 text-xl text-muted-foreground font-medium bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  🚀 Full Stack Developer | AI/ML Explorer | Open Source Contributor
                </motion.p>
              </div>
              <motion.p 
                className="text-lg text-muted-foreground font-light leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Currently leading the <strong className="text-primary">Bunkify organization</strong> and diving deep into AI/ML through Andrew Ng&apos;s courses. Built Fake News Prediction Model (95.28% accuracy) and Linear Regression from scratch. Specializing in Next.js, React, Node.js, Python, and machine learning. Building innovative solutions that make a difference in student life and beyond.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
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
                transition={{ delay: 0.6, duration: 0.6 }}
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

              {/* GitHub Foundation Certification Badge */}
              <motion.a 
                href="https://www.credly.com/badges/80009eed-8879-4b86-8a96-6c6386c36706/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-lg border border-primary/20 dark:border-primary/30 hover:border-primary/40 dark:hover:border-primary/50 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-primary-foreground font-bold text-sm">🏆</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary group-hover:text-primary/90 transition-colors">GitHub Foundation Certified</p>
                  <p className="text-xs text-muted-foreground">Click to verify on Credly</p>
                </div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse group-hover:animate-bounce" />
              </motion.a>
            </motion.div>
            <motion.div 
              className="flex-shrink-0 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div 
                className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-4 border-primary/20 relative shadow-2xl"
                variants={shouldReduceAnimations ? undefined : floatingAnimation}
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
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay" />
              </motion.div>
            </motion.div>
          </section>

                     {/* Creative Featured Projects Section */}
           <motion.section 
             className="py-16 relative"
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.8, duration: 0.6 }}
           >
             {/* Creative Background Elements */}
             <div className="absolute inset-0 -z-10 overflow-hidden">
               <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
               <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-2xl" />
               <div className="absolute top-1/2 left-0 w-24 h-24 bg-primary/3 rounded-full blur-xl" />
             </div>

             {/* Section Header with Creative Design */}
             <div className="text-center mb-16 relative">
               <motion.div 
                 className="inline-flex items-center gap-3 mb-6"
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.9, duration: 0.6 }}
               >
                 <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                 <div className="w-1 h-1 bg-primary/60 rounded-full animate-pulse delay-75" />
                 <div className="w-1 h-1 bg-primary/40 rounded-full animate-pulse delay-150" />
               </motion.div>
               <motion.h2 
                 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent font-display mb-4"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 1.0, duration: 0.6 }}
               >
                 Featured Projects
               </motion.h2>
               <motion.p 
                 className="text-lg text-muted-foreground font-light max-w-2xl mx-auto"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 1.1, duration: 0.6 }}
               >
                 Crafting digital experiences that blend innovation with purpose. Each project tells a story of growth and creativity.
               </motion.p>
             </div>

                                                       {/* Creative Project Cards Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {/* Bunkify - Compact Featured Project */}
                 <motion.div 
                   className="group relative"
                   initial={{ opacity: 0, x: -30 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 1.2, duration: 0.6 }}
                 >
                   <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-card via-card to-card/80 text-card-foreground shadow-lg backdrop-blur-sm bg-opacity-50 group-hover:shadow-primary/20 transition-all duration-500">
                     {/* Floating Elements */}
                     <div className="absolute top-3 right-3 w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-100" />
                     <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-bounce delay-200" />
                     
                     <div className="p-6 space-y-4">
                       {/* Project Header */}
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md">
                           <span className="text-lg">🚀</span>
                         </div>
                         <div className="flex-1">
                           <h3 className="text-lg font-bold font-display bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                             Bunkify
                           </h3>
                           <p className="text-xs text-muted-foreground font-medium">Smart Attendance Tracker</p>
                         </div>
                         <div className="flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                           <span className="text-xs text-green-600 dark:text-green-400 font-medium">Active</span>
                         </div>
                       </div>

                       {/* Project Description */}
                       <p className="text-sm text-muted-foreground font-light leading-relaxed">
                         Leading development of a revolutionary attendance tracker & bunk planner for students. 
                         Built with Next.js 15, React 19, and AI-powered insights.
                       </p>

                       {/* Tech Stack */}
                       <div className="flex flex-wrap gap-2">
                         <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                           Next.js 15
                         </span>
                         <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                           React 19
                         </span>
                         <span className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                           AI-Powered
                         </span>
                       </div>

                                               {/* Links */}
                        <div className="flex flex-col gap-2 pt-2 relative z-10">
                          <a 
                            href="https://bunkify.netlify.app" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-medium rounded-lg shadow-md hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 text-sm cursor-pointer"
                          >
                            <span>Demo - Live Website</span>
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </a>
                          <a 
                            href="https://github.com/hacknrollers/bunkify" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground font-medium rounded-lg shadow-md hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300 hover:scale-105 text-sm cursor-pointer"
                          >
                            <span>GitHub Repo - You can also contribute!</span>
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </a>
                        </div>
                     </div>

                     {/* Hover Effect Overlay */}
                     <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
                   </div>
                 </motion.div>

                                                                 {/* Fake News Detection Model Project */}
                  <motion.div 
                    className="group relative"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3, duration: 0.6 }}
                  >
                    <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-card via-card to-card/80 text-card-foreground shadow-lg backdrop-blur-sm bg-opacity-50 group-hover:shadow-primary/20 transition-all duration-500">
                      {/* Floating Elements */}
                      <div className="absolute top-3 right-3 w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-100" />
                      <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-bounce delay-200" />
                      
                      <div className="p-6 space-y-4">
                        {/* Project Header */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md">
                            <span className="text-lg">🤖</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold font-display bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                              Fake News Detection
                            </h3>
                            <p className="text-xs text-muted-foreground font-medium">AI/ML Model (95.28% accuracy)</p>
                          </div>
                        </div>

                        {/* Project Description */}
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                          Built a machine learning model that detects fake news with 95.28% accuracy using Python, scikit-learn, and NLP techniques.
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            Python
                          </span>
                          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            Scikit-learn
                          </span>
                          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            NLP
                          </span>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-end pt-2 relative z-10">
                          <a 
                            href="https://github.com/rakshitjain23/Fake-News-Prediction" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-medium rounded-lg shadow-md hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 text-sm cursor-pointer"
                          >
                            <span>View Project</span>
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </a>
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                    </div>
                  </motion.div>

                                 {/* Aashayein Project */}
                  <motion.div 
                    className="group relative"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                  >
                    <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-card via-card to-card/80 text-card-foreground shadow-lg backdrop-blur-sm bg-opacity-50 group-hover:shadow-primary/20 transition-all duration-500">
                      {/* Floating Elements */}
                      <div className="absolute top-3 right-3 w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-100" />
                      <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-bounce delay-200" />
                      
                      <div className="p-6 space-y-4">
                        {/* Project Header */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md">
                            <span className="text-lg">❤️</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold font-display bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                              Aashayein
                            </h3>
                            <p className="text-xs text-muted-foreground font-medium">The Life Saviours</p>
                          </div>
                        </div>

                        {/* Project Description */}
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                          Member & developer for my college social club. Built and maintain this impactful website for a great cause.
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            Next.js
                          </span>
                          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            React
                          </span>
                          <span className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                            Social Impact
                          </span>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-end pt-2 relative z-10">
                          <a 
                            href="https://thelifesaviours.org" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-medium rounded-lg shadow-md hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 text-sm cursor-pointer"
                          >
                            <span>View Project</span>
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </a>
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                    </div>
                  </motion.div>
               </div>
             
             {/* Creative View All Projects Button */}
             <motion.div 
               className="text-center mt-16"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.5, duration: 0.6 }}
             >
               <Link 
                 href="/projects" 
                 className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-background/80 to-background border-2 border-primary/20 text-primary font-semibold rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20 hover:scale-105 hover:bg-primary/5"
               >
                 <span className="relative">
                   <span className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-500" />
                   <span className="relative">View All Projects</span>
                 </span>
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
               </Link>
             </motion.div>
           </motion.section>
        </div>
      </div>
    </div>
  );
}
