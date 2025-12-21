'use client';

import { useEffect, useState } from 'react';

export default function ChatBubble({ message, isUser }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div
      className={`
        flex items-end gap-3 mb-4
        ${isUser ? 'flex-row-reverse' : 'flex-row'}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        transition-all duration-500 ease-out
      `}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-shakespeare-400 to-aqua-teal flex items-center justify-center text-white text-xl shadow-lg shadow-shakespeare-400/30 ring-2 ring-shakespeare-300/50 animate-pulse">
          {message.agentIcon || '🤖'}
        </div>
      )}

      {/* Message bubble */}
      <div
        className={`
          relative max-w-md px-5 py-3
          ${isUser 
            ? 'bg-gradient-to-br from-royal-blue to-shakespeare-600 text-white rounded-3xl rounded-br-md' 
            : 'glassmorphism-strong text-shakespeare-950 rounded-3xl rounded-bl-md border border-shakespeare-300/50'
          }
          shadow-lg
          ${isUser ? 'shadow-royal-blue/20' : 'shadow-shakespeare-400/20'}
          animate-liquid-morph
          hover:scale-[1.02]
          transition-all duration-300
        `}
      >
        {/* Message content */}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>

        {/* Timestamp */}
        <span className={`
          text-xs mt-1 block
          ${isUser ? 'text-shakespeare-200' : 'text-shakespeare-600'}
        `}>
          {message.timestamp}
        </span>

        {/* Droplet accent for non-user messages */}
        {!isUser && (
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-shakespeare-400/60 rounded-full animate-ripple" />
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-royal-blue to-shakespeare-700 flex items-center justify-center text-white text-xl shadow-lg shadow-royal-blue/30">
          👤
        </div>
      )}
    </div>
  );
}
