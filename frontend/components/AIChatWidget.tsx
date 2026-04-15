'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, Bot, User, Zap } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_QUESTIONS = [
  "What's Ledger Orbit?",
  "Are you open to hire?",
  "What's your stack?",
  "Tell me something crazy you built",
]

export default function AIChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! I'm an AI version of Rakshit - ask me anything about my projects, stack, or if you want to work together 🚀",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [pulsing, setPulsing] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
      setPulsing(false)
    }
  }, [open])

  const sendMessage = async (text?: string) => {
    const userText = (text ?? input).trim()
    if (!userText || loading) return

    const userMsg: Message = { role: 'user', content: userText }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message ?? 'Something went wrong.' },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Network error - try again!' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="flex items-center gap-2 bg-[#0f0f1a]/90 border border-violet-500/30 backdrop-blur-xl px-3 py-2 rounded-full text-xs text-violet-300 font-medium shadow-xl"
            >
              <Sparkles size={12} className="text-violet-400" />
              Chat with AI Rakshit
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          id="ai-chat-trigger"
          onClick={() => setOpen((o) => !o)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-violet-500/40"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
          }}
        >
          {pulsing && (
            <span className="absolute inset-0 rounded-full animate-ping bg-violet-500 opacity-30" />
          )}
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={22} className="text-white" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Bot size={22} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="ai-chat-panel"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] flex flex-col"
            style={{
              background: 'rgba(10,10,20,0.97)',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: '1.25rem',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 25px 80px rgba(124,58,237,0.25), 0 0 0 1px rgba(124,58,237,0.1)',
              maxHeight: '520px',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center flex-shrink-0">
                <Zap size={14} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-none">AI Rakshit</p>
                <p className="text-[11px] text-violet-400/80 mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Powered by DeepSeek
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 no-scrollbar" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    msg.role === 'assistant'
                      ? 'bg-violet-500/20 border border-violet-500/30'
                      : 'bg-white/10 border border-white/15'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <Bot size={11} className="text-violet-400" />
                    ) : (
                      <User size={11} className="text-white/60" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === 'assistant'
                        ? 'bg-white/[0.05] text-white/85 rounded-tl-sm border border-white/[0.07]'
                        : 'bg-violet-600/80 text-white rounded-tr-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-violet-500/20 border border-violet-500/30">
                    <Bot size={11} className="text-violet-400" />
                  </div>
                  <div className="bg-white/[0.05] border border-white/[0.07] px-4 py-2.5 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-violet-400"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggested questions (only on first message) */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="text-[11px] px-2.5 py-1.5 rounded-full border border-violet-500/25 text-violet-300/80 hover:border-violet-500/50 hover:text-violet-200 transition-all bg-violet-500/[0.07] hover:bg-violet-500/15"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input bar */}
            <div className="flex items-center gap-2 px-3 py-3 border-t border-white/[0.06]">
              <input
                ref={inputRef}
                id="ai-chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-white/90 placeholder-white/25 outline-none focus:border-violet-500/40 focus:bg-violet-500/[0.06] transition-all"
                disabled={loading}
              />
              <button
                id="ai-chat-send"
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:from-violet-400 hover:to-violet-600 transition-all disabled:cursor-not-allowed shadow-lg shadow-violet-500/25"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
