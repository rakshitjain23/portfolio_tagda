import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rakshit Gang - Full-Stack Developer',
  description:
    'Full-Stack Developer & SaaS Builder. I build production-grade web apps and SaaS products. Open to internships and freelance projects.',
  keywords: [
    'Rakshit Gang',
    'Full-Stack Developer',
    'SaaS Builder',
    'Next.js',
    'React',
    'TypeScript',
    'Jaipur',
    'India',
    'Freelance Developer',
    'Internship',
  ],
  authors: [{ name: 'Rakshit Gang', url: 'https://devrakshit.me' }],
  openGraph: {
    title: 'Rakshit Gang - Full-Stack Developer',
    description:
      'Full-Stack Developer & SaaS Builder. Open to internships and freelance projects.',
    url: 'https://devrakshit.me',
    siteName: 'Rakshit Gang Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rakshit Gang - Full-Stack Developer',
    description: 'Full-Stack Developer & SaaS Builder.',
  },
  metadataBase: new URL('https://devrakshit.me'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth`}>
      <body className={`${plusJakarta.className} antialiased bg-[#0a0a0f] text-[#f0f0fa]`}>
        {children}
      </body>
    </html>
  )
}
