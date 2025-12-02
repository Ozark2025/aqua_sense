'use client';

import { motion } from 'framer-motion';

export default function FlowAnimation({ isActive, direction = 'horizontal' }) {
  if (!isActive) {
    return (
      <div className={`${direction === 'horizontal' ? 'w-24 h-1' : 'h-24 w-1'} bg-shakespeare-300/30 rounded-full`}></div>
    );
  }

  return (
    <div className={`relative ${direction === 'horizontal' ? 'w-24 h-1' : 'h-24 w-1'}`}>
      {/* Base pipe */}
      <div className={`absolute inset-0 bg-gradient-to-${direction === 'horizontal' ? 'r' : 'b'} from-shakespeare-400 to-shakespeare-500 rounded-full opacity-50`}></div>

      {/* Flowing water particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${direction === 'horizontal' ? 'w-3 h-1' : 'w-1 h-3'} bg-gradient-to-${direction === 'horizontal' ? 'r' : 'b'} from-royal-blue to-aqua-teal rounded-full blur-[2px]`}
          animate={
            direction === 'horizontal'
              ? { x: [-10, 110], opacity: [0, 1, 1, 0] }
              : { y: [-10, 110], opacity: [0, 1, 1, 0] }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'linear'
          }}
          style={direction === 'horizontal' ? { top: 0, left: 0 } : { left: 0, top: 0 }}
        />
      ))}

      {/* Glowing effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-${direction === 'horizontal' ? 'r' : 'b'} from-royal-blue/30 to-aqua-teal/30 rounded-full blur-md`}
        animate={{
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Water droplets */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`droplet-${i}`}
          className={`absolute ${direction === 'horizontal' ? 'w-1.5 h-1.5' : 'w-1.5 h-1.5'} bg-shakespeare-300 rounded-full`}
          animate={
            direction === 'horizontal'
              ? { x: [-5, 115], scale: [0.5, 1, 0.5] }
              : { y: [-5, 115], scale: [0.5, 1, 0.5] }
          }
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut'
          }}
          style={
            direction === 'horizontal'
              ? { top: '50%', left: 0, transform: 'translateY(-50%)' }
              : { left: '50%', top: 0, transform: 'translateX(-50%)' }
          }
        />
      ))}
    </div>
  );
}
