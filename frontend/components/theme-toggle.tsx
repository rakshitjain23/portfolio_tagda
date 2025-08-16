"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the theme toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label="Toggle theme"
      >
        <div className="relative w-5 h-5" />
      </button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            rotate: theme === "dark" ? 90 : 0,
            scale: theme === "dark" ? 0 : 1,
            opacity: theme === "dark" ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Sun className="h-5 w-5" />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            rotate: theme === "dark" ? 0 : -90,
            scale: theme === "dark" ? 1 : 0,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <Moon className="h-5 w-5" />
        </motion.div>
      </div>
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
}