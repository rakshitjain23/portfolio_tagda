"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink, FileText, Monitor, Smartphone } from "lucide-react";
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
        My Resume
      </motion.h1>

      <div className="flex flex-col items-center gap-8">
        {/* Download Section */}
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <Link
              href="/resume.pdf"
              target="_blank"
              download
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-base font-medium shadow transition-all hover:bg-primary/90 hover:scale-105"
            >
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Link>
            <Link
              href="/resume.pdf"
              target="_blank"
              className="inline-flex items-center justify-center rounded-md bg-secondary text-secondary-foreground px-6 py-3 text-base font-medium shadow transition-all hover:bg-secondary/90 hover:scale-105"
            >
              <ExternalLink className="mr-2 h-4 w-4" /> Open in New Tab
            </Link>
          </div>

          {/* Resume Preview Section */}
          <div className="border rounded-lg overflow-hidden bg-card shadow-lg">
            {isMobile ? (
              <motion.div 
                className="p-8 text-center bg-gradient-to-br from-primary/5 to-secondary/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">Resume Preview</h3>
                    <p className="text-muted-foreground max-w-md">
                      For the best viewing experience, please open the resume on a desktop device or download it to view offline.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Smartphone className="h-4 w-4" />
                    <span>Mobile devices may not display PDFs optimally</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <Link
                      href="/resume.pdf"
                      target="_blank"
                      className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium shadow transition-all hover:bg-primary/90"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Open Resume
                    </Link>
                    <Link
                      href="/resume.pdf"
                      download
                      className="inline-flex items-center justify-center rounded-md bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium shadow transition-all hover:bg-secondary/90"
                    >
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="aspect-[8.5/11] w-full bg-muted relative rounded-lg overflow-hidden border-2 border-primary/20 shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Resume Container with proper styling */}
                <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm">
                  <iframe
                    src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                    className="w-full h-full border-0"
                    title="Rakshit Jain Resume"
                  />
                </div>
                
                {/* Top border decoration */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40"></div>
                
                {/* Corner decorations */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-primary/40 rounded-tl"></div>
                <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-primary/40 rounded-tr"></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-primary/40 rounded-bl"></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-primary/40 rounded-br"></div>
                
                {/* Desktop indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded border border-primary/20">
                  <Monitor className="h-3 w-3" />
                  <span>Desktop View</span>
                </div>
                
                {/* Resume label */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded border border-primary/20">
                  <FileText className="h-3 w-3" />
                  <span>Resume.pdf</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          className="w-full max-w-4xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="p-6 rounded-lg border bg-card shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <p className="text-muted-foreground mb-4">
              Interested in working together? Feel free to reach out for collaborations, job opportunities, or just to say hello!
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-2 text-sm font-medium shadow transition-all hover:bg-primary/90"
              >
                Contact Me
              </Link>
              <Link
                href="mailto:rakshitgang23@gmail.com"
                className="inline-flex items-center justify-center rounded-md bg-secondary text-secondary-foreground px-6 py-2 text-sm font-medium shadow transition-all hover:bg-secondary/90"
              >
                Send Email
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 