'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function BatchInputPanel({ onStartBatch }) {
  const [batchData, setBatchData] = useState({
    pH: 7.2,
    TDS: 420,
    turbidity: 8.5,
    DO: 6.5,
    temperature: 24.5,
    flowRate: 45.2
  });

  const handleStartBatch = () => {
    onStartBatch(batchData);
  };

  const handleRandomize = () => {
    setBatchData({
      pH: (6 + Math.random() * 3).toFixed(1),
      TDS: Math.floor(200 + Math.random() * 500),
      turbidity: (Math.random() * 15).toFixed(1),
      DO: (4 + Math.random() * 6).toFixed(1),
      temperature: (20 + Math.random() * 15).toFixed(1),
      flowRate: (30 + Math.random() * 30).toFixed(1)
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism-strong rounded-3xl p-8 border-2 border-white/30"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-shakespeare-900 mb-2">
            🌊 Current Batch Data
          </h2>
          <p className="text-shakespeare-700">Live sensor readings from IoT devices</p>
        </div>
        <button
          onClick={handleRandomize}
          className="glassmorphism rounded-xl px-4 py-2 text-shakespeare-900 font-semibold hover:scale-105 transition-all duration-300"
        >
          🎲 Randomize
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {Object.entries(batchData).map(([key, value]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.05 }}
            className="glassmorphism rounded-xl p-4 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-shakespeare-400/10 to-aqua-teal/10 animate-liquid-morph"></div>
            <div className="relative z-10">
              <p className="text-shakespeare-600 text-xs uppercase font-semibold mb-1">
                {key === 'DO' ? 'Dissolved O₂' : key === 'TDS' ? 'TDS' : key}
              </p>
              <p className="text-2xl font-display font-bold text-shakespeare-900">
                {value}
              </p>
              <p className="text-shakespeare-700 text-xs mt-1">
                {key === 'pH' ? 'pH' : 
                 key === 'TDS' ? 'ppm' : 
                 key === 'turbidity' ? 'NTU' : 
                 key === 'DO' ? 'mg/L' : 
                 key === 'temperature' ? '°C' : 
                 'L/min'}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleStartBatch}
        className="w-full bg-gradient-to-r from-royal-blue to-aqua-teal text-white font-display font-bold text-xl py-4 rounded-2xl shadow-xl shadow-royal-blue/30 hover:shadow-2xl hover:shadow-royal-blue/50 transition-all duration-300 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-aqua-teal to-royal-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="relative z-10 flex items-center justify-center gap-3">
          <span>▶️</span>
          <span>Start Batch Processing</span>
          <span>🚀</span>
        </span>
      </motion.button>
    </motion.div>
  );
}
