import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";
import AnimatedBackground from "@/components/animated-background";
import Chatbot from "@/components/chatbot";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: "Rakshit Jain - Portfolio",
  description: "Full Stack Developer & AI Enthusiast",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AnimatedBackground />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
              <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
                <p className="text-sm text-muted-foreground">
                  © {currentYear} Rakshit Jain. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <a href="mailto:rakshitgang23@gmail.com" className="hover:text-foreground transition-colors">
                    rakshitgang23@gmail.com
                  </a>
                  <a href="tel:+917014518699" className="hover:text-foreground transition-colors">
                    +91 7014518699
                  </a>
                  <span>Jaipur, India</span>
                </div>
              </div>
            </div>
          </footer>
          <SmoothScroll />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
