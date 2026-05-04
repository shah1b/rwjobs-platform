import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { supabase } from '../../lib/supabase';

export const AgentPanel = () => {
  const { user } = useStore();
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hey ${user?.email?.split('@')[0] || 'there'}! 👋 I'm your AI job-hunting agent. I'm scanning 50+ platforms to find the perfect remote opportunities tailored to your profile. What are you looking for today?` }
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
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { 
          messages: newMessages,
          user: user // Pass user metadata for resume context
        }
      });

      if (error) throw error;
      
      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting right now. Please check your internet or try again later." }]);
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="panel" style={{ height: 'calc(100vh - 120px)' }}>
      <div className="chat-container">
        <div className="chat-header">
          <div className="logo-mark" style={{ width: 32, height: 32 }}>
            <Bot size={18} color="#06070D" />
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700 }}>RemoteHunt AI Agent</h3>
            <p style={{ fontSize: 11, color: 'var(--txt2)' }}>Powered by GPT-4o · Scanning 50+ platforms</p>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.role}`}>
              <div className="msg-bubble">{msg.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="msg ai">
              <div className="msg-bubble" style={{ opacity: 0.7 }}>
                <span className="typing-dots">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <input 
              className="chat-inp" 
              placeholder="Ask about remote jobs, salary, companies…" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isTyping}
            />
            <button 
              className="btn-primary" 
              style={{ borderRadius: '50%', width: 42, height: 42, padding: 0, justifyContent: 'center' }} 
              onClick={() => handleSend()}
              disabled={isTyping || !input.trim()}
            >
              <Send size={16} />
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {['Find high-paying Design jobs', 'Remote companies in Europe', 'Salary for Senior Product Manager'].map((q, i) => (
              <button 
                key={i} 
                className="btn-secondary" 
                style={{ fontSize: 11, padding: '6px 12px', whiteSpace: 'nowrap' }}
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
