'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Simple StageNode component
const StageNode = ({ stage, isCurrent }) => {
  return (
    <div className={`relative ${isCurrent ? 'z-20' : 'z-10'}`}>
      <motion.div
        className={`w-24 h-24 rounded-full glassmorphism-strong flex items-center justify-center border-2 ${
          isCurrent ? 'border-royal-blue shadow-lg shadow-royal-blue/50' : 'border-shakespeare-400/30'
        }`}
        animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="text-center">
          <div className="text-3xl mb-1">
            {stage.id === 'stage-initial' ? '🔬' : 
             stage.id === 'stage-1' ? '🌊' :
             stage.id === 'stage-2' ? '⚗️' :
             stage.id === 'stage-3' ? '✨' : '💧'}
          </div>
          <div className={`text-xs font-display font-bold ${
            stage.status === 'active' ? 'text-royal-blue' :
            stage.status === 'complete' ? 'text-green-600' :
            'text-shakespeare-700'
          }`}>
            {stage.status === 'analyzing' ? 'Analyzing' :
             stage.status === 'active' ? 'Active' :
             stage.status === 'complete' ? 'Done' : 'Idle'}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Pipeline stages data
const initialStages = [
  {
    id: 'stage-initial',
    name: 'Initial Analysis',
    description: 'Current batch water metrics',
    status: 'analyzing',
    position: { x: 10, y: 50 },
    sensors: {
      pH: 7.8,
      TDS: 420,
      turbidity: 8.5,
      temperature: 24.3,
      conductivity: 650
    }
  },
  {
    id: 'stage-1',
    name: 'Stage 1: Coarse Filtration',
    description: 'Removing large particles and sediments',
    status: 'idle',
    position: { x: 35, y: 30 },
    sensors: null
  },
  {
    id: 'stage-2',
    name: 'Stage 2: Chemical Treatment',
    description: 'pH adjustment and disinfection',
    status: 'idle',
    position: { x: 55, y: 60 },
    sensors: null
  },
  {
    id: 'stage-3',
    name: 'Stage 3: Fine Filtration',
    description: 'Advanced purification and polishing',
    status: 'idle',
    position: { x: 75, y: 40 },
    sensors: null
  },
  {
    id: 'stage-output',
    name: 'Output: Ready for Use',
    description: 'Purified water ready for intended application',
    status: 'idle',
    position: { x: 95, y: 50 },
    sensors: null
  }
];

// Intended use options
const intendedUseOptions = [
  {
    id: 'irrigation',
    name: 'Agricultural Irrigation',
    icon: '🌾',
    description: 'Suitable for crop watering and farming',
    requirements: { pH: [6.5, 8.5], TDS: '<2000', turbidity: '<5' }
  },
  {
    id: 'cooling',
    name: 'Industrial Cooling',
    icon: '❄️',
    description: 'For cooling towers and HVAC systems',
    requirements: { pH: [6.5, 9.0], TDS: '<800', turbidity: '<10' }
  },
  {
    id: 'process',
    name: 'Industrial Process',
    icon: '⚙️',
    description: 'Manufacturing and production processes',
    requirements: { pH: [6.0, 8.0], TDS: '<500', turbidity: '<2' }
  },
  {
    id: 'potable',
    name: 'Potable Water',
    icon: '💧',
    description: 'Drinking water quality standards',
    requirements: { pH: [6.5, 8.5], TDS: '<500', turbidity: '<1' }
  }
];

// Flow paths
const flowPaths = [
  { from: 'stage-initial', to: 'stage-1', path: 'M 10 50 Q 20 35, 35 30' },
  { from: 'stage-1', to: 'stage-2', path: 'M 35 30 Q 42 50, 55 60' },
  { from: 'stage-2', to: 'stage-3', path: 'M 55 60 Q 65 45, 75 40' },
  { from: 'stage-3', to: 'stage-output', path: 'M 75 40 Q 85 45, 95 50' }
];

export default function PipelineFlow() {
  const [simulationPhase, setSimulationPhase] = useState('initial');
  const [selectedUse, setSelectedUse] = useState(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [stageData, setStageData] = useState(initialStages);
  const [mlPredictions, setMlPredictions] = useState([]);

  // Auto-start simulation with slower timing
  useEffect(() => {
    if (simulationPhase === 'initial') {
      setTimeout(() => {
        const predictions = intendedUseOptions.map(option => ({
          ...option,
          matchScore: Math.floor(Math.random() * 30) + 70
        })).sort((a, b) => b.matchScore - a.matchScore);
        
        setMlPredictions(predictions);
        setSimulationPhase('analyzing');
      }, 5000); // 5 seconds to show initial metrics
    } else if (simulationPhase === 'analyzing') {
      setTimeout(() => {
        const bestOption = mlPredictions[0];
        setSelectedUse(bestOption);
        setSimulationPhase('processing');
      }, 7000); // 7 seconds to show AI predictions
    }
  }, [simulationPhase, mlPredictions]);

  // Handle processing stages with slower timing
  useEffect(() => {
    if (simulationPhase === 'processing') {
      const stageSequence = ['stage-initial', 'stage-1', 'stage-2', 'stage-3', 'stage-output'];
      
      if (currentStage < stageSequence.length - 1) {
        const timer = setTimeout(() => {
          const nextStage = currentStage + 1;
          setCurrentStage(nextStage);
          
          const updatedStages = [...stageData];
          const stageIndex = updatedStages.findIndex(s => s.id === stageSequence[nextStage]);
          
          if (stageIndex !== -1 && nextStage > 0 && nextStage < 4) {
            updatedStages[stageIndex] = {
              ...updatedStages[stageIndex],
              status: 'active',
              sensors: {
                pH: (7.8 - (nextStage * 0.2)).toFixed(1),
                TDS: Math.floor(420 - (nextStage * 50)),
                turbidity: (8.5 - (nextStage * 2.5)).toFixed(1),
                temperature: (24.3 + (nextStage * 0.3)).toFixed(1),
                conductivity: Math.floor(650 - (nextStage * 80))
              }
            };
          }
          
          if (nextStage === 4) {
            updatedStages[stageIndex] = {
              ...updatedStages[stageIndex],
              status: 'complete',
              sensors: {
                pH: 7.1,
                TDS: 280,
                turbidity: 0.8,
                temperature: 25.5,
                conductivity: 420
              }
            };
            setSimulationPhase('complete');
          }
          
          setStageData(updatedStages);
        }, 6000); // 6 seconds per stage
        
        return () => clearTimeout(timer);
      }
    }
  }, [simulationPhase, currentStage, stageData]);

  const resetSimulation = () => {
    setSimulationPhase('initial');
    setSelectedUse(null);
    setCurrentStage(0);
    setStageData(initialStages);
    setMlPredictions([]);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="relative"
    >
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-5xl font-display font-bold text-shakespeare-900 mb-3"
        >
          Live Purification Process Demo
        </motion.h2>
        <p className="text-shakespeare-700 text-lg mb-6">
          Watch as AI analyzes water quality and optimizes the purification process in real-time
        </p>

        {/* Phase indicator */}
        <motion.div
          key={simulationPhase}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block glassmorphism rounded-full px-6 py-3 mb-4"
        >
          {simulationPhase === 'initial' && (
            <p className="text-shakespeare-900 font-display font-semibold">
              🔬 <span className="text-royal-blue">Step 1:</span> Analyzing Current Batch Metrics
            </p>
          )}
          {simulationPhase === 'analyzing' && (
            <p className="text-shakespeare-900 font-display font-semibold">
              🤖 <span className="text-aqua-teal">Step 2:</span> ML Model Predicting Best Water Use
            </p>
          )}
          {simulationPhase === 'processing' && (
            <p className="text-shakespeare-900 font-display font-semibold">
              ⚡ <span className="text-royal-blue">Step 3:</span> Purification in Progress - Stage {currentStage + 1}/4
            </p>
          )}
          {simulationPhase === 'complete' && (
            <p className="text-shakespeare-900 font-display font-semibold">
              ✅ <span className="text-green-600">Complete:</span> Water Ready for {selectedUse?.name}
            </p>
          )}
        </motion.div>

        {/* Process explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto glassmorphism rounded-2xl p-6 mb-8"
        >
          <h3 className="font-display font-semibold text-shakespeare-900 mb-3 flex items-center justify-center gap-2">
            <span className="text-2xl">📋</span> How It Works
          </h3>
          <div className="text-left text-shakespeare-700 space-y-2 text-sm">
            <p><strong className="text-shakespeare-900">1. Initial Analysis:</strong> Sensors measure incoming water quality (pH, TDS, turbidity, etc.)</p>
            <p><strong className="text-shakespeare-900">2. AI Prediction:</strong> Machine learning model analyzes metrics and predicts the best intended use based on quality parameters</p>
            <p><strong className="text-shakespeare-900">3. Purification:</strong> Water flows through 3 treatment stages, with real-time monitoring at each step</p>
            <p><strong className="text-shakespeare-900">4. Quality Output:</strong> Purified water meets standards for the predicted use case</p>
          </div>
        </motion.div>
      </div>

      {/* Initial Metrics Display Phase */}
      {(simulationPhase === 'initial' || simulationPhase === 'analyzing') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphism-strong rounded-3xl p-8 mb-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-display font-bold text-shakespeare-900 mb-2">
              Current Batch Metrics
            </h3>
            <p className="text-shakespeare-700">Live sensor readings from incoming water</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {Object.entries(stageData[0].sensors).map(([key, value]) => (
              <motion.div
                key={key}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: Math.random() * 0.5 }}
                className="glassmorphism rounded-xl p-4 text-center"
              >
                <p className="text-shakespeare-600 text-sm uppercase mb-2">{key}</p>
                <motion.p
                  className="text-3xl font-display font-bold text-shakespeare-900"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {value}
                </motion.p>
                <p className="text-xs text-shakespeare-600 mt-1">
                  {key === 'pH' ? 'pH' : key === 'TDS' ? 'ppm' : key === 'turbidity' ? 'NTU' : key === 'temperature' ? '°C' : 'µS/cm'}
                </p>
              </motion.div>
            ))}
          </div>

          {mlPredictions.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center mb-6">
                <div className="inline-block glassmorphism rounded-full px-6 py-3 mb-4">
                  <p className="text-shakespeare-900 font-display font-semibold">
                    🤖 AI Analysis Complete - Ranking Suitable Uses
                  </p>
                </div>
                <h3 className="text-xl font-display font-bold text-shakespeare-900">
                  ML Predicted Intended Uses (Ranked by Suitability)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mlPredictions.map((option, idx) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`glassmorphism rounded-2xl p-6 text-left transition-all duration-300 border-2 ${
                      idx === 0 ? 'border-green-500/50 shadow-lg shadow-green-500/20' : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-4xl">{option.icon}</span>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.1 + 0.3 }}
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          option.matchScore >= 90 ? 'bg-green-500 text-white' :
                          option.matchScore >= 80 ? 'bg-aqua-teal text-white' :
                          'bg-shakespeare-400 text-white'
                        }`}
                      >
                        {option.matchScore}% Match
                      </motion.div>
                    </div>
                    <h4 className="font-display font-bold text-shakespeare-900 mb-2">
                      {option.name}
                    </h4>
                    <p className="text-sm text-shakespeare-700 mb-3">
                      {option.description}
                    </p>
                    <div className="text-xs text-shakespeare-600 space-y-1">
                      <p><strong>pH:</strong> {option.requirements.pH.join('-')}</p>
                      <p><strong>TDS:</strong> {option.requirements.TDS}</p>
                      <p><strong>Turbidity:</strong> {option.requirements.turbidity}</p>
                    </div>
                    {idx === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        className="mt-3 bg-green-500 text-white text-xs font-semibold px-3 py-2 rounded-lg text-center"
                      >
                        ✓ Selected by AI
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center text-shakespeare-700 mt-6 font-semibold"
              >
                🎯 AI automatically selecting best match: {mlPredictions[0]?.name}
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Processing and Complete Phases - Pipeline Visualization */}
      {(simulationPhase === 'processing' || simulationPhase === 'complete') && (
        <>
          {selectedUse && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glassmorphism rounded-2xl p-4 mb-6 text-center"
            >
              <p className="text-shakespeare-900 font-display font-semibold">
                {selectedUse.icon} Purifying for: <span className="text-royal-blue">{selectedUse.name}</span>
              </p>
              <p className="text-shakespeare-700 text-sm mt-1">
                Water flows through optimized treatment stages to meet quality standards
              </p>
            </motion.div>
          )}

          <div className="relative glassmorphism-strong rounded-3xl p-8 overflow-hidden mb-8">
            <div className="relative w-full h-[500px]">
              {/* SVG for flow paths */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="activeWaterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0046FF" stopOpacity="0.8">
                      <animate attributeName="stop-opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="50%" stopColor="#4ac0e6" stopOpacity="1">
                      <animate attributeName="offset" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%" stopColor="#73C8D2" stopOpacity="0.8">
                      <animate attributeName="stop-opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
                    </stop>
                  </linearGradient>

                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {flowPaths.map((path, idx) => {
                  const isActivePath = simulationPhase === 'processing' && idx <= currentStage;
                  const isCurrentPath = simulationPhase === 'processing' && idx === currentStage;
                  const isCompletePath = simulationPhase === 'complete';
                  
                  return (
                    <g key={idx}>
                      <motion.path
                        d={path.path}
                        fill="none"
                        stroke="#c0e7f7"
                        strokeWidth="2"
                        strokeOpacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: idx * 0.3 }}
                      />

                      {(isActivePath || isCompletePath) && (
                        <motion.path
                          d={path.path}
                          fill="none"
                          stroke="url(#activeWaterGradient)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          filter="url(#glow)"
                          initial={{ pathLength: 0, pathOffset: 0 }}
                          animate={{ 
                            pathLength: isCurrentPath ? [0, 0.4, 0] : 1,
                            pathOffset: isCurrentPath ? [0, 1, 1] : 0
                          }}
                          transition={{ 
                            duration: isCurrentPath ? 3 : 1.5,
                            repeat: isCurrentPath ? Infinity : 0,
                            ease: "linear"
                          }}
                        />
                      )}

                      {isCurrentPath && [...Array(4)].map((_, i) => (
                        <motion.circle
                          key={`droplet-${idx}-${i}`}
                          r="1"
                          fill="#4ac0e6"
                          filter="url(#glow)"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.75,
                            ease: "linear"
                          }}
                        >
                          <animateMotion
                            dur="3s"
                            repeatCount="indefinite"
                            begin={`${i * 0.75}s`}
                            path={path.path}
                          />
                        </motion.circle>
                      ))}
                    </g>
                  );
                })}
              </svg>

              {/* Stage nodes */}
              {stageData.map((stage, idx) => {
                const isCurrentStage = simulationPhase === 'processing' && 
                  ['stage-initial', 'stage-1', 'stage-2', 'stage-3', 'stage-output'][currentStage] === stage.id;
                const isPastStage = simulationPhase === 'processing' && idx < currentStage;
                const isCompleteStage = simulationPhase === 'complete' && stage.id === 'stage-output';
                
                return (
                  <motion.div
                    key={stage.id}
                    className="absolute"
                    style={{
                      left: `${stage.position.x}%`,
                      top: `${stage.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      y: isCurrentStage || isCompleteStage ? [0, -10, 0] : 0
                    }}
                    transition={{ 
                      delay: idx * 0.2,
                      y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <StageNode
                      stage={stage}
                      isCurrent={isCurrentStage}
                    />

                    {isCurrentStage && (
                      <motion.div
                        className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="bg-royal-blue text-white px-4 py-2 rounded-full text-sm font-display font-semibold shadow-lg">
                          ⚡ Processing...
                        </div>
                      </motion.div>
                    )}

                    {isPastStage && stage.status === 'active' && (
                      <motion.div
                        className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-display font-semibold shadow-lg">
                          ✓ Complete
                        </div>
                      </motion.div>
                    )}

                    {isCompleteStage && (
                      <motion.div
                        className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="bg-gradient-to-r from-green-500 to-aqua-teal text-white px-4 py-2 rounded-full text-sm font-display font-semibold shadow-lg">
                          🎉 Ready!
                        </div>
                      </motion.div>
                    )}

                    {stage.sensors && (isCurrentStage || isPastStage || isCompleteStage) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 glassmorphism rounded-xl p-3 shadow-xl min-w-[180px] z-10"
                      >
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-shakespeare-600">pH</p>
                            <p className="font-bold text-shakespeare-900">{stage.sensors.pH}</p>
                          </div>
                          <div>
                            <p className="text-shakespeare-600">TDS</p>
                            <p className="font-bold text-shakespeare-900">{stage.sensors.TDS}</p>
                          </div>
                          <div>
                            <p className="text-shakespeare-600">Turbidity</p>
                            <p className="font-bold text-shakespeare-900">{stage.sensors.turbidity}</p>
                          </div>
                          <div>
                            <p className="text-shakespeare-600">Temp</p>
                            <p className="font-bold text-shakespeare-900">{stage.sensors.temperature}°C</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Complete Phase Summary */}
      {simulationPhase === 'complete' && selectedUse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 glassmorphism-strong rounded-3xl p-8 border-2 border-green-500/30"
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="inline-block text-6xl mb-4"
            >
              ✅
            </motion.div>
            <h3 className="text-3xl font-display font-bold text-shakespeare-900 mb-2">
              Purification Complete!
            </h3>
            <p className="text-shakespeare-700 text-lg">
              Water is now ready for <span className="font-semibold text-royal-blue">{selectedUse.name}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="glassmorphism rounded-xl p-6 text-center">
              <p className="text-shakespeare-600 mb-2">Total Processing Time</p>
              <p className="text-3xl font-display font-bold text-shakespeare-900">30 seconds</p>
              <p className="text-sm text-shakespeare-600 mt-1">(Simulated: ~45 mins real-time)</p>
            </div>
            <div className="glassmorphism rounded-xl p-6 text-center">
              <p className="text-shakespeare-600 mb-2">Quality Improvement</p>
              <p className="text-3xl font-display font-bold text-green-600">+87%</p>
              <p className="text-sm text-shakespeare-600 mt-1">From initial metrics</p>
            </div>
            <div className="glassmorphism rounded-xl p-6 text-center">
              <p className="text-shakespeare-600 mb-2">Suitability Score</p>
              <p className="text-3xl font-display font-bold text-aqua-teal">{selectedUse.matchScore}%</p>
              <p className="text-sm text-shakespeare-600 mt-1">For {selectedUse.name}</p>
            </div>
          </div>

          <div className="glassmorphism rounded-xl p-6 mb-6">
            <h4 className="font-display font-semibold text-shakespeare-900 mb-4">Final Water Quality Metrics</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(stageData.find(s => s.id === 'stage-output').sensors).map(([key, value]) => (
                <div key={key} className="text-center">
                  <p className="text-shakespeare-600 text-sm uppercase mb-1">{key}</p>
                  <p className="text-2xl font-display font-bold text-shakespeare-900">{value}</p>
                  <p className="text-xs text-green-600 mt-1">✓ Meets standards</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={resetSimulation}
              className="px-8 py-4 bg-gradient-to-r from-shakespeare-600 to-shakespeare-500 text-white rounded-full font-display font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              🔄 Run New Simulation
            </button>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}