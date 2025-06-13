"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ResumePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the screen width is for mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="container py-12 md:py-24">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Resume
      </motion.h1>

      <div className="flex flex-col items-center gap-8">
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-center mb-6">
            <Link
              href="/resume.pdf"
              target="_blank"
              download
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-base font-medium shadow transition-colors hover:bg-primary/90"
            >
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Link>
          </div>

          <div className="border rounded-lg overflow-hidden bg-card shadow-lg">
            {isMobile ? (
              <div className="p-6 text-center">
                <p className="text-muted-foreground mb-4">
                  Resume preview is not available on mobile devices for better performance.
                </p>
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-md bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium"
                >
                  Open Resume in New Tab
                </Link>
              </div>
            ) : (
              <div className="aspect-[8.5/11] w-full bg-muted">
                <iframe
                  src="/resume.pdf#toolbar=0"
                  className="w-full h-full"
                  style={{ minHeight: "80vh" }}
                />
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="w-full max-w-3xl mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">Skills Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Frontend Development</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Next.js & React</li>
                <li>Framer Motion</li>
                <li>Responsive Design</li>
                <li>UI/UX Principles</li>
                <li>TypeScript</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Backend Development</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Node.js</li>
                <li>FastAPI</li>
                <li>Database Management</li>
                <li>RESTful APIs</li>
                <li>Authentication & Security</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Mobile Development</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Flutter</li>
                <li>Dart</li>
                <li>Cross-platform Development</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Other Skills</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Version Control (Git)</li>
                <li>Cloud Deployment</li>
                <li>Problem Solving</li>
                <li>Team Collaboration</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 