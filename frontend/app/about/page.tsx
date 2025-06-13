"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaReact, FaNodeJs, FaGithub, FaPython } from "react-icons/fa";
import { SiNextdotjs, SiFramer, SiVercel, SiFlutter, SiFastapi, SiCplusplus } from "react-icons/si";

// Timeline data
const timeline = [
  {
    title: "AI & DSA Development",
    description: "Learning Data Structures & Algorithms and diving into AI development. Working on Python and C++ projects.",
  },
  {
    title: "Advanced Projects",
    description: "Developed Rakun Voice Assistant (AI-powered), Quiz App (Flutter), and Shopping Cart App (Flutter).",
  },
  {
    title: "Smart India Hackathon",
    description: "Created Mavericks website for the hackathon competition.",
  },
  {
    title: "Web Development Journey",
    description: "Started with Angela Yu&apos;s course. Built Bootstrap website, TinDog, FurniHaven, and MentorshipPro.",
  },
  {
    title: "Business & Social Impact",
    description: "Developed Rakshit Communication website and Aashayein - The Life Saviours for college social club.",
  },
];

// Skills data
const skills = [
  { name: "Next.js", icon: <SiNextdotjs className="h-6 w-6" /> },
  { name: "React", icon: <FaReact className="h-6 w-6" /> },
  { name: "Node.js", icon: <FaNodeJs className="h-6 w-6" /> },
  { name: "Python", icon: <FaPython className="h-6 w-6" /> },
  { name: "C++", icon: <SiCplusplus className="h-6 w-6" /> },
  { name: "Flutter", icon: <SiFlutter className="h-6 w-6" /> },
  { name: "FastAPI", icon: <SiFastapi className="h-6 w-6" /> },
  { name: "Framer Motion", icon: <SiFramer className="h-6 w-6" /> },
  { name: "Vercel", icon: <SiVercel className="h-6 w-6" /> },
  { name: "GitHub", icon: <FaGithub className="h-6 w-6" /> },
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
          <h2 className="text-2xl font-bold">Hi, I'm Rakshit Jain</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              I'm a Full Stack Developer and AI Enthusiast with a passion for building modern, scalable applications.
            </p>
            <p>
              I specialize in Next.js, React, Node.js, Python, and C++. Currently learning Data Structures & Algorithms and diving into AI development.
            </p>
            <p>
              When I'm not coding, you can find me playing chess, solving coding challenges, or contributing to open source projects.
            </p>
            <p>Rakshit&apos;s journey in tech started with Angela Yu&apos;s Udemy course.</p>
            <p>He&apos;s always eager to learn and grow.</p>
            <p>Rakshit&apos;s portfolio is a testament to his passion and dedication.</p>
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
        <h2 className="text-2xl font-bold mb-8">Skills & Technologies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              custom={index}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              {skill.icon}
              <span className="font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-8">My Journey</h2>
        <div className="relative border-l border-primary/20 pl-8 ml-4 space-y-12">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <div className="absolute -left-[41px] flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
} 