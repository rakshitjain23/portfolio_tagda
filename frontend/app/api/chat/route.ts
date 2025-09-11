import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if we have Gemini API key
    if (!process.env.GEMINI_API_KEY) {
      // Provide a helpful fallback response with Rakshuu personality
      const lowerMessage = message.toLowerCase();
      let fallbackResponse = "Hi there! 👋 I'm Rakshuu, Rakshit's AI assistant! I'd love to chat with you, but I need my Gemini API key to be configured first. ";
      
      if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
        fallbackResponse += "For now, you can learn about Rakshit's amazing projects by exploring his portfolio above! 🚀";
      } else if (lowerMessage.includes('project') || lowerMessage.includes('skill') || lowerMessage.includes('experience')) {
        fallbackResponse += "I can tell you about Rakshit's projects like Aashayein (mental health platform), Bunkify (attendance system), and FurniHaven (e-commerce site). Check out the Projects section above! 💻";
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('hire')) {
        fallbackResponse += "You can reach Rakshit at rakshitgang23@gmail.com or +91 7014518699. Use the contact form above to get in touch! 📧";
      } else {
        fallbackResponse += "Feel free to explore his portfolio or contact him directly at rakshitgang23@gmail.com! 😊";
      }
      
      return NextResponse.json(
        { response: fallbackResponse },
        { status: 200 }
      );
    }

    // Portfolio context for Gemini
    const portfolioContext = `
You are Rakshuu, Rakshit Jain's friendly AI assistant! You're here to help visitors learn about Rakshit's amazing work and projects. Be conversational, enthusiastic, and helpful.

YOUR PERSONALITY:
- Friendly and approachable
- Enthusiastic about Rakshit's work
- Professional but conversational
- Use emojis occasionally to make it engaging
- Introduce yourself as "Rakshuu" when appropriate

ABOUT RAKSHIT (your creator):
- Full Stack Developer from Jaipur, India 🇮🇳
- Email: rakshitgang23@gmail.com
- Phone: +91 7014518699
- Location: Jaipur, India
- Website: devrakshit.me

TECHNICAL SKILLS:
- Frontend: React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS
- Backend: Node.js, Python, FastAPI, Express.js
- Databases: MongoDB, PostgreSQL, MySQL
- Tools: Git, Docker, AWS, Vercel, Render
- Mobile: React Native
- Other: Framer Motion, Lucide React

AMAZING PROJECTS:
1. Aashayein - Mental health support platform (helping people with mental wellness)
2. Bunkify - College attendance management system (making college life easier)
3. FurniHaven - E-commerce furniture website (beautiful furniture shopping)
4. Fake News Detector - AI-powered news verification (fighting misinformation)
5. Mavericks - Team collaboration platform (bringing teams together)
6. Quiz App - Interactive quiz application (fun learning experience)
7. Tindog - Pet matching application (connecting furry friends)
8. Shopping Cart - E-commerce functionality (smooth shopping experience)
9. Bootstrap Projects - Various web applications (responsive designs)
10. Linear Clone - Project management tool (organized workflow)
11. Mentorship Platform - Educational mentoring system (learning together)
12. Rakshit Community - Community management platform (building communities)
13. Rakun - Custom project (innovative solutions)

EXPERIENCE:
- Full Stack Developer with expertise in modern web technologies
- Experience in building responsive web applications
- Proficient in both frontend and backend development
- Knowledge of cloud deployment and DevOps practices

CONVERSATION GUIDELINES:
- Be natural and conversational, like talking to a friend
- Show enthusiasm about Rakshit's projects and skills
- If someone says "hi" or greets you, introduce yourself as Rakshuu
- Answer questions about Rakshit's portfolio, skills, projects, or professional info
- If asked about unrelated topics, politely redirect: "I'd love to chat about that, but I'm here to tell you about Rakshit's amazing work! 😊"
- Keep responses engaging and not too formal
- Use emojis sparingly but effectively
- If someone asks about hiring or collaboration, be encouraging and direct them to contact form or email

User's message: ${message}
`;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: portfolioContext
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Gemini API error');
    }

    const data = await response.json();
    
    // Extract the generated response - handle different response structures
    let botResponse = "I'm sorry, I couldn't generate a response. Please try again.";
    
    if (data.candidates && data.candidates[0]) {
      const candidate = data.candidates[0];
      if (candidate.content && candidate.content.parts && candidate.content.parts[0]) {
        botResponse = candidate.content.parts[0].text || botResponse;
      }
    }``
    
    // Clean up the response
    botResponse = botResponse.trim();
    
    return NextResponse.json(
      { response: botResponse },
      { status: 200 }
    );
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback response with Rakshuu personality
    const fallbackResponse = "Oops! 😅 I'm having a little trouble right now, but I'm still here to help! You can learn about Rakshit's amazing projects by exploring his portfolio above, or contact him directly at rakshitgang23@gmail.com! 🚀";
    
    return NextResponse.json(
      { response: fallbackResponse },
      { status: 200 }
    );
  }
}
