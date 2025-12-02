'use client';

import { motion } from 'framer-motion';

function getQualityColor(quality) {
  switch (quality) {
    case 'incoming':
      return 'from-shakespeare-400 to-shakespeare-600';
    case 'processing':
      return 'from-aqua-teal to-shakespeare-500';
    case 'checking':
      return 'from-royal-blue to-shakespeare-600';
    case 'approved':
      return 'from-emerald-400 to-emerald-600';
    case 'rejected':
      return 'from-red-500 to-red-700';
    default:
      return 'from-shakespeare-400 to-shakespeare-600';
  }
}

function getStatusIcon(quality) {
  switch (quality) {
    case 'incoming':
      return '🚰';
    case 'processing':
      return '⚙️';
    case 'checking':
      return '🔍';
    case 'approved':
      return '✅';
    case 'rejected':
      return '❌';
    default:
      return '💧';
  }
}

export default function StageNode({ stage, isSelected, onClick, viewMode, isCurrent, isNext }) {
  const isActive = stage.status === 'active';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative cursor-pointer group ${viewMode === '3d' ? 'transform-gpu' : ''}`}
      style={viewMode === '3d' ? { 
        transform: 'perspective(1000px) rotateX(15deg) rotateY(-10deg)',
        transformStyle: 'preserve-3d'
      } : {}}
    >
      {/* Extra strong pulsing glow for current stage */}
      {isCurrent && (
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-royal-blue to-aqua-teal blur-3xl -z-10"
        />
      )}

      {/* Gentle pulsing glow for next stage */}
      {isNext && !isCurrent && (
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-aqua-teal to-shakespeare-400 blur-2xl -z-10"
        />
      )}

      {/* Pulsing glow for active nodes */}
      {isActive && !isCurrent && !isNext && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${getQualityColor(stage.quality)} blur-2xl -z-10`}
        />
      )}

      {/* Main node */}
      <div
        className={`w-40 h-40 rounded-full glassmorphism-strong transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden ${
          isCurrent 
            ? 'border-4 border-royal-blue shadow-2xl shadow-royal-blue/70 scale-110' 
            : isNext 
            ? 'border-4 border-aqua-teal shadow-xl shadow-aqua-teal/50 scale-105'
            : isSelected 
            ? 'border-4 border-royal-blue shadow-2xl shadow-royal-blue/50' 
            : 'border-4 border-white/30'
        } ${isActive ? 'animate-liquid-morph' : ''}`}
      >
        {/* Caustic light effect - stronger for current stage */}
        {(isActive || isCurrent) && (
          <div className={`caustic-overlay ${isCurrent ? 'opacity-100' : ''}`}></div>
        )}

        {/* Water texture */}
        <div className="water-texture absolute inset-0"></div>

        {/* Animated water ripples for current stage */}
        {isCurrent && (
          <>
            <motion.div
              animate={{ scale: [0.8, 2, 2], opacity: [0.8, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border-4 border-royal-blue"
            />
            <motion.div
              animate={{ scale: [0.8, 2, 2], opacity: [0.8, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border-4 border-aqua-teal"
            />
          </>
        )}

        {/* Content */}
        <div className="relative z-10 text-center px-2">
          <motion.div
            animate={
              isCurrent 
                ? { scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }
                : isActive 
                ? { rotate: [0, 10, -10, 0] }
                : {}
            }
            transition={{ duration: isCurrent ? 1.5 : 3, repeat: Infinity }}
            className="text-4xl mb-2"
          >
            {getStatusIcon(stage.quality)}
          </motion.div>
          <h4 className={`font-display font-semibold text-sm leading-tight ${
            isCurrent ? 'text-royal-blue' : isNext ? 'text-aqua-teal' : 'text-shakespeare-900'
          }`}>
            {stage.name}
          </h4>
          {stage.suitability !== 'N/A' && (
            <p className={`text-xs mt-1 font-semibold ${
              isCurrent ? 'text-royal-blue' : isNext ? 'text-aqua-teal' : 'text-shakespeare-700'
            }`}>
              {stage.suitability}
            </p>
          )}
        </div>

        {/* Gradient overlay - adjusted for current/next stages */}
        <div className={`absolute inset-0 bg-gradient-to-br ${
          isCurrent 
            ? 'from-royal-blue to-aqua-teal opacity-20' 
            : isNext
            ? 'from-aqua-teal to-shakespeare-400 opacity-15'
            : getQualityColor(stage.quality) + ' opacity-10'
        } group-hover:opacity-30 transition-opacity duration-300`}></div>

        {/* Ripple on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-shakespeare-400/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ripple-3d"></div>
        </div>
      </div>

      {/* Flow indicator */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute -bottom-8 left-1/2 -translate-x-1/2 glassmorphism rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
            isCurrent ? 'bg-royal-blue/20 text-royal-blue border border-royal-blue/30' : 'text-shakespeare-900'
          }`}
        >
          {stage.flow} L/min
        </motion.div>
      )}

      {/* 3D shadow for isometric view */}
      {viewMode === '3d' && (
        <div className="absolute inset-0 rounded-full bg-shakespeare-900/30 blur-md transform translate-y-4 translate-x-4 -z-20"></div>
      )}
    </motion.div>
  );
}