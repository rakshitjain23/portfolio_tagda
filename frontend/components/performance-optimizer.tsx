"use client";

import { useEffect, useState } from "react";

export function usePerformanceOptimization() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Check for low power mode (battery saver)
    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        setIsLowPowerMode(battery.charging === false && battery.level < 0.2);
        
        battery.addEventListener("levelchange", () => {
          setIsLowPowerMode(battery.charging === false && battery.level < 0.2);
        });
      });
    }

    // Check for slow connection
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      if (connection && (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g")) {
        setIsLowPowerMode(true);
      }
    }

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return {
    isReducedMotion,
    isLowPowerMode,
    shouldReduceAnimations: isReducedMotion || isLowPowerMode,
  };
}

export function PerformanceOptimizedMotion({ 
  children, 
  fallback,
  ...props 
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  [key: string]: any;
}) {
  const { shouldReduceAnimations } = usePerformanceOptimization();

  if (shouldReduceAnimations && fallback) {
    return <>{fallback}</>;
  }

  return <div {...props}>{children}</div>;
} 