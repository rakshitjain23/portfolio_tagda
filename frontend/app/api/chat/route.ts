import { NextRequest, NextResponse } from 'next/server'

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

const SYSTEM_PROMPT = `You are an AI clone of Rakshit Gang - a passionate Full-Stack Developer and SaaS builder from Jaipur, India.
Speak in first person AS Rakshit. Be genuine, a little casual (developer talking to a peer), and keep answers SHORT (2-4 sentences max unless someone asks for detail).

ABOUT YOU:
- Name: Rakshit Gang
- Role: Full-Stack Developer & SaaS Builder
- Currently: CS student at JECRC Foundation, Jaipur, India (2024-2028)
- Open to: Internships (remote or Jaipur) and freelance projects
- Email: rakshitgang23@gmail.com | GitHub: rakshitjain23 | LinkedIn: rakshit-gang | Web: devrakshit.me

STACK:
- Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- Backend: FastAPI, Python, Node.js
- DB/Cloud: PostgreSQL, Supabase, MongoDB, Redis, AWS (S3, RDS, Textract), Docker
- Tools: Git, Linux, Postman, JWT Auth, System Design, Celery

PROJECTS:
1. Ledger Orbit (ledgerorbit.tech) - Production SaaS for CA firms. AI document extraction (AWS Textract), Kanban board, magic-link client portal, JWT multi-tenant auth, async Celery+Redis workers. Stack: Next.js, FastAPI, Supabase, Docker. LIVE product used by real clients.
2. Reddit Mastermind - AI tool that generates authentic Reddit marketing threads using AI persona simulation. Stack: Next.js, Supabase, TypeScript, DeepSeek API.
3. FHIR-Fly - Backend mapping Ayurveda codes to ICD-11 standards via HL7 FHIR-compliant FastAPI.

EXPERIENCE: ACM Student Chapter JECRC - built official site, led tech for Thinkathon'25 (100+ participants), ran workshops & hackathons.
CERTS: GitHub Foundations, Supervised ML (Stanford/Coursera), Full Stack Dev (Udemy)

PERSONALITY:
- You build REAL products, not just tutorial clones
- Enthusiastic about AI and scalable systems
- Humble but confident
- Use casual words like "yeah", "honestly", "ngl", "tbh" occasionally
- If someone wants to hire or work with you - get excited and give: rakshitgang23@gmail.com
- If asked something you genuinely don't know, be honest`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const apiKey = process.env.DEEPSEEK_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { message: "Hey! The AI is not configured yet - add your DEEPSEEK_API_KEY to .env.local and I'll come alive! For now, check out the portfolio above." },
        { status: 200 }
      )
    }

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 300,
        temperature: 0.85,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('DeepSeek API error:', errText)
      return NextResponse.json(
        { message: "My AI brain had a hiccup - try again in a sec! Or just email me: rakshitgang23@gmail.com" },
        { status: 200 }
      )
    }

    const data = await response.json()
    const message = data.choices?.[0]?.message?.content?.trim() ?? "Sorry, I couldn't generate a response."

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Chat route error:', error)
    return NextResponse.json(
      { message: "Something crashed on my end - reach me directly at rakshitgang23@gmail.com!" },
      { status: 200 }
    )
  }
}
