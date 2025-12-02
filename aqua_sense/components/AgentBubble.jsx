'use client';

import { useState } from 'react';

export default function AgentBubble({ agent, isActive, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const getAgentIcon = (type) => {
    const icons = {
      decision: '🧠',
      simulation: '🌊',
      quality: '🌀',
      routing: '⚙️',
      prediction: '🔮',
      optimization: '💡'
    };
    return icons[type] || '🤖';
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative w-full p-4 mb-3 rounded-3xl 
        transition-all duration-500 ease-out
        ${isActive 
          ? 'bg-gradient-to-br from-royal-blue/30 to-shakespeare-400/40 scale-105 shadow-xl shadow-royal-blue/30' 
          : 'glassmorphism hover:scale-102 hover:shadow-lg'
        }
        ${isHovered ? 'translate-x-2' : ''}
        group overflow-hidden
      `}
    >
      {/* Animated ripple effect */}
      {isActive && (
        <div className="absolute inset-0 rounded-3xl">
          <div className="absolute inset-0 rounded-3xl bg-royal-blue/20 animate-ripple-3d" />
        </div>
      )}

      {/* Content */}
      <div className="relative flex items-center gap-3">
        {/* Icon with glow */}
        <div className={`
          text-3xl transition-all duration-300
          ${isActive ? 'animate-float' : ''}
          ${isHovered ? 'scale-110' : ''}
        `}>
          {getAgentIcon(agent.type)}
        </div>

        {/* Text content */}
        <div className="flex-1 text-left">
          <h3 className={`
            font-display font-semibold text-sm mb-1
            ${isActive ? 'text-white' : 'text-shakespeare-900'}
          `}>
            {agent.name}
          </h3>
          <p className={`
            text-xs leading-tight
            ${isActive ? 'text-shakespeare-100' : 'text-shakespeare-700'}
          `}>
            {agent.shortDesc}
          </p>
        </div>

        {/* Status indicator */}
        <div className="flex flex-col items-center gap-1">
          <div className={`
            w-2.5 h-2.5 rounded-full
            ${agent.status === 'active' 
              ? 'bg-green-400 shadow-lg shadow-green-400/50 animate-pulse' 
              : 'bg-gray-400'
            }
          `} />
          <span className="text-[9px] text-shakespeare-600">
            {agent.status}
          </span>
        </div>
      </div>

      {/* Hover wave effect */}
      <div className={`
        absolute bottom-0 left-0 right-0 h-1 
        bg-gradient-to-r from-shakespeare-400 via-aqua-teal to-shakespeare-400
        transition-all duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `} />
    </button>
  );
}
