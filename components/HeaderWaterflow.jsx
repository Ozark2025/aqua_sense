'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeaderWaterflow() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full py-8 overflow-hidden"
    >
      {/* Wavy animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-shakespeare-600 via-shakespeare-500 to-shakespeare-600 animate-water-flow"></div>
      
      {/* Caustic light effect */}
      <div className="caustic-overlay"></div>
      
      {/* Water texture */}
      <div className="absolute inset-0 water-texture"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="text-white hover:text-shakespeare-100 transition-colors">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white drop-shadow-lg">
                AquaSense
              </h1>
              <p className="text-shakespeare-100 text-sm md:text-base mt-1">Smart Water Intelligence</p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glassmorphism-strong rounded-full px-6 py-3"
          >
            <p className="text-white font-display text-lg md:text-xl">
              Live Water Routing & Quality Monitor
            </p>
          </motion.div>
        </div>

        {/* Subtitle with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-white/90 text-lg md:text-xl max-w-4xl mx-auto">
            Real-time water condition monitoring from AquaSense's IoT sensors • AI-driven routing for optimal water reuse • Supporting India's water sustainability
          </p>
        </motion.div>

        {/* Floating droplets */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/20 rounded-full blur-sm"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + Math.random() * 60}%`
            }}
          />
        ))}
      </div>

      {/* Wave bottom edge */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-shakespeare-50">
        <svg className="absolute bottom-0 w-full h-8" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,50 C300,100 500,0 600,50 C700,100 900,0 1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
            className="text-shakespeare-50 animate-wave"
          />
        </svg>
      </div>
    </motion.header>
  );
}
