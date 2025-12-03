'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const treatmentStages = [
  {
    id: 'primary',
    name: 'Primary Filtration',
    icon: '🔷',
    description: 'Removing large particles and sediments',
    duration: 8000, // 8 seconds
    requirements: {
      turbidity: { target: '<5 NTU', max: 5 },
      particleSize: { target: '<100μm', max: 100 }
    }
  },
  {
    id: 'secondary',
    name: 'Secondary Treatment',
    icon: '⚗️',
    description: 'Chemical treatment and disinfection',
    duration: 10000, // 10 seconds
    requirements: {
      pH: { target: '6.5-8.5', min: 6.5, max: 8.5 },
      TDS: { target: '<400 ppm', max: 400 },
      bacteria: { target: '<10 CFU/mL', max: 10 }
    }
  },
  {
    id: 'final',
    name: 'Final Polishing',
    icon: '✨',
    description: 'Advanced filtration for intended use',
    duration: 6000, // 6 seconds
    requirements: {
      turbidity: { target: '<1 NTU', max: 1 },
      clarity: { target: '>95%', min: 95 },
      compliance: { target: '100%', min: 100 }
    }
  }
];

// NEW: Realistic Water Flow Animation Component
function RealisticWaterFlow({ isActive, stageColor = 'royal-blue' }) {
  if (!isActive) return null;

  return (
    <div className="relative w-full h-32 overflow-hidden">
      {/* Water container with glass effect */}
      <div className="absolute inset-0 glassmorphism-strong rounded-3xl border-4 border-shakespeare-400/30 overflow-hidden">
        {/* Animated liquid water with wave effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-royal-blue via-aqua-teal to-shakespeare-400"
          animate={{
            height: ['0%', '100%', '100%'],
          }}
          transition={{
            duration: 2,
            times: [0, 0.7, 1],
            ease: 'easeInOut'
          }}
        >
          {/* Wave surface animation */}
          <svg className="absolute top-0 left-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <motion.path
              d="M0,60 C300,90 600,30 900,60 C1050,75 1125,60 1200,60 L1200,120 L0,120 Z"
              fill="rgba(74, 192, 230, 0.3)"
              animate={{
                d: [
                  "M0,60 C300,90 600,30 900,60 C1050,75 1125,60 1200,60 L1200,120 L0,120 Z",
                  "M0,60 C300,30 600,90 900,60 C1050,45 1125,75 1200,60 L1200,120 L0,120 Z",
                  "M0,60 C300,90 600,30 900,60 C1050,75 1125,60 1200,60 L1200,120 L0,120 Z"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </svg>

          {/* Flowing water particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white/40 rounded-full backdrop-blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 80 - 40],
                scale: [1, Math.random() * 1.5 + 0.5, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut'
              }}
            />
          ))}

          {/* Bubbles rising through water */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`bubble-${i}`}
              className="absolute w-2 h-2 bg-white/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: 0,
              }}
              animate={{
                y: [-120, -400],
                x: [0, Math.random() * 40 - 20],
                scale: [0.5, 1.2, 0.8],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'linear'
              }}
            />
          ))}

          {/* Caustic light patterns */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(ellipse at 20% 40%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 60%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.35) 0%, transparent 50%)
              `
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>

        {/* Water level indicator */}
        <motion.div
          className="absolute right-4 top-4 glassmorphism rounded-lg px-3 py-2 z-10"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-xs font-bold text-shakespeare-900">💧 FLOWING</p>
        </motion.div>
      </div>

      {/* Outer glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-t from-royal-blue/30 to-aqua-teal/30 blur-2xl -z-10"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
}

function MetricCard({ metric, value, requirement, status }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glassmorphism rounded-lg p-3 border-2 ${
        status === 'pass' ? 'border-emerald-500/50 bg-emerald-500/10' :
        status === 'processing' ? 'border-aqua-teal/50 bg-aqua-teal/10' :
        'border-red-500/50 bg-red-500/10'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-semibold text-shakespeare-900 uppercase">{metric}</p>
        <motion.div
          animate={status === 'processing' ? { rotate: 360 } : {}}
          transition={{ duration: 2, repeat: status === 'processing' ? Infinity : 0, ease: 'linear' }}
        >
          {status === 'pass' ? '✅' : status === 'processing' ? '⏳' : '❌'}
        </motion.div>
      </div>
      <div className="flex items-baseline gap-2">
        <p className={`text-lg font-display font-bold ${
          status === 'pass' ? 'text-emerald-600' :
          status === 'processing' ? 'text-aqua-teal' :
          'text-red-600'
        }`}>
          {value}
        </p>
        <p className="text-xs text-shakespeare-700">/ {requirement}</p>
      </div>
    </motion.div>
  );
}

function StageCard({ stage, isActive, isPassed, metrics, onFaultAlert }) {
  const [timeAtStage, setTimeAtStage] = useState(0);
  const [isFault, setIsFault] = useState(false);

  useEffect(() => {
    if (isActive) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setTimeAtStage(elapsed);
        
        // Check for filter fault (taking too long)
        if (elapsed > stage.duration * 1.5 && !isFault) {
          setIsFault(true);
          if (onFaultAlert) {
            onFaultAlert(stage.id, stage.name);
          }
        }
      }, 100);
      
      return () => {
        clearInterval(interval);
        setTimeAtStage(0);
      };
    }
  }, [isActive, stage.duration, stage.id, stage.name, isFault, onFaultAlert]);

  const progress = isActive ? Math.min((timeAtStage / stage.duration) * 100, 100) : isPassed ? 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: isActive ? 1.05 : 1,
        y: isActive ? [0, -5, 0] : 0
      }}
      transition={{
        y: { duration: 2, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }
      }}
      className={`glassmorphism-strong rounded-2xl p-6 border-2 relative overflow-hidden ${
        isActive ? 'border-royal-blue shadow-2xl shadow-royal-blue/50' :
        isPassed ? 'border-emerald-500 shadow-lg shadow-emerald-500/30' :
        'border-white/30'
      }`}
    >
      {/* Pulsing background for active stage */}
      {isActive && (
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-royal-blue/20 to-aqua-teal/20"
        />
      )}

      {/* Fault alert overlay */}
      <AnimatePresence>
        {isFault && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0 bg-red-500/20 border-4 border-red-500"
          >
            <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase animate-pulse">
              ⚠️ FILTER FAULT
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        {/* Stage header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
              className="text-4xl"
            >
              {stage.icon}
            </motion.div>
            <div>
              <h3 className="text-xl font-display font-bold text-shakespeare-900">
                {stage.name}
              </h3>
              <p className="text-xs text-shakespeare-700">{stage.description}</p>
            </div>
          </div>
          
          {isPassed && !isActive && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-3xl"
            >
              ✅
            </motion.div>
          )}
        </div>

        {/* Progress bar */}
        {(isActive || isPassed) && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-shakespeare-700">
                {isActive ? 'Processing...' : 'Completed'}
              </p>
              <p className="text-xs font-semibold text-shakespeare-900">
                {isActive ? `${Math.floor(timeAtStage / 1000)}s / ${stage.duration / 1000}s` : 'Done ✓'}
              </p>
            </div>
            <div className="h-2 bg-shakespeare-200/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className={`h-full rounded-full ${
                  isFault ? 'bg-gradient-to-r from-red-500 to-red-700' :
                  isPassed ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' :
                  'bg-gradient-to-r from-royal-blue to-aqua-teal'
                }`}
              />
            </div>
          </div>
        )}

        {/* Metrics */}
        {(isActive || isPassed) && metrics && (
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(stage.requirements).map(([key, req]) => (
              <MetricCard
                key={key}
                metric={key}
                value={metrics[key] || 'N/A'}
                requirement={req.target}
                status={isPassed ? 'pass' : isActive ? 'processing' : 'waiting'}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function TreatmentFlowVisualization({ processingData, onComplete }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [passedStages, setPassedStages] = useState([]);
  const [faultAlerts, setFaultAlerts] = useState([]);
  const [stageMetrics, setStageMetrics] = useState({
    primary: { turbidity: '3.2 NTU', particleSize: '85μm' },
    secondary: { pH: '7.2', TDS: '350 ppm', bacteria: '5 CFU/mL' },
    final: { turbidity: '0.8 NTU', clarity: '97%', compliance: '100%' }
  });

  useEffect(() => {
    if (processingData && currentStage < treatmentStages.length) {
      const stage = treatmentStages[currentStage];
      const timer = setTimeout(() => {
        setPassedStages(prev => [...prev, stage.id]);
        setCurrentStage(prev => prev + 1);
        
        if (currentStage === treatmentStages.length - 1) {
          // All stages complete
          if (onComplete) {
            onComplete({
              success: true,
              finalMetrics: stageMetrics.final,
              batchNumber: processingData.batchNumber,
              intendedUse: processingData.intendedUse
            });
          }
        }
      }, stage.duration);
      
      return () => clearTimeout(timer);
    }
  }, [currentStage, processingData, stageMetrics.final, onComplete]);

  const handleFaultAlert = (stageId, stageName) => {
    setFaultAlerts(prev => [...prev, { stageId, stageName, time: new Date().toLocaleTimeString() }]);
  };

  if (!processingData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glassmorphism-strong rounded-3xl p-12 text-center border-2 border-white/30"
      >
        <div className="text-6xl mb-4 opacity-30">💧</div>
        <p className="text-shakespeare-700 text-lg">
          Waiting for batch to start processing...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with batch info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism-strong rounded-2xl p-6 border-2 border-royal-blue/30"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-shakespeare-900 mb-1">
              Processing Batch #{processingData.batchNumber.toString().padStart(3, '0')}
            </h2>
            <p className="text-shakespeare-700">
              Intended Use: <span className="font-semibold text-royal-blue">{processingData.intendedUse.icon} {processingData.intendedUse.name}</span>
            </p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="text-5xl"
          >
            💧
          </motion.div>
        </div>
      </motion.div>

      {/* Fault alerts */}
      <AnimatePresence>
        {faultAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {faultAlerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="glassmorphism-strong rounded-xl p-4 border-2 border-red-500 bg-red-500/10"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-3xl"
                  >
                    🚨
                  </motion.div>
                  <div>
                    <h4 className="font-display font-bold text-red-700">
                      Filter Fault Detected: {alert.stageName}
                    </h4>
                    <p className="text-sm text-red-600">
                      Water has been at this stage for too long. Check filter status. Time: {alert.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Treatment stages visualization */}
      <div className="relative">
        <div className="space-y-8">
          {treatmentStages.map((stage, index) => (
            <div key={stage.id} className="relative">
              <StageCard
                stage={stage}
                isActive={currentStage === index}
                isPassed={passedStages.includes(stage.id)}
                metrics={stageMetrics[stage.id]}
                onFaultAlert={handleFaultAlert}
              />

              {/* NEW: Realistic Water Flow Animation between stages */}
              {index < treatmentStages.length - 1 && (
                <div className="my-6 px-4 md:px-12">
                  <RealisticWaterFlow 
                    isActive={passedStages.includes(stage.id) || currentStage === index}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Completion celebration */}
        {currentStage === treatmentStages.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 glassmorphism-strong rounded-3xl p-8 border-2 border-emerald-500 bg-emerald-500/10 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="text-4xl font-display font-bold text-emerald-700 mb-2">
              Treatment Complete!
            </h2>
            <p className="text-emerald-600 text-lg">
              Water successfully processed and ready for <strong>{processingData.intendedUse.name}</strong>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}