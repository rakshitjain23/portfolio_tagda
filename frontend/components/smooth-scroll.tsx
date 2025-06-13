"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    // Add smooth scrolling to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute("href");
      
      if (!targetId) return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        
        // Update URL but without scrolling
        window.history.pushState(null, "", targetId);
      }
    };
    
    internalLinks.forEach((link) => {
      link.addEventListener("click", smoothScroll);
    });
    
    return () => {
      internalLinks.forEach((link) => {
        link.removeEventListener("click", smoothScroll);
      });
    };
  }, []);
  
  return null;
} 