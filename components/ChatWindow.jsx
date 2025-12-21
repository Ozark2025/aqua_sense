'use client';

import { useState, useRef, useEffect } from 'react';
import ChatBubble from './ChatBubble';

export default function ChatWindow({ activeAgent, messages, onSendMessage, onClearConversation }) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-gradient-to-br from-shakespeare-50 via-white to-shakespeare-100 relative overflow-hidden">
      {/* Animated wavy background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-shakespeare-300/30 to-transparent animate-wave" />
        <div className="absolute top-1/3 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-aqua-teal/30 to-transparent animate-wave" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-shakespeare-300/30 px-8 py-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Agent avatar with glow */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-shakespeare-400 to-aqua-teal flex items-center justify-center text-white text-2xl shadow-lg shadow-shakespeare-400/40 ring-4 ring-shakespeare-300/30">
                {activeAgent?.icon || '🤖'}
              </div>
              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-full bg-shakespeare-400/30 animate-ripple-3d" />
            </div>

            {/* Agent info */}
            <div>
              <h1 className="font-display text-xl font-bold text-shakespeare-950">
                {activeAgent?.name || 'Select an Agent'}
              </h1>
              <p className="text-sm text-shakespeare-700">
                {activeAgent?.description || 'Choose an AI agent to start chatting'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClearConversation}
              className="px-4 py-2 rounded-xl bg-shakespeare-200/50 hover:bg-shakespeare-300/50 text-shakespeare-900 text-sm font-medium transition-all duration-300 hover:scale-105"
            >
              🗑️ Clear
            </button>
            <button className="px-4 py-2 rounded-xl bg-shakespeare-200/50 hover:bg-shakespeare-300/50 text-shakespeare-900 text-sm font-medium transition-all duration-300 hover:scale-105">
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Animated wave line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-shakespeare-400 via-aqua-teal to-shakespeare-400 animate-water-flow" />
        </div>
      </header>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 relative z-10">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-float">
                {activeAgent?.icon || '🤖'}
              </div>
              <h3 className="font-display text-2xl font-bold text-shakespeare-900 mb-2">
                Ready to assist you!
              </h3>
              <p className="text-shakespeare-700">
                Start a conversation with {activeAgent?.name || 'the AI agent'}
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                message={message}
                isUser={message.isUser}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input area */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl border-t border-shakespeare-300/30 px-8 py-5">
        <div className={`
          relative flex items-center gap-3 p-2 rounded-full
          bg-shakespeare-100/50 border-2
          ${isFocused 
            ? 'border-shakespeare-400 shadow-lg shadow-shakespeare-400/20' 
            : 'border-shakespeare-300/30'
          }
          transition-all duration-300
        `}>
          {/* Ripple effect on focus */}
          {isFocused && (
            <div className="absolute inset-0 rounded-full bg-shakespeare-400/10 animate-ripple" />
          )}

          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={`Ask ${activeAgent?.name || 'the agent'} anything...`}
            className="flex-1 px-6 py-3 bg-transparent outline-none text-shakespeare-950 placeholder-shakespeare-600 font-medium"
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="
              w-12 h-12 rounded-full
              bg-gradient-to-br from-royal-blue to-shakespeare-600
              hover:from-shakespeare-500 hover:to-royal-blue
              disabled:from-shakespeare-300 disabled:to-shakespeare-400
              flex items-center justify-center
              text-white text-xl
              shadow-lg shadow-royal-blue/30
              hover:shadow-xl hover:shadow-royal-blue/50
              hover:scale-110
              disabled:scale-100 disabled:cursor-not-allowed
              transition-all duration-300
              relative overflow-hidden
              group
            "
          >
            <span className="relative z-10">💧</span>
            {/* Ripple on hover */}
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
          </button>
        </div>

        {/* Helper text */}
        <p className="text-xs text-shakespeare-600 mt-2 text-center">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>

      {/* Floating particles */}
      <div className="absolute bottom-40 left-20 w-4 h-4 rounded-full bg-shakespeare-400/20 animate-bubble pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-60 right-40 w-3 h-3 rounded-full bg-aqua-teal/20 animate-bubble pointer-events-none" style={{ animationDelay: '3s' }} />
    </div>
  );
}
