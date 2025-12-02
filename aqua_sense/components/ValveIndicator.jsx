'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

function getValveColor(status) {
  switch (status) {
    case 'open':
      return 'from-emerald-400 to-emerald-600';
    case 'closed':
      return 'from-red-500 to-red-700';
    case 'auto':
      return 'from-shakespeare-400 to-shakespeare-600';
    default:
      return 'from-gray-400 to-gray-600';
  }
}

function getModeColor(mode) {
  switch (mode) {
    case 'auto':
      return 'bg-shakespeare-500/20 text-shakespeare-700 border-shakespeare-500/50';
    case 'manual':
      return 'bg-orange-500/20 text-orange-700 border-orange-500/50';
    case 'ml-suggested':
      return 'bg-royal-blue/20 text-blue-700 border-royal-blue/50';
    default:
      return 'bg-gray-500/20 text-gray-700 border-gray-500/50';
  }
}

export default function ValveIndicator({ valve }) {
  const [showDetails, setShowDetails] = useState(false);
  const isOpen = valve.status === 'open';

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.1 }}
        onHoverStart={() => setShowDetails(true)}
        onHoverEnd={() => setShowDetails(false)}
        onClick={() => setShowDetails(!showDetails)}
        className="cursor-pointer"
      >
        {/* Valve icon */}
        <div className={`w-16 h-16 rounded-lg glassmorphism-strong border-2 border-white/30 flex items-center justify-center relative overflow-hidden group transition-all duration-300 ${
          isOpen ? 'animate-liquid-morph' : ''
        }`}>
          {/* Glow effect for open valves */}
          {isOpen && (
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className={`absolute inset-0 bg-gradient-to-br ${getValveColor(valve.status)} blur-lg -z-10`}
            />
          )}

          {/* Valve rotating animation */}
          <motion.div
            animate={isOpen ? { rotate: 360 } : { rotate: 0 }}
            transition={isOpen ? { duration: 4, repeat: Infinity, ease: 'linear' } : {}}
            className="relative z-10"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-colors duration-300 ${
                isOpen ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
              <line x1="12" y1="4" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Status indicator dot */}
          <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
            isOpen ? 'bg-emerald-500' : 'bg-red-500'
          } ${isOpen ? 'animate-pulse' : ''}`}></div>
        </div>
      </motion.div>

      {/* Valve details popup */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 glassmorphism-strong rounded-xl p-4 min-w-[200px] z-50 border border-white/30 shadow-2xl"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-shakespeare-700 font-medium">Status:</span>
              <span className={`text-sm font-display font-bold capitalize ${
                isOpen ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {valve.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-shakespeare-700 font-medium">Mode:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getModeColor(valve.mode)} uppercase`}>
                {valve.mode.replace('-', ' ')}
              </span>
            </div>
            {valve.mode === 'ml-suggested' && (
              <div className="mt-2 pt-2 border-t border-shakespeare-300/30">
                <div className="flex items-start gap-2">
                  <span className="text-sm">🤖</span>
                  <p className="text-xs text-shakespeare-700">
                    AI optimized routing based on water quality and demand
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Arrow pointing to valve */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white/20"></div>
        </motion.div>
      )}
    </div>
  );
}
