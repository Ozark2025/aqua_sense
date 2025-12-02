'use client';

import { useState } from 'react';
import AgentBubble from './AgentBubble';

export default function Sidebar({ agents, activeAgent, onAgentSelect, onAddCustomAgent }) {
  return (
    <aside className="relative w-80 h-screen bg-gradient-to-br from-shakespeare-100/80 via-shakespeare-200/60 to-shakespeare-300/40 backdrop-blur-xl border-r border-shakespeare-300/30 overflow-hidden">
      {/* Animated water ripple background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-shakespeare-400/20 to-transparent animate-wave" />
        <div className="absolute top-1/4 left-0 w-full h-full bg-gradient-to-br from-aqua-teal/20 to-transparent animate-wave" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-shakespeare-950 mb-2 flex items-center gap-2">
            <span className="text-3xl">🤖</span>
            AI Agents
          </h2>
          <p className="text-sm text-shakespeare-700">
            Select an agent to start chatting
          </p>
        </div>

        {/* Wave divider */}
        <div className="w-full h-px mb-4 bg-gradient-to-r from-transparent via-shakespeare-400 to-transparent" />

        {/* Agent list - scrollable */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-shakespeare-400 scrollbar-track-shakespeare-200">
          {agents.map((agent) => (
            <AgentBubble
              key={agent.id}
              agent={agent}
              isActive={activeAgent?.id === agent.id}
              onClick={() => onAgentSelect(agent)}
            />
          ))}
        </div>

        {/* Add Custom Agent Button */}
        <button
          onClick={onAddCustomAgent}
          className="
            mt-6 w-full py-4 px-6 rounded-2xl
            bg-gradient-to-r from-orange-accent to-orange-accent/80
            text-white font-display font-semibold
            shadow-lg shadow-orange-accent/30
            hover:shadow-xl hover:shadow-orange-accent/50
            hover:scale-105
            transition-all duration-300
            flex items-center justify-center gap-2
            group
          "
        >
          <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
          Add Custom Agent
        </button>

        {/* Floating water particles */}
        <div className="absolute bottom-20 left-10 w-3 h-3 rounded-full bg-shakespeare-400/40 animate-bubble" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-40 right-10 w-2 h-2 rounded-full bg-aqua-teal/40 animate-bubble" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-60 left-20 w-2.5 h-2.5 rounded-full bg-shakespeare-300/40 animate-bubble" style={{ animationDelay: '4s' }} />
      </div>
    </aside>
  );
}
