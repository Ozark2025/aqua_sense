"use client";

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function InnovationsHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated water wave background */}
      <div className="absolute inset-0 bg-gradient-to-br from-shakespeare-950 via-shakespeare-800 to-shakespeare-600">
        {/* Flowing wave layers */}
        <div className="absolute inset-0 opacity-30">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#4ac0e6', stopOpacity: 0.6}} />
                <stop offset="100%" style={{stopColor: '#0046FF', stopOpacity: 0.3}} />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,160 Q250,100 500,160 T1000,160 L1000,400 L0,400 Z"
              fill="url(#waveGradient1)"
              animate={{
                d: [
                  "M0,160 Q250,100 500,160 T1000,160 L1000,400 L0,400 Z",
                  "M0,140 Q250,180 500,140 T1000,140 L1000,400 L0,400 Z",
                  "M0,160 Q250,100 500,160 T1000,160 L1000,400 L0,400 Z"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Neon ripples */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border-2 border-aqua-teal opacity-20"
          animate={{ scale: [1, 2, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full border-2 border-royal-blue opacity-20"
          animate={{ scale: [1, 2.5, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-aqua-teal rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="glassmorphism-strong rounded-3xl p-12 backdrop-blur-2xl shadow-2xl border border-aqua-teal/30"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 rounded-full bg-gradient-to-r from-royal-blue to-aqua-teal text-white text-sm font-semibold shadow-lg">
              🌊 Breakthrough AI Technology
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            AquaSense <span className="text-gradient">Innovations</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="w-32 h-1 bg-gradient-to-r from-aqua-teal to-royal-blue mx-auto mb-6 rounded-full"
          />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-2xl md:text-3xl text-shakespeare-100 font-light mb-4"
          >
            The Future of Water Recovery Starts Here
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-lg md:text-xl text-shakespeare-200 max-w-3xl mx-auto"
          >
            AI-driven breakthroughs that make Indian water treatment <span className="text-aqua-teal font-semibold">smarter</span>, <span className="text-aqua-teal font-semibold">cleaner</span>, and more <span className="text-aqua-teal font-semibold">affordable</span>.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-shakespeare-100"
          >
            <span className="text-sm font-medium mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-shakespeare-50 to-transparent" />
    </section>
  );
}
