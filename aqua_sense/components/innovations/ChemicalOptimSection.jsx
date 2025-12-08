"use client";

import { motion } from 'framer-motion';
import { Beaker, TrendingDown, Sparkles, Clock, Brain, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ChemicalOptimSection() {
  const [liveDosage, setLiveDosage] = useState({
    alum: 12.5,
    polymer: 3.2,
    chlorine: 1.8,
    coagulant: 8.4,
    aeration: 45
  });

  const [predicting, setPredicting] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const chemicals = [
    { name: "Alum", reduction: "15-25%", icon: "⚗️", color: "aqua-teal" },
    { name: "Polymer", reduction: "20-30%", icon: "🧪", color: "royal-blue" },
    { name: "Chlorine", reduction: "10-20%", icon: "💧", color: "aqua-teal" },
    { name: "Coagulants", reduction: "15-28%", icon: "🔬", color: "royal-blue" },
    { name: "Aeration", reduction: "12-22%", icon: "🌀", color: "aqua-teal" }
  ];

  // Simulate live dosage updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveDosage({
        alum: parseFloat((10 + Math.random() * 5).toFixed(1)),
        polymer: parseFloat((2.5 + Math.random() * 1.5).toFixed(1)),
        chlorine: parseFloat((1.5 + Math.random() * 0.8).toFixed(1)),
        coagulant: parseFloat((7 + Math.random() * 3).toFixed(1)),
        aeration: Math.floor(40 + Math.random() * 15)
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handlePredict = () => {
    setPredicting(true);
    // Simulate AI prediction
    setTimeout(() => {
      const costSavings = Math.floor(15000 + Math.random() * 10000);
      const efficiency = Math.floor(82 + Math.random() * 15);
      
      setPrediction({
        costSavings,
        efficiency,
        recommendations: [
          { chemical: "Alum", current: liveDosage.alum, optimized: (liveDosage.alum * 0.78).toFixed(1), unit: "mg/L", savings: "22%" },
          { chemical: "Polymer", current: liveDosage.polymer, optimized: (liveDosage.polymer * 0.72).toFixed(1), unit: "mg/L", savings: "28%" },
          { chemical: "Chlorine", current: liveDosage.chlorine, optimized: (liveDosage.chlorine * 0.85).toFixed(1), unit: "mg/L", savings: "15%" },
          { chemical: "Coagulant", current: liveDosage.coagulant, optimized: (liveDosage.coagulant * 0.76).toFixed(1), unit: "mg/L", savings: "24%" },
          { chemical: "Aeration", current: liveDosage.aeration, optimized: Math.floor(liveDosage.aeration * 0.82), unit: "min", savings: "18%" }
        ],
        waterQuality: {
          ph: 7.2,
          turbidity: 1.8,
          do: 6.8,
          tds: 340
        },
        confidence: Math.floor(91 + Math.random() * 7),
        timestamp: new Date().toLocaleTimeString()
      });
      setPredicting(false);
    }, 2000);
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-aqua-teal/20 via-shakespeare-100 to-royal-blue/20 overflow-hidden">
      {/* Floating chemical molecules */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-royal-blue opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="px-4 py-2 rounded-full bg-royal-blue/20 text-royal-blue text-xs font-semibold border border-royal-blue/30 inline-block mb-4">
            🧪 INNOVATION #4
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-shakespeare-950 mb-4">
            AI Chemical Recipe Recommendation
          </h2>
          <p className="text-2xl text-royal-blue font-semibold">(Precision Dosage Engine)</p>
          <p className="text-lg text-shakespeare-700 mt-4 max-w-3xl mx-auto">
            Use the perfect amount of treatment chemicals — every time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: 3D Chemical Beakers Animation + Live Dosage */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative space-y-6"
          >
            <div className="glassmorphism-strong rounded-3xl p-10 border-2 border-royal-blue/30 shadow-2xl">
              {/* Central beaker */}
              <div className="relative w-full max-w-sm mx-auto mb-8">
                <motion.div
                  className="relative"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {/* Main beaker */}
                  <div className="relative w-48 h-64 mx-auto">
                    <svg viewBox="0 0 200 300" className="w-full h-full">
                      {/* Beaker outline */}
                      <path
                        d="M 60,50 L 60,220 Q 60,260 100,260 Q 140,260 140,220 L 140,50 Z"
                        fill="url(#beakerGradient)"
                        stroke="#1488b5"
                        strokeWidth="3"
                        opacity="0.8"
                      />
                      
                      {/* Liquid inside */}
                      <motion.path
                        d="M 65,180 L 65,220 Q 65,255 100,255 Q 135,255 135,220 L 135,180 Z"
                        fill="url(#liquidGradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.6, 0.9, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      
                      {/* Measurement lines */}
                      {[100, 130, 160, 190].map((y, i) => (
                        <line
                          key={i}
                          x1="65"
                          y1={y}
                          x2="80"
                          y2={y}
                          stroke="#1488b5"
                          strokeWidth="1"
                        />
                      ))}

                      {/* Gradients */}
                      <defs>
                        <linearGradient id="beakerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#f1fafe', stopOpacity: 0.3}} />
                          <stop offset="100%" style={{stopColor: '#c0e7f7', stopOpacity: 0.6}} />
                        </linearGradient>
                        <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#73C8D2', stopOpacity: 0.8}} />
                          <stop offset="100%" style={{stopColor: '#0046FF', stopOpacity: 0.9}} />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Bubbles rising */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-white/60"
                        style={{
                          left: `${40 + Math.random() * 20}%`,
                          bottom: '20%',
                        }}
                        animate={{
                          y: [-100, -200],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </div>

                  {/* Ripple effect around beaker */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-aqua-teal"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>

                {/* Cost savings badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full bg-gradient-to-r from-royal-blue to-aqua-teal text-white font-bold shadow-xl"
                >
                  <TrendingDown className="inline w-5 h-5 mr-2" />
                  10-30% Cost Reduction
                </motion.div>
              </div>

              {/* Predict Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePredict}
                disabled={predicting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-royal-blue to-aqua-teal text-white font-bold text-lg shadow-lg hover:shadow-royal-blue/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
              >
                <Brain className="w-6 h-6" />
                {predicting ? 'Optimizing...' : 'Optimize Chemical Dosage'}
              </motion.button>
            </div>

            {/* Live Dosage Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="glassmorphism-strong rounded-2xl p-6 border-2 border-royal-blue/30"
            >
              <h3 className="text-shakespeare-900 font-bold text-lg mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-royal-blue" />
                Current Dosage Levels
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 border border-royal-blue/20">
                  <span className="text-shakespeare-700 text-sm font-medium">Alum</span>
                  <motion.span 
                    key={liveDosage.alum}
                    initial={{ scale: 1.2, color: '#0046FF' }}
                    animate={{ scale: 1, color: '#0e3143' }}
                    className="text-xl font-bold"
                  >
                    {liveDosage.alum} <span className="text-xs text-shakespeare-600">mg/L</span>
                  </motion.span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 border border-royal-blue/20">
                  <span className="text-shakespeare-700 text-sm font-medium">Polymer</span>
                  <motion.span 
                    key={liveDosage.polymer}
                    initial={{ scale: 1.2, color: '#0046FF' }}
                    animate={{ scale: 1, color: '#0e3143' }}
                    className="text-xl font-bold"
                  >
                    {liveDosage.polymer} <span className="text-xs text-shakespeare-600">mg/L</span>
                  </motion.span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 border border-royal-blue/20">
                  <span className="text-shakespeare-700 text-sm font-medium">Chlorine</span>
                  <motion.span 
                    key={liveDosage.chlorine}
                    initial={{ scale: 1.2, color: '#0046FF' }}
                    animate={{ scale: 1, color: '#0e3143' }}
                    className="text-xl font-bold"
                  >
                    {liveDosage.chlorine} <span className="text-xs text-shakespeare-600">mg/L</span>
                  </motion.span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 border border-royal-blue/20">
                  <span className="text-shakespeare-700 text-sm font-medium">Aeration Time</span>
                  <motion.span 
                    key={liveDosage.aeration}
                    initial={{ scale: 1.2, color: '#0046FF' }}
                    animate={{ scale: 1, color: '#0e3143' }}
                    className="text-xl font-bold"
                  >
                    {liveDosage.aeration} <span className="text-xs text-shakespeare-600">min</span>
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Chemical Cards + Prediction Output */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-shakespeare-900 mb-6">Precision dosage guidance for:</h3>

              <div className="space-y-4 mb-8">
                {chemicals.map((chemical, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="relative overflow-hidden rounded-xl bg-white/90 border-2 border-royal-blue/20 hover:border-royal-blue/50 transition-all shadow-lg p-5"
                  >
                    {/* Ripple background effect */}
                    <motion.div
                      className={`absolute inset-0 bg-${chemical.color}/5`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.1, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${chemical.color} to-royal-blue flex items-center justify-center text-2xl shadow-lg`}>
                          {chemical.icon}
                        </div>
                        <div>
                          <h4 className="text-shakespeare-900 font-bold text-lg">{chemical.name}</h4>
                          <p className="text-shakespeare-600 text-sm">Optimized dosing</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-royal-blue">{chemical.reduction}</div>
                        <div className="text-xs text-shakespeare-600">reduction</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* AI Reasoning Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-gradient-to-r from-royal-blue/20 to-aqua-teal/20 border-2 border-royal-blue/30"
              >
                <div className="flex items-start gap-3">
                  <Brain className="w-6 h-6 text-royal-blue flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-royal-blue font-bold text-lg mb-2 flex items-center gap-2">
                      AI-Powered Adaptation
                      <Sparkles className="w-4 h-4" />
                    </h4>
                    <p className="text-shakespeare-700 text-sm leading-relaxed mb-3">
                      AI adapts dosage based on <span className="font-semibold text-royal-blue">hourly changes</span> in water quality parameters.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-shakespeare-600">
                      <Clock className="w-4 h-4" />
                      <span>Real-time adjustments every 15 minutes</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Prediction Output Panel */}
            {prediction && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="glassmorphism-strong rounded-2xl p-6 border-2 border-royal-blue/30 shadow-2xl"
              >
                <h3 className="text-shakespeare-900 font-bold text-xl mb-4 flex items-center gap-2">
                  <Beaker className="w-6 h-6 text-royal-blue" />
                  Optimized Recipe
                </h3>

                {/* Summary cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                    <div className="text-xs text-shakespeare-600 mb-1">Monthly Savings</div>
                    <div className="text-3xl font-bold text-green-600">₹{prediction.costSavings.toLocaleString()}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-royal-blue/10 to-aqua-teal/10 border border-royal-blue/30">
                    <div className="text-xs text-shakespeare-600 mb-1">Treatment Efficiency</div>
                    <div className="text-3xl font-bold text-royal-blue">{prediction.efficiency}%</div>
                  </div>
                </div>

                {/* Dosage recommendations */}
                <div className="mb-4">
                  <h4 className="text-shakespeare-700 text-sm font-semibold mb-3">Recommended Changes:</h4>
                  <div className="space-y-2">
                    {prediction.recommendations.map((rec, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-white/50 border border-royal-blue/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-shakespeare-800 font-medium text-sm">{rec.chemical}</span>
                          <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-700 text-xs font-bold">
                            ↓ {rec.savings}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-shakespeare-600">Current: <span className="font-bold text-shakespeare-800">{rec.current} {rec.unit}</span></span>
                          <span className="text-shakespeare-400">→</span>
                          <span className="text-royal-blue">Optimized: <span className="font-bold">{rec.optimized} {rec.unit}</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expected water quality */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-royal-blue/10 to-aqua-teal/10 border border-royal-blue/20 mb-4">
                  <h4 className="text-shakespeare-700 text-sm font-semibold mb-2">Expected Water Quality:</h4>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>
                      <div className="text-shakespeare-600">pH</div>
                      <div className="font-bold text-shakespeare-800">{prediction.waterQuality.ph}</div>
                    </div>
                    <div>
                      <div className="text-shakespeare-600">Turbidity</div>
                      <div className="font-bold text-shakespeare-800">{prediction.waterQuality.turbidity} NTU</div>
                    </div>
                    <div>
                      <div className="text-shakespeare-600">DO</div>
                      <div className="font-bold text-shakespeare-800">{prediction.waterQuality.do} mg/L</div>
                    </div>
                    <div>
                      <div className="text-shakespeare-600">TDS</div>
                      <div className="font-bold text-shakespeare-800">{prediction.waterQuality.tds} ppm</div>
                    </div>
                  </div>
                </div>

                {/* Confidence */}
                <div className="flex items-center justify-between text-xs text-shakespeare-600">
                  <span>Optimization Confidence: <span className="text-royal-blue font-bold">{prediction.confidence}%</span></span>
                  <span>Generated at {prediction.timestamp}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}