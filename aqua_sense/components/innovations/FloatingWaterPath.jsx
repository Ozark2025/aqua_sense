"use client";

import { motion } from 'framer-motion';

export default function FloatingWaterPath() {
  return (
    <div className="fixed right-8 top-1/4 bottom-1/4 w-1 pointer-events-none z-50 hidden xl:block">
      {/* Vertical glowing water stream */}
      <div className="relative h-full">
        {/* Main stream */}
        <motion.div
          className="absolute inset-0 w-1 bg-gradient-to-b from-aqua-teal via-royal-blue to-aqua-teal rounded-full"
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Flowing particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-aqua-teal shadow-lg shadow-aqua-teal/50"
            style={{
              left: '-2px',
            }}
            animate={{
              top: ['0%', '100%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
          />
        ))}

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 w-4 -left-1.5 bg-aqua-teal/20 blur-xl rounded-full"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Waypoint markers */}
        {[0, 25, 50, 75, 100].map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-royal-blue border-2 border-aqua-teal shadow-lg"
            style={{
              top: `${position}%`,
              left: '-5px',
            }}
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="absolute -right-24 top-0 text-xs text-shakespeare-600 font-medium">
        Innovation Flow
      </div>
    </div>
  );
}
