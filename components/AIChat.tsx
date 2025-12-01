/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Shield, Cpu, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

// Cast motion components to allow props like initial, animate, etc. without TS errors
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi, I'm Lumi. I'm here to light the way. ✨" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // State to manage the onboarding flow
  const [showOptions, setShowOptions] = useState(true);
  const [showChips, setShowChips] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, showOptions, showChips]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    // Hide initial options if user manually types something
    if (showOptions) setShowOptions(false);
    
    const userMessage: ChatMessage = { role: 'user', text: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Slight delay to allow state update to render before scrolling
    setTimeout(scrollToBottom, 100);

    const responseText = await sendMessageToGemini(text);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleOptionSelect = (type: 'parent' | 'tech') => {
    setShowOptions(false);
    
    if (type === 'parent') {
      const userText = "I'm looking to protect my child online.";
      const modelResponse = "I'm the digital guardian here at Jill.ai! 🛡️ You can ask me anything about what we do!";
      
      setMessages(prev => [
        ...prev, 
        { role: 'user', text: userText },
        { role: 'model', text: modelResponse }
      ]);
    } else {
      const userText = "I'm interested in the technology.";
      const modelResponse = "I can tell you how we use Edge AI and Zero-Knowledge Proofs to fix the internet. ⚡ Ask me anything about our architecture!";
      
      setMessages(prev => [
        ...prev, 
        { role: 'user', text: userText },
        { role: 'model', text: modelResponse }
      ]);
    }

    // Show suggested questions after selection
    setShowChips(true);
  };

  const chips = [
    "What is IOkT?",
    "Is this spyware?",
    "How does the Neural Keyboard work?",
    "Tell me about the Founder.",
    "How do I join the Waitlist?"
  ];

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[90vw] md:w-[400px] bg-[#0f1014]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-[#00f2ea]/20 flex flex-col max-h-[600px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0f1014] to-[#050507] p-4 flex justify-between items-center border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#00f2ea] blur-lg opacity-40 animate-pulse" />
                  <Sparkles className="w-5 h-5 text-[#00f2ea] relative z-10" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white tracking-wider text-sm">LUMI (JILL.AI)</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors" data-hover="true">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth min-h-[300px]"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#00f2ea] text-black font-medium rounded-tr-none shadow-lg shadow-[#00f2ea]/10'
                        : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Initial Options */}
              {showOptions && !isLoading && (
                <div className="flex flex-col gap-2 mt-2 animate-fade-in-up">
                  <button 
                    onClick={() => handleOptionSelect('parent')}
                    className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#00f2ea]/10 hover:border-[#00f2ea]/30 transition-all group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-[#6366f1]/20 p-2 rounded-lg text-[#6366f1]">
                        <Shield className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-gray-200 group-hover:text-white transition-colors">Looking to protect my child</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#00f2ea]" />
                  </button>
                  
                  <button 
                    onClick={() => handleOptionSelect('tech')}
                    className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#00f2ea]/10 hover:border-[#00f2ea]/30 transition-all group flex items-center justify-between"
                  >
                     <div className="flex items-center gap-3">
                      <div className="bg-[#00f2ea]/20 p-2 rounded-lg text-[#00f2ea]">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-gray-200 group-hover:text-white transition-colors">Interested in the technology</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#00f2ea]" />
                  </button>
                </div>
              )}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-lg rounded-tl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-[#00f2ea] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#00f2ea] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#00f2ea] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Chips (Suggested Questions) */}
            {showChips && !isLoading && !showOptions && (
              <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar mask-gradient-right">
                {chips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(chip)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#00f2ea] hover:bg-[#00f2ea] hover:text-black transition-colors shrink-0"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-black/40 shrink-0">
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask Lumi..."
                  className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00f2ea]/50 transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#00f2ea] p-3 rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  data-hover="true"
                >
                  <Send className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <MotionButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-[#00f2ea] to-[#6366f1] flex items-center justify-center shadow-lg shadow-[#00f2ea]/40 border border-white/20 z-50 group cursor-pointer"
        data-hover="true"
      >
        {isOpen ? (
          <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
        ) : (
          <div className="relative">
             <div className="absolute inset-0 bg-white blur-md opacity-40 animate-pulse" />
             <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10 group-hover:rotate-12 transition-transform" />
             {/* Notification Dot */}
             <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-black animate-ping" />
             <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-black" />
          </div>
        )}
      </MotionButton>
    </div>
  );
};

export default AIChat;
