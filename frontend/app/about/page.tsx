"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaReact, FaNodeJs, FaGithub, FaPython } from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiFramer, 
  SiVercel, 
  SiFlutter, 
  SiFastapi, 
  SiCplusplus,
  SiJupyter
} from "react-icons/si";

// Timeline data - Concise key milestones
const timeline = [
  {
    title: "🚀 Leading Bunkify Organization",
    description: "Currently leading the Bunkify organization - building innovative student-focused applications and contributing to open source.",
  },
  {
    title: "🧠 AI/ML Learning Journey",
    description: "Learning AI/ML through Andrew Ng's courses. Built Fake News Prediction Model (95.28% accuracy) and Linear Regression from scratch.",
  },
  {
    title: "🏆 GitHub Foundation Certified",
    description: "Achieved GitHub Foundation certification, demonstrating expertise in Git, GitHub, and open source collaboration.",
  },
  {
    title: "🎯 Full Stack Development",
    description: "Built Rakun Voice Assistant (Gemini AI), multiple web apps, and currently working on Next.js dashboard projects.",
  },
];

// Skills data - Compact icons
const skills = [
  { name: "Next.js", icon: <SiNextdotjs className="h-5 w-5" /> },
  { name: "React", icon: <FaReact className="h-5 w-5" /> },
  { name: "Node.js", icon: <FaNodeJs className="h-5 w-5" /> },
  { name: "Python", icon: <FaPython className="h-5 w-5" /> },
  { name: "C++", icon: <SiCplusplus className="h-5 w-5" /> },
  { name: "Flutter", icon: <SiFlutter className="h-5 w-5" /> },
  { name: "FastAPI", icon: <SiFastapi className="h-5 w-5" /> },
  { name: "Framer", icon: <SiFramer className="h-5 w-5" /> },
  { name: "Vercel", icon: <SiVercel className="h-5 w-5" /> },
  { name: "GitHub", icon: <FaGithub className="h-5 w-5" /> },
  { name: "Jupyter", icon: <SiJupyter className="h-5 w-5" /> },
];

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="container py-12 md:py-24">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h1>

      {/* Bio Section */}
      <motion.section 
        className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">The Developer Behind the Code</h2>
          <div className="space-y-4 text-muted-foreground">
            <p className="text-lg font-medium">
              Hey there! I&apos;m not just another developer - I&apos;m a <strong className="text-primary">digital architect</strong> who turns coffee into code and dreams into reality! 🎯
            </p>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">🌟 What Makes Me Tick</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary">🧠</span>
                  <span><strong>AI/ML Explorer</strong> - Diving deep into the matrix of machine learning (and yes, I&apos;m still figuring out why my models sometimes act like rebellious teenagers!)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">☁️</span>
                  <span><strong>Cloud Whisperer</strong> - Making Google Cloud Platform dance to my deployment tunes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">🎯</span>
                  <span><strong>Full Stack Ninja</strong> - From pixel-perfect UIs to rock-solid backends, I craft digital experiences that users actually love</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">🌱</span>
                  <span><strong>Knowledge Sponge</strong> - Always soaking up new tech like a developer in a code rainstorm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">🤝</span>
                  <span><strong>Open Source Warrior</strong> - Contributing to the community because the best code is the code that helps others code better</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">🏆</span>
                  <span><strong>Bunkify Commander</strong> - Leading the revolution in student tech (because someone has to save students from attendance chaos!)</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">💡 My Philosophy</h3>
              <p className="italic text-primary/80">
                &quot;Code is poetry, bugs are features in disguise, and every error message is just the computer&apos;s way of saying &apos;I love you&apos; in binary&quot; 🖤
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <motion.div 
            className="relative w-[280px] h-[280px] rounded-lg overflow-hidden border-4 border-primary/20"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image 
              src="/profile.jpg" 
              alt="Rakshit Jain" 
              fill
              sizes="280px"
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </div>
      </motion.section>

             {/* Skills Section */}
       <motion.section 
         className="mb-16"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5, delay: 0.4 }}
       >
         <h2 className="text-2xl font-bold mb-6">Skills & Technologies</h2>
         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
           {skills.map((skill, index) => (
             <motion.div
               key={skill.name}
               custom={index}
               variants={fadeIn}
               initial="hidden"
               animate="visible"
               whileHover={{ scale: 1.05, y: -2 }}
               className="flex flex-col items-center gap-1.5 p-3 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/30"
             >
               <div className="text-primary">
                 {skill.icon}
               </div>
               <span className="font-medium text-xs sm:text-sm text-center leading-tight">{skill.name}</span>
             </motion.div>
           ))}
         </div>
       </motion.section>

                           {/* Interactive Journey Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="overflow-hidden"
        >
                     <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">🚀 My Journey Through Time</h2>
           
           {/* Mobile Timeline (Stacked) */}
           <div className="block md:hidden">
             <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.8 + (index * 0.1),
                    type: "spring",
                    stiffness: 100
                  }}
                  className="relative"
                >
                  {/* Mobile Timeline Node */}
                  <motion.div 
                    className="absolute left-4 top-0 w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full border-4 border-background shadow-lg flex items-center justify-center z-10"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 1.2 + (index * 0.1),
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <motion.div
                      className="text-primary-foreground font-bold text-sm"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      {index + 1}
                    </motion.div>
                  </motion.div>

                  {/* Mobile Content Card */}
                  <motion.div 
                    className="ml-16"
                    whileHover={{ 
                      scale: 1.02,
                      y: -3,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                                         <div className="bg-card border border-border/50 dark:border-border/30 rounded-xl p-4 md:p-5 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:border-primary/30 dark:hover:border-primary/40">
                       <motion.div
                         className="flex items-center gap-3 mb-2"
                         whileHover={{ scale: 1.05 }}
                       >
                         <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                         <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                           {item.title}
                         </h3>
                       </motion.div>
                       <p className="text-muted-foreground dark:text-muted-foreground/90 leading-relaxed text-sm md:text-base">
                         {item.description}
                       </p>
                       
                       {/* Interactive Badge */}
                       <motion.div 
                         className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/80 rounded-full text-xs md:text-sm font-medium border border-primary/20 dark:border-primary/30"
                         whileHover={{ 
                           scale: 1.05,
                           backgroundColor: "hsl(var(--primary) / 0.2)"
                         }}
                         transition={{ type: "spring", stiffness: 400 }}
                       >
                         <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                         {index === 0 ? "🚀 Active" : 
                          index === 1 ? "🧠 Learning" :
                          index === 2 ? "🏆 Certified" : "🎯 Building"}
                       </motion.div>
                     </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

                     {/* Desktop Timeline (Zigzag) */}
           <div className="hidden md:block relative">
             {/* Timeline Line */}
             <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 dark:from-primary/30 dark:via-primary/40 dark:to-primary/30 h-full rounded-full" />
             
             {/* Journey Items */}
             <div className="space-y-12 lg:space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.8 + (index * 0.1),
                    type: "spring",
                    stiffness: 100
                  }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <motion.div 
                    className={`w-5/12 ${index % 2 === 0 ? 'pr-8 lg:pr-12 text-right' : 'pl-8 lg:pl-12 text-left'}`}
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                                         <div className="bg-card border border-border/50 dark:border-border/30 rounded-xl p-5 lg:p-6 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:border-primary/30 dark:hover:border-primary/40">
                       <motion.div
                         className="flex items-center gap-3 mb-2"
                         whileHover={{ scale: 1.05 }}
                       >
                         <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                         <h3 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                           {item.title}
                         </h3>
                       </motion.div>
                       <p className="text-muted-foreground dark:text-muted-foreground/90 leading-relaxed text-base lg:text-lg">
                         {item.description}
                       </p>
                       
                       {/* Interactive Badge */}
                       <motion.div 
                         className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/80 rounded-full text-sm font-medium border border-primary/20 dark:border-primary/30"
                         whileHover={{ 
                           scale: 1.05,
                           backgroundColor: "hsl(var(--primary) / 0.2)"
                         }}
                         transition={{ type: "spring", stiffness: 400 }}
                       >
                         <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                         {index === 0 ? "🚀 Active" : 
                          index === 1 ? "🧠 Learning" :
                          index === 2 ? "🏆 Certified" : "🎯 Building"}
                       </motion.div>
                     </div>
                  </motion.div>

                  {/* Timeline Node */}
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full border-4 border-background dark:border-background shadow-lg flex items-center justify-center z-10"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 1.2 + (index * 0.1),
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <motion.div
                      className="text-primary-foreground font-bold text-lg lg:text-xl"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      {index + 1}
                    </motion.div>
                  </motion.div>

                  {/* Empty Space for Layout */}
                  <div className="w-5/12" />
                </motion.div>
              ))}
            </div>

            {/* Floating Elements - Hidden on small screens */}
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full blur-xl hidden lg:block"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-16 h-16 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-xl hidden lg:block"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>

                                           {/* Journey Summary */}
            <motion.div 
              className="mt-8 md:mt-12 text-center p-5 md:p-6 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-2xl border border-primary/20 dark:border-primary/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">🎯 What's Next?</h3>
              <p className="text-muted-foreground dark:text-muted-foreground/90 max-w-2xl mx-auto text-sm md:text-base">
                Continuing to lead Bunkify, diving deeper into AI/ML with Andrew Ng's courses, 
                and building innovative solutions that make a difference. The journey never ends! 🚀
              </p>
            </motion.div>

            
        </motion.section>
    </div>
  );
} 