"use client";

import { motion } from 'framer-motion';
import { Leaf, Zap, Droplet, TrendingDown, Brain, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CarbonSection() {
  const [co2Saved, setCo2Saved] = useState(0);
  const [energySaved, setEnergySaved] = useState(0);
  const [predicting, setPredicting] = useState(false);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const co2Interval = setInterval(() => {
      setCo2Saved(prev => (prev + 1) % 1247);
    }, 50);

    const energyInterval = setInterval(() => {
      setEnergySaved(prev => (prev + 1) % 892);
    }, 70);

    return () => {
      clearInterval(co2Interval);
      clearInterval(energyInterval);
    };
  }, []);

  const metrics = [
    { label: "Pumping energy", icon: Zap, value: "↓ 23%" },
    { label: "Aeration load", icon: TrendingDown, value: "↓ 18%" },
    { label: "Freshwater extraction", icon: Droplet, value: "↓ 31%" },
    { label: "Wastewater discharge", icon: TrendingDown, value: "↓ 27%" }
  ];

  const handlePredict = () => {
    setPredicting(true);
    // Simulate AI prediction for next 7 days
    setTimeout(() => {
      const daysAhead = 7;
      const projectedCO2 = Math.floor(8500 + Math.random() * 2000);
      const projectedEnergy = Math.floor(6200 + Math.random() * 1500);
      const costSavings = Math.floor(45000 + Math.random() * 15000);
      
      setPrediction({
        daysAhead,
        projectedCO2,
        projectedEnergy,
        costSavings,
        dailyBreakdown: Array.from({ length: 7 }, (_, i) => ({
          day: i + 1,
          co2: Math.floor(1100 + Math.random() * 300),
          energy: Math.floor(800 + Math.random() * 200)
        })),
        confidence: Math.floor(91 + Math.random() * 7),
        timestamp: new Date().toLocaleTimeString()
      });
      setPredicting(false);
    }, 2000);
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-sand-gold via-shakespeare-100 to-shakespeare-200 overflow-hidden">
      {/* Animated leaf particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, Math.random() * 60 - 30, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Leaf className="w-4 h-4 text-royal-blue opacity-20" />
          </motion.div>
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
            🌱 INNOVATION #2
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-shakespeare-950 mb-4">
            Carbon Footprint Optimizer
          </h2>
          <p className="text-2xl text-royal-blue font-semibold">(Green Impact Score)</p>
          <p className="text-lg text-shakespeare-700 mt-4 max-w-3xl mx-auto">
            Real-time sustainability scoring for every drop reused.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Animated Meter/Gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative space-y-6"
          >
            <div className="glassmorphism-strong rounded-3xl p-10 border-2 border-royal-blue/30 shadow-2xl">
              {/* Real-time counters */}
              <div className="space-y-8">
                {/* CO2 Counter */}
                <motion.div
                  className="relative p-8 rounded-2xl bg-gradient-to-br from-royal-blue/20 to-aqua-teal/20 border border-royal-blue/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-shakespeare-800 font-semibold">CO₂ Saved Today</span>
                    <TrendingDown className="w-5 h-5 text-royal-blue" />
                  </div>
                  <div className="text-5xl font-bold text-royal-blue mb-2">
                    {co2Saved} <span className="text-2xl text-shakespeare-600">kg</span>
                  </div>
                  <div className="w-full h-2 bg-shakespeare-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-royal-blue to-aqua-teal"
                      initial={{ width: 0 }}
                      animate={{ width: `${(co2Saved / 1247) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>

                {/* Energy Counter */}
                <motion.div
                  className="relative p-8 rounded-2xl bg-gradient-to-br from-aqua-teal/20 to-royal-blue/20 border border-aqua-teal/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-shakespeare-800 font-semibold">Energy Saved Today</span>
                    <Zap className="w-5 h-5 text-aqua-teal" />
                  </div>
                  <div className="text-5xl font-bold text-aqua-teal mb-2">
                    {energySaved} <span className="text-2xl text-shakespeare-600">kWh</span>
                  </div>
                  <div className="w-full h-2 bg-shakespeare-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-aqua-teal to-royal-blue"
                      initial={{ width: 0 }}
                      animate={{ width: `${(energySaved / 892) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>

                {/* 3D Leaf Animation */}
                <div className="relative flex justify-center py-8">
                  <motion.div
                    className="relative"
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-royal-blue to-aqua-teal flex items-center justify-center shadow-2xl shadow-royal-blue/30">
                      <Leaf className="w-16 h-16 text-white" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Prediction Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePredict}
              disabled={predicting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-royal-blue to-aqua-teal text-white font-bold text-lg shadow-lg hover:shadow-royal-blue/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Brain className="w-6 h-6" />
              {predicting ? 'Calculating...' : 'Predict Future Savings (7 Days)'}
            </motion.button>
          </motion.div>

          {/* Right: Content + Prediction Output */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-shakespeare-900 mb-6">Based on intelligent analysis of:</h3>
              
              <div className="grid grid-cols-1 gap-4 mb-8">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, x: 10 }}
                    className="flex items-center gap-4 p-5 rounded-xl bg-white/80 border-2 border-royal-blue/20 hover:border-royal-blue/50 transition-all shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-royal-blue to-aqua-teal flex items-center justify-center shadow-md">
                      <metric.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-shakespeare-800 font-medium">{metric.label}</p>
                    </div>
                    <span className="text-2xl font-bold text-royal-blue">{metric.value}</span>
                  </motion.div>
                ))}
              </div>

              {/* India CSR Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-gradient-to-r from-royal-blue/20 to-aqua-teal/20 border-2 border-royal-blue/30"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🇮🇳</span>
                  <div>
                    <h3 className="text-royal-blue font-bold text-lg mb-2">Boosts India's CSR & Sustainability Goals</h3>
                    <p className="text-shakespeare-700 text-sm leading-relaxed">
                      Helps Indian industries meet environmental compliance and corporate social responsibility targets while reducing operational costs.
                    </p>
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
                  <Calendar className="w-6 h-6 text-royal-blue" />
                  7-Day Forecast
                </h3>

                {/* Summary cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-royal-blue/10 to-aqua-teal/10 border border-royal-blue/30">
                    <div className="text-xs text-shakespeare-600 mb-1">Total CO₂ Savings</div>
                    <div className="text-3xl font-bold text-royal-blue">
                      {prediction.projectedCO2} <span className="text-sm">kg</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-aqua-teal/10 to-royal-blue/10 border border-aqua-teal/30">
                    <div className="text-xs text-shakespeare-600 mb-1">Total Energy Savings</div>
                    <div className="text-3xl font-bold text-aqua-teal">
                      {prediction.projectedEnergy} <span className="text-sm">kWh</span>
                    </div>
                  </div>
                </div>

                {/* Cost savings */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-shakespeare-700 font-semibold">Estimated Cost Savings</span>
                    <span className="text-3xl font-bold text-green-600">₹{prediction.costSavings.toLocaleString()}</span>
                  </div>
                </div>

                {/* Daily breakdown chart */}
                <div className="mb-4">
                  <h4 className="text-shakespeare-700 text-sm font-semibold mb-3">Daily Breakdown:</h4>
                  <div className="space-y-2">
                    {prediction.dailyBreakdown.map((day, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="text-shakespeare-600 text-xs w-12">Day {day.day}</span>
                        <div className="flex-1 flex gap-2">
                          <div className="flex-1 h-8 rounded bg-royal-blue/10 relative overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(day.co2 / 1400) * 100}%` }}
                              className="h-full bg-gradient-to-r from-royal-blue to-royal-blue/70 flex items-center justify-end pr-2"
                              transition={{ duration: 0.8, delay: idx * 0.1 }}
                            >
                              <span className="text-xs font-semibold text-white">{day.co2}kg</span>
                            </motion.div>
                          </div>
                          <div className="flex-1 h-8 rounded bg-aqua-teal/10 relative overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(day.energy / 1000) * 100}%` }}
                              className="h-full bg-gradient-to-r from-aqua-teal to-aqua-teal/70 flex items-center justify-end pr-2"
                              transition={{ duration: 0.8, delay: idx * 0.1 }}
                            >
                              <span className="text-xs font-semibold text-white">{day.energy}kWh</span>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confidence */}
                <div className="flex items-center justify-between text-xs text-shakespeare-600">
                  <span>Prediction Confidence: <span className="text-royal-blue font-bold">{prediction.confidence}%</span></span>
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