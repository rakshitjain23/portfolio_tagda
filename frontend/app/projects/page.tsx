"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

// Project categories
const categories = ["All", "Web", "Mobile", "AI"];

// Project data
const projects = [
  {
    id: 1,
    title: "Bunkify",
    description: "Currently working on a smart attendance tracker & bunk planner for students. Built with Next.js, Tailwind CSS, and Framer Motion. Features AI-powered attendance insights and Google Drive integration.",
    category: "Web",
    image: "/projects/bunkify.png",
    github: "https://github.com/rakshitjain23/bunkify",
    demo: "https://bunkify.netlify.app",
    technologies: ["Next.js 15", "React 19", "Tailwind CSS", "Framer Motion", "AI"],
    featured: false,
  },
  {
    id: 2,
    title: "Fake News Prediction Model",
    description: "Machine learning model using Logistic Regression to classify news articles as Real or Fake. Achieved 95.28% accuracy with TF-IDF vectorization and NLTK preprocessing.",
    category: "AI",
    image: "/projects/fakenews.png",
    github: "https://github.com/rakshitjain23/Fake-News-Prediction",
    demo: null,
    technologies: ["Python", "Scikit-learn", "NLTK", "NumPy", "Pandas", "Logistic Regression"],
  },
  {
    id: 3,
    title: "Linear Regression from Scratch",
    description: "Implemented Linear Regression for house price predictionusing only NumPy and Matplotlib, based on Week 1 of Andrew Ng's Machine Learning Course. Features gradient descent and custom cost function.",
    category: "AI",
    image: "/projects/linear.png",
    github: "https://github.com/rakshitjain23/linear-regression",
    demo: null,
    technologies: ["Python", "NumPy", "Matplotlib", "Machine Learning", "Andrew Ng Course"],
  },
  {
    id: 4,
    title: "Aashayein",
    description: "Website for college social club - The Life Saviours.",
    category: "Web",
    image: "/projects/aashayein.png",
    github: null,
    demo: "https://www.thelifesaviours.org/",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 5,
    title: "Rakshit Communication",
    description: "Website for an electronics shop with modern design.",
    category: "Web",
    image: "/projects/rakshit-comm.png",
    github: "https://github.com/rakshitjain23/rakshit_communication",
    demo: "https://rakshitjain23.github.io/rakshit_communication/",
    technologies: ["TypeScript", "Next.js", "React"],
  },
  {
    id: 6,
    title: "Rakun Voice Assistant",
    description: "A smart voice assistant powered by Google Gemini AI.",
    category: "AI",
    image: "/projects/rakun.png",
    github: "https://github.com/rakshitjain23/rakun-voice-assistant",
    demo: null,
    technologies: ["Dart", "Flutter", "Google Gemini AI"],
  },
  {
    id: 7,
    title: "FurniHaven Website",
    description: "A modern furniture e-commerce website with beautiful UI.",
    category: "Web",
    image: "/projects/furnihaven.png",
    github: "https://github.com/rakshitjain23/furnihaven-website",
    demo: "https://rakshitjain23.github.io/furnihaven-website/",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 8,
    title: "MentorshipPro",
    description: "An educational platform for mentorship and learning.",
    category: "Web",
    image: "/projects/mentorship.png",
    github: "https://github.com/rakshitjain23/mentorship-pro",
    demo: "https://rakshitjain23.github.io/mentorship-pro/",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 9,
    title: "Mavericks",
    description: "Smart India Hackathon project website.",
    category: "Web",
    image: "/projects/mavericks.png",
    github: "https://github.com/rakshitjain23/mavericks",
    demo: "https://rakshitjain23.github.io/mavericks/",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 10,
    title: "Quiz App",
    description: "An interactive quiz application with Flutter.",
    category: "Mobile",
    image: "/projects/quiz.png",
    github: "https://github.com/rakshitjain23/Quiz-App",
    demo: null,
    technologies: ["Dart", "Flutter"],
  },
  {
    id: 11,
    title: "Shopping Cart App",
    description: "A shopping cart application with state management in Flutter.",
    category: "Mobile",
    image: "/projects/shopping.png",
    github: "https://github.com/rakshitjain23/Shopping-Cart-App",
    demo: null,
    technologies: ["Dart", "Flutter"],
  },
  {
    id: 12,
    title: "Bootstrap Website",
    description: "My first website built during Angela Yu's Web Development course.",
    category: "Web",
    image: "/projects/bootstrap.png",
    github: "https://github.com/rakshitjain23/bootstrap",
    demo: "https://rakshitjain23.github.io/bootstrap/",
    technologies: ["HTML", "CSS", "Bootstrap"],
  },
  {
    id: 13,
    title: "TinDog Website",
    description: "A fun website for dog lovers, built during web development learning.",
    category: "Web",
    image: "/projects/tindog.png",
    github: "https://github.com/rakshitjain23/tindog",
    demo: "https://rakshitjain23.github.io/tindog/",
    technologies: ["HTML", "CSS", "Bootstrap"],
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="container py-12 md:py-24">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h1>

      {/* Filter Buttons */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <AnimatePresence mode="wait">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="relative h-full w-full bg-muted">
                  {/* Fallback content if image doesn't exist */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground">{project.title}</span>
                  </div>
                  
                  {/* Project image with error handling */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center"
                    onError={(e) => {
                      // Hide the image on error and show the fallback
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      <FaGithub className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 