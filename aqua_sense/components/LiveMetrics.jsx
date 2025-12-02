'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Dummy sensor data - can be replaced with real API integration
const sensorData = [
  {
    id: 1,
    name: 'pH Level',
    value: 7.2,
    unit: 'pH',
    min: 6.5,
    max: 8.5,
    status: 'normal',
    icon: '⚗️'
  },
  {
    id: 2,
    name: 'TDS',
    value: 350,
    unit: 'ppm',
    min: 0,
    max: 500,
    status: 'normal',
    icon: '💧'
  },
  {
    id: 3,
    name: 'Turbidity',
    value: 2.8,
    unit: 'NTU',
    min: 0,
    max: 5,
    status: 'normal',
    icon: '🌊'
  },
  {
    id: 4,
    name: 'Dissolved Oxygen',
    value: 6.5,
    unit: 'mg/L',
    min: 5,
    max: 10,
    status: 'normal',
    icon: '🫧'
  },
  {
    id: 5,
    name: 'Temperature',
    value: 24.5,
    unit: '°C',
    min: 15,
    max: 30,
    status: 'normal',
    icon: '🌡️'
  },
  {
    id: 6,
    name: 'Flow Rate',
    value: 45.2,
    unit: 'L/min',
    min: 30,
    max: 60,
    status: 'normal',
    icon: '⚡'
  },
  {
    id: 7,
    name: 'Water Level',
    value: 78,
    unit: '%',
    min: 50,
    max: 100,
    status: 'normal',
    icon: '📊'
  },
  {
    id: 8,
    name: 'Pressure',
    value: 3.2,
    unit: 'bar',
    min: 2,
    max: 5,
    status: 'warning',
    icon: '🔧'
  }
];

function getStatusColor(status) {
  switch (status) {
    case 'normal':
      return 'from-emerald-400 to-emerald-600';
    case 'warning':
      return 'from-orange-accent to-orange-400';
    case 'critical':
      return 'from-red-500 to-red-700';
    default:
      return 'from-shakespeare-400 to-shakespeare-600';
  }
}

function getStatusBadge(status) {
  switch (status) {
    case 'normal':
      return 'bg-emerald-500/20 text-emerald-700 border-emerald-500/50';
    case 'warning':
      return 'bg-orange-500/20 text-orange-700 border-orange-500/50';
    case 'critical':
      return 'bg-red-500/20 text-red-700 border-red-500/50';
    default:
      return 'bg-shakespeare-500/20 text-shakespeare-700 border-shakespeare-500/50';
  }
}

export default function LiveMetrics() {
  const [liveData, setLiveData] = useState(sensorData);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => prev.map(sensor => ({
        ...sensor,
        value: parseFloat((sensor.value + (Math.random() - 0.5) * 0.2).toFixed(2))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative"
    >
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-5xl font-display font-bold text-shakespeare-900 mb-3"
        >
          Live Sensor Metrics
        </motion.h2>
        <p className="text-shakespeare-700 text-lg">Real-time water quality data from IoT sensors</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {liveData.map((sensor, index) => (
          <motion.div
            key={sensor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="relative group"
          >
            {/* Animated liquid card with glassmorphism */}
            <div className="glassmorphism-strong rounded-3xl p-6 hover:scale-105 transition-all duration-500 animate-liquid-morph hover:shadow-2xl hover:shadow-shakespeare-400/30 border-2 border-white/30 relative overflow-hidden">
              {/* Ripple effect background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-shakespeare-400/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ripple-3d"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl animate-float">{sensor.icon}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(sensor.status)} uppercase`}>
                    {sensor.status}
                  </span>
                </div>

                <h3 className="text-shakespeare-900 font-display font-semibold text-lg mb-2">
                  {sensor.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-3">
                  <motion.span
                    key={sensor.value}
                    initial={{ scale: 1.2, color: '#4ac0e6' }}
                    animate={{ scale: 1, color: '#0e3143' }}
                    className="text-4xl font-display font-bold text-shakespeare-950"
                  >
                    {sensor.value}
                  </motion.span>
                  <span className="text-shakespeare-700 text-sm font-medium">{sensor.unit}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-shakespeare-200/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((sensor.value - sensor.min) / (sensor.max - sensor.min)) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full bg-gradient-to-r ${getStatusColor(sensor.status)} rounded-full`}
                  />
                </div>

                <div className="flex justify-between text-xs text-shakespeare-600 mt-1">
                  <span>{sensor.min} {sensor.unit}</span>
                  <span>{sensor.max} {sensor.unit}</span>
                </div>
              </div>

              {/* Glow effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl bg-gradient-to-br ${getStatusColor(sensor.status)} transition-opacity duration-500 pointer-events-none`}></div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
