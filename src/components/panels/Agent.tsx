import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const AgentPanel = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hey Hasan! 👋 I'm your AI job-hunting agent. I'm scanning 50+ platforms to find the perfect remote opportunities tailored to your Brand Designer profile. What are you looking for today?" }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `I've analyzed your request for "${input}". I'm seeing a surge in senior design roles at series-B startups. Would you like me to filter for those with $100k+ salaries?` 
      }]);
    }, 1000);
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
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <div style={{ display: 'flex', gap: 10 }}>
            <input 
              className="chat-inp" 
              placeholder="Ask about remote jobs, salary, companies…" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="btn-primary" style={{ borderRadius: '50%', width: 42, height: 42, padding: 0, justifyContent: 'center' }} onClick={handleSend}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
