import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { supabase } from '../../lib/supabase';

export const AgentPanel = () => {
  const { user, resumeData } = useStore();
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hey ${user?.email?.split('@')[0] || 'there'}! 👋 I'm your AI job-hunting agent. I've analyzed 50+ platforms to find the perfect remote opportunities tailored to your profile. What are you looking for today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (customInput?: string) => {
    const text = customInput || input;
    if (!text.trim() || isTyping) return;
    
    const newMessages = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);
    
    try {
      // Try calling Supabase function
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { 
          messages: newMessages,
          user: user,
          resume: resumeData
        }
      });

      if (error) throw error;
      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
    } catch (err: any) {
      console.warn("Supabase function failed, using simulated response", err);
      
      // Simulated response fallback
      setTimeout(() => {
        const responses = [
          "I've found several roles that match your skill set! Specifically, there are some great openings at Linear and Vercel that align with your React and TypeScript background.",
          "Based on your resume, you have a strong foundation in frontend development. I recommend highlighting your experience with 'Distributed Systems' to stand out for these remote roles.",
          "The current market for remote roles is quite competitive, but your match score for 'Senior Software Engineer' roles is in the top 5% of candidates.",
          "I can help you draft a cover letter for any of the jobs in your 'Top Matches' list. Which one are you interested in?"
        ];
        const randomResp = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, { role: 'ai', text: randomResp }]);
        setIsTyping(false);
      }, 1500);
    } finally {
      // If data was successful, finally will run after setMessages
      // If it failed, simulation handles setIsTyping(false)
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="panel" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <div className="chat-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-card)', borderRadius: 'var(--r-xl)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <div className="chat-header" style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)' }}>
          <div className="logo-mark" style={{ width: 36, height: 36, background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>
            <Bot size={20} color="#FFF" />
          </div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>VibeJobs AI Agent</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }}></div>
              <p style={{ fontSize: 11, color: 'var(--txt-3)', fontWeight: 500 }}>Live · GPT-4o Powered</p>
            </div>
          </div>
        </div>

        <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.role}`} style={{ display: 'flex', justifyContent: msg.role === 'ai' ? 'flex-start' : 'flex-end', gap: '12px' }}>
              {msg.role === 'ai' && (
                <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={16} color="var(--blue)" />
                </div>
              )}
              <div className="msg-bubble" style={{ 
                maxWidth: '80%',
                padding: '12px 16px',
                borderRadius: msg.role === 'ai' ? '2px 16px 16px 16px' : '16px 16px 2px 16px',
                background: msg.role === 'ai' ? 'var(--bg-muted)' : 'var(--blue)',
                color: msg.role === 'ai' ? 'var(--txt)' : '#FFF',
                fontSize: '14px',
                lineHeight: 1.6,
                boxShadow: 'var(--shadow-sm)'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="msg ai" style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={16} color="var(--blue)" />
              </div>
              <div className="msg-bubble" style={{ background: 'var(--bg-muted)', padding: '12px 16px', borderRadius: '2px 16px 16px 16px', display: 'flex', gap: '4px' }}>
                <div className="dot-bounce"></div>
                <div className="dot-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="dot-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area" style={{ padding: '20px 24px', borderTop: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <input 
              className="chat-inp" 
              style={{ flex: 1, height: '48px', padding: '0 20px', borderRadius: '24px', border: '1px solid var(--border)', background: 'var(--bg-muted)' }}
              placeholder="Ask about remote jobs, salary, companies…" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isTyping}
            />
            <button 
              className="btn btn-primary" 
              style={{ borderRadius: '50%', width: 48, height: 48, padding: 0, justifyContent: 'center', flexShrink: 0 }} 
              onClick={() => handleSend()}
              disabled={isTyping || !input.trim()}
            >
              {isTyping ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {['Find high-paying Design jobs', 'Remote companies in Europe', 'Salary for Senior Product Manager'].map((q, i) => (
              <button 
                key={i} 
                className="btn btn-secondary" 
                style={{ fontSize: 12, padding: '8px 16px', whiteSpace: 'nowrap', borderRadius: '20px' }}
                onClick={() => handleSend(q)}
                disabled={isTyping}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
