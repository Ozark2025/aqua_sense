'use client';

import { useState } from 'react';

export default function RightPanel({ isOpen, onToggle, activeAgent }) {
  const quickActions = [
    { id: 1, icon: '🔍', label: 'Explain ML decision', color: 'from-shakespeare-400 to-shakespeare-500' },
    { id: 2, icon: '💧', label: 'Analyze water sample', color: 'from-aqua-teal to-shakespeare-400' },
    { id: 3, icon: '📊', label: 'Predict next 6 hours', color: 'from-shakespeare-500 to-shakespeare-600' },
    { id: 4, icon: '⚙️', label: 'Optimize routing', color: 'from-shakespeare-600 to-shakespeare-700' },
  ];

  const tips = [
    { icon: '💡', text: 'Ask specific questions for better results' },
    { icon: '🎯', text: 'Use keywords like "predict", "analyze", "optimize"' },
    { icon: '📈', text: 'Request historical data comparisons' },
    { icon: '🌊', text: 'Get real-time water quality insights' },
  ];

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className={`
          fixed top-1/2 -translate-y-1/2 z-50
          ${isOpen ? 'right-80' : 'right-0'}
          w-12 h-20 rounded-l-2xl
          bg-gradient-to-br from-shakespeare-500 to-shakespeare-600
          text-white font-bold text-xl
          shadow-lg shadow-shakespeare-500/30
          hover:shadow-xl hover:shadow-shakespeare-500/50
          transition-all duration-500
          flex items-center justify-center
        `}
      >
        <span className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
          ◀
        </span>
      </button>

      {/* Panel */}
      <aside
        className={`
          fixed top-0 right-0 h-screen w-80
          bg-gradient-to-br from-shakespeare-100/90 via-shakespeare-200/80 to-shakespeare-300/70
          backdrop-blur-xl
          border-l border-shakespeare-300/30
          shadow-2xl shadow-shakespeare-500/20
          transition-transform duration-500 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          overflow-y-auto
          z-40
        `}
      >
        <div className="relative p-6">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-shakespeare-400/30 to-transparent animate-wave" />
          </div>

          {/* Content */}
          <div className="relative space-y-0">
            {/* Header */}
            {/* <div>
              <h2 className="font-display text-2xl font-bold text-shakespeare-950 mb-2 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Smart Suggestions
              </h2>
              <p className="text-sm text-shakespeare-700">
                Quick actions and helpful tips
              </p>
            </div> */}

            {/* Wave divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-shakespeare-400 to-transparent" />

            {/* Quick Actions */}
            {/* <div>
              <h3 className="font-display text-lg font-semibold text-shakespeare-900 mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    className={`
                      w-full p-4 rounded-2xl
                      bg-gradient-to-r ${action.color}
                      text-white text-left
                      shadow-md hover:shadow-lg
                      hover:scale-105
                      transition-all duration-300
                      flex items-center gap-3
                      group
                    `}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {action.icon}
                    </span>
                    <span className="font-medium text-sm">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div> */}

            {/* 3D Water Molecule */}
            <div className="glassmorphism-strong rounded-3xl p-6">
              <h3 className="font-display text-lg font-semibold text-shakespeare-900 mb-4 text-center">
                Water Molecule
              </h3>
              <div className="relative w-full h-40 flex items-center justify-center">
                {/* Central Oxygen */}
                <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-500 shadow-lg shadow-red-400/50 animate-float-3d flex items-center justify-center text-white font-bold">
                  O
                </div>
                
                {/* Hydrogen 1 */}
                <div 
                  className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-shakespeare-400 to-shakespeare-500 shadow-lg shadow-shakespeare-400/50 animate-float-3d flex items-center justify-center text-white font-bold"
                  style={{ left: '20%', top: '20%', animationDelay: '0.5s' }}
                >
                  H
                </div>
                
                {/* Hydrogen 2 */}
                <div 
                  className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-aqua-teal to-shakespeare-400 shadow-lg shadow-aqua-teal/50 animate-float-3d flex items-center justify-center text-white font-bold"
                  style={{ right: '20%', top: '20%', animationDelay: '1s' }}
                >
                  H
                </div>

                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <line x1="50%" y1="50%" x2="30%" y2="30%" stroke="#4ac0e6" strokeWidth="2" opacity="0.5" />
                  <line x1="50%" y1="50%" x2="70%" y2="30%" stroke="#73C8D2" strokeWidth="2" opacity="0.5" />
                </svg>
              </div>
              <p className="text-xs text-shakespeare-700 text-center mt-4">
                H₂O - The essence of life
              </p>
            </div>

            {/* Helpful Tips */}
            <div>
              <h3 className="font-display text-lg font-semibold text-shakespeare-900 mb-3">
                💡 Helpful Tips
              </h3>
              <div className="space-y-2">
                {tips.map((tip, index) => (
                  <div
                    key={index}
                    className="glassmorphism rounded-xl p-3 flex items-start gap-3 hover:scale-102 transition-transform duration-300"
                  >
                    <span className="text-xl flex-shrink-0">
                      {tip.icon}
                    </span>
                    <p className="text-sm text-shakespeare-900">
                      {tip.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shortcuts */}
            <div className="glassmorphism-strong rounded-2xl p-4">
              <h3 className="font-display text-sm font-semibold text-shakespeare-900 mb-3">
                ⌨️ Keyboard Shortcuts
              </h3>
              <div className="space-y-2 text-xs text-shakespeare-800">
                <div className="flex justify-between">
                  <span>Send message</span>
                  <kbd className="px-2 py-1 bg-shakespeare-300/50 rounded">Enter</kbd>
                </div>
                <div className="flex justify-between">
                  <span>New line</span>
                  <kbd className="px-2 py-1 bg-shakespeare-300/50 rounded">Shift + Enter</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Clear chat</span>
                  <kbd className="px-2 py-1 bg-shakespeare-300/50 rounded">Ctrl + L</kbd>
                </div>
              </div>
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute top-20 right-10 w-3 h-3 rounded-full bg-shakespeare-400/30 animate-bubble" style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 left-10 w-2 h-2 rounded-full bg-aqua-teal/30 animate-bubble" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-40 right-20 w-2.5 h-2.5 rounded-full bg-shakespeare-500/30 animate-bubble" style={{ animationDelay: '4s' }} />
        </div>
      </aside>
    </>
  );
}
