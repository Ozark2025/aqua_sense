"use client";

import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Activity, Clock, MapPin, Brain, Droplets } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LeakDetectionSection() {
  const [liveMetrics, setLiveMetrics] = useState({
    pressure: 3.2,
    flowRate: 45.2,
    inflow: 46.1,
    leakage: 0.9
  });

  const [predicting, setPredicting] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const features = [
    { icon: TrendingDown, label: "Tiny pressure drops", desc: "Real-time detection" },
    { icon: Activity, label: "Flow-inflow mismatch", desc: "Pattern analysis" },
    { icon: TrendingDown, label: "Rate-of-change anomalies", desc: "ML prediction" },
    { icon: Clock, label: "Overnight zero-usage", desc: "Smart alerts" }
  ];

  const leakPoints = [
    { x: 20, y: 30, severity: "high" },
    { x: 45, y: 50, severity: "medium" },
    { x: 70, y: 35, severity: "low" },
    { x: 85, y: 60, severity: "medium" }
  ];

  // Simulate live metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics({
        pressure: parseFloat((3 + Math.random() * 0.5).toFixed(2)),
        flowRate: parseFloat((40 + Math.random() * 10).toFixed(1)),
        inflow: parseFloat((41 + Math.random() * 10).toFixed(1)),
        leakage: parseFloat((Math.random() * 2).toFixed(2))
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePredict = () => {
    setPredicting(true);
    // Simulate AI prediction
    setTimeout(() => {
      const potentialLeaks = Math.floor(2 + Math.random() * 4);
      const waterLoss = Math.floor(1200 + Math.random() * 1800);
      const costImpact = Math.floor(8000 + Math.random() * 12000);
      
      setPrediction({
        potentialLeaks,
        waterLoss,
        costImpact,
        locations: [
          { zone: "Sector A - Pipeline 3", probability: 87, severity: "High" },
          { zone: "Sector B - Junction 12", probability: 65, severity: "Medium" },
          { zone: "Sector C - Valve 7", probability: 52, severity: "Medium" },
          { zone: "Sector D - Main Line", probability: 34, severity: "Low" }
        ],
        timeframe: "Next 48 hours",
        confidence: Math.floor(89 + Math.random() * 9),
        timestamp: new Date().toLocaleTimeString()
      });
      setPredicting(false);
    }, 2000);
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-shakespeare-950 via-shakespeare-900 to-shakespeare-800 overflow-hidden">
      {/* Neon glow effects */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-accent to-transparent opacity-80" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-accent to-transparent opacity-80" />

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-orange-accent opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
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
          <span className="px-4 py-2 rounded-full bg-orange-accent/20 text-orange-accent text-xs font-semibold border border-orange-accent/30 inline-block mb-4">
            🔎 INNOVATION #3
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Leak-Level Localization
          </h2>
          <p className="text-2xl text-orange-accent font-semibold">(AI + Flow Pattern Analysis)</p>
          <p className="text-lg text-shakespeare-200 mt-4 max-w-3xl mx-auto">
            Find leaks before they waste thousands of liters.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Content + Live Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glassmorphism-strong rounded-3xl p-10 border-2 border-orange-accent/30 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">AI detects leaks using:</h3>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-start gap-4 p-5 rounded-xl bg-shakespeare-800/50 border border-orange-accent/20 hover:border-orange-accent/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-accent to-shakespeare-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-accent/30">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-1">{feature.label}</h4>
                      <p className="text-shakespeare-300 text-sm">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-orange-accent/10 border border-orange-accent/30">
                  <div className="text-3xl font-bold text-orange-accent mb-1">98.7%</div>
                  <div className="text-xs text-shakespeare-300">Detection Accuracy</div>
                </div>
                <div className="p-4 rounded-xl bg-orange-accent/10 border border-orange-accent/30">
                  <div className="text-3xl font-bold text-orange-accent mb-1">&lt;5min</div>
                  <div className="text-xs text-shakespeare-300">Response Time</div>
                </div>
              </div>

              {/* Predict Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePredict}
                disabled={predicting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-accent to-red-500 text-white font-bold text-lg shadow-lg hover:shadow-orange-accent/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Brain className="w-6 h-6" />
                {predicting ? 'Analyzing...' : 'Predict Potential Leaks'}
              </motion.button>
            </div>

            {/* Live Metrics Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="glassmorphism-strong rounded-2xl p-6 border-2 border-orange-accent/30"
            >
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-orange-accent" />
                Live Flow Metrics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-shakespeare-800/50 border border-orange-accent/20">
                  <div className="text-xs text-shakespeare-300 mb-1">Pressure</div>
                  <motion.div 
                    key={liveMetrics.pressure}
                    initial={{ scale: 1.2, color: '#FF9013' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                    className="text-2xl font-bold text-white"
                  >
                    {liveMetrics.pressure} <span className="text-sm text-shakespeare-400">bar</span>
                  </motion.div>
                </div>
                <div className="p-3 rounded-lg bg-shakespeare-800/50 border border-orange-accent/20">
                  <div className="text-xs text-shakespeare-300 mb-1">Flow Rate</div>
                  <motion.div 
                    key={liveMetrics.flowRate}
                    initial={{ scale: 1.2, color: '#FF9013' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                    className="text-2xl font-bold text-white"
                  >
                    {liveMetrics.flowRate} <span className="text-sm text-shakespeare-400">L/min</span>
                  </motion.div>
                </div>
                <div className="p-3 rounded-lg bg-shakespeare-800/50 border border-orange-accent/20">
                  <div className="text-xs text-shakespeare-300 mb-1">Inflow</div>
                  <motion.div 
                    key={liveMetrics.inflow}
                    initial={{ scale: 1.2, color: '#FF9013' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                    className="text-2xl font-bold text-white"
                  >
                    {liveMetrics.inflow} <span className="text-sm text-shakespeare-400">L/min</span>
                  </motion.div>
                </div>
                <div className="p-3 rounded-lg bg-shakespeare-800/50 border border-red-500/30">
                  <div className="text-xs text-shakespeare-300 mb-1">Leakage</div>
                  <motion.div 
                    key={liveMetrics.leakage}
                    initial={{ scale: 1.2, color: '#FF9013' }}
                    animate={{ scale: 1, color: liveMetrics.leakage > 1 ? '#ef4444' : '#ffffff' }}
                    className="text-2xl font-bold"
                  >
                    {liveMetrics.leakage} <span className="text-sm text-shakespeare-400">L/min</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Pipeline Animation + Prediction Output */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative space-y-6"
          >
            <div className="glassmorphism-strong rounded-3xl p-10 border-2 border-orange-accent/30 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-accent" />
                Leak Location Heatmap
              </h3>

              {/* Animated Pipeline */}
              <div className="relative w-full h-96 rounded-2xl bg-shakespeare-900/50 border border-orange-accent/20 overflow-hidden">
                {/* Pipeline network */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  {/* Main pipeline */}
                  <motion.path
                    d="M 10,50 L 90,50"
                    stroke="#73C8D2"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                  />
                  
                  {/* Branch pipes */}
                  <motion.path
                    d="M 30,50 L 30,20"
                    stroke="#73C8D2"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <motion.path
                    d="M 50,50 L 50,70"
                    stroke="#73C8D2"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.7 }}
                  />
                  <motion.path
                    d="M 70,50 L 70,30"
                    stroke="#73C8D2"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.9 }}
                  />
                </svg>

                {/* Water flow animation */}
                <motion.div
                  className="absolute top-1/2 left-0 w-4 h-4 rounded-full bg-aqua-teal shadow-lg shadow-aqua-teal/50"
                  animate={{
                    left: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Leak points */}
                {leakPoints.map((leak, index) => (
                  <motion.div
                    key={index}
                    className="absolute"
                    style={{
                      left: `${leak.x}%`,
                      top: `${leak.y}%`,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + index * 0.2 }}
                  >
                    {/* Pulsing leak indicator */}
                    <motion.div
                      className={`w-4 h-4 rounded-full ${
                        leak.severity === 'high' ? 'bg-red-500' :
                        leak.severity === 'medium' ? 'bg-orange-accent' :
                        'bg-yellow-400'
                      } shadow-lg`}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                    
                    {/* Ripple effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-full ${
                        leak.severity === 'high' ? 'border-red-500' :
                        leak.severity === 'medium' ? 'border-orange-accent' :
                        'border-yellow-400'
                      } border-2`}
                      animate={{
                        scale: [1, 3],
                        opacity: [0.8, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />

                    {/* Alert icon */}
                    <motion.div
                      className="absolute -top-8 -left-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + index * 0.2 }}
                    >
                      <AlertTriangle className="w-5 h-5 text-orange-accent" />
                    </motion.div>
                  </motion.div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-shakespeare-200">High Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-accent" />
                    <span className="text-shakespeare-200">Medium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="text-shakespeare-200">Low</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prediction Output Panel */}
            {prediction && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="glassmorphism-strong rounded-2xl p-6 border-2 border-orange-accent/30 shadow-2xl"
              >
                <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-orange-accent" />
                  Leak Prediction - {prediction.timeframe}
                </h3>

                {/* Summary cards */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                    <div className="text-xs text-shakespeare-300 mb-1">Potential Leaks</div>
                    <div className="text-2xl font-bold text-red-400">{prediction.potentialLeaks}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-accent/10 border border-orange-accent/30">
                    <div className="text-xs text-shakespeare-300 mb-1">Water Loss</div>
                    <div className="text-2xl font-bold text-orange-accent">{prediction.waterLoss}L</div>
                  </div>
                  <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                    <div className="text-xs text-shakespeare-300 mb-1">Cost Impact</div>
                    <div className="text-2xl font-bold text-yellow-400">₹{prediction.costImpact}</div>
                  </div>
                </div>

                {/* Location predictions */}
                <div className="mb-4">
                  <h4 className="text-shakespeare-200 text-sm font-semibold mb-3">High-Risk Locations:</h4>
                  <div className="space-y-2">
                    {prediction.locations.map((location, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-shakespeare-800/50 border border-orange-accent/10">
                        <div>
                          <span className="text-white text-sm font-medium">{location.zone}</span>
                          <div className="w-full h-1.5 bg-shakespeare-900/50 rounded-full mt-1 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${location.probability}%` }}
                              className={`h-full ${
                                location.severity === "High" ? "bg-red-500" :
                                location.severity === "Medium" ? "bg-orange-accent" :
                                "bg-yellow-400"
                              }`}
                              transition={{ duration: 0.8, delay: idx * 0.1 }}
                            />
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-lg font-bold text-orange-accent">{location.probability}%</div>
                          <span className={`text-xs font-semibold ${
                            location.severity === "High" ? "text-red-400" :
                            location.severity === "Medium" ? "text-orange-400" :
                            "text-yellow-400"
                          }`}>
                            {location.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confidence */}
                <div className="flex items-center justify-between text-xs text-shakespeare-300">
                  <span>Model Confidence: <span className="text-orange-accent font-bold">{prediction.confidence}%</span></span>
                  <span>Predicted at {prediction.timestamp}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}