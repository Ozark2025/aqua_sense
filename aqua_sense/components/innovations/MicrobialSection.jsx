"use client";

import { motion } from 'framer-motion';
import { Droplets, Activity, TrendingUp, Thermometer, Clock, Database, Brain, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MicrobialSection() {
  const [liveMetrics, setLiveMetrics] = useState({
    do: 6.8,
    turbidity: 2.3,
    conductivity: 450,
    temperature: 24.5,
    ph: 7.2
  });

  const [predicting, setPredicting] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const features = [
    { icon: Droplets, label: "DO correlation", color: "aqua-teal" },
    { icon: Activity, label: "Turbidity behavior", color: "royal-blue" },
    { icon: TrendingUp, label: "Conductivity shifts", color: "aqua-teal" },
    { icon: Thermometer, label: "Temperature curves", color: "royal-blue" },
    { icon: Clock, label: "Time-of-day patterns", color: "aqua-teal" },
    { icon: Database, label: "Historical trends", color: "royal-blue" }
  ];

  // Simulate live metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics({
        do: parseFloat((6.5 + Math.random() * 1).toFixed(2)),
        turbidity: parseFloat((2 + Math.random() * 0.8).toFixed(2)),
        conductivity: Math.floor(400 + Math.random() * 100),
        temperature: parseFloat((23 + Math.random() * 3).toFixed(1)),
        ph: parseFloat((7 + Math.random() * 0.5).toFixed(2))
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePredict = () => {
    setPredicting(true);
    // Simulate AI prediction
    setTimeout(() => {
      const ecoliProbability = Math.floor(15 + Math.random() * 25);
      const recommendation = ecoliProbability > 30 ? "High Risk" : ecoliProbability > 20 ? "Medium Risk" : "Low Risk";
      const confidence = Math.floor(88 + Math.random() * 10);
      
      setPrediction({
        ecoliProbability,
        recommendation,
        confidence,
        factors: [
          { name: "DO Level", impact: "Low", value: liveMetrics.do },
          { name: "Turbidity", impact: "Medium", value: liveMetrics.turbidity },
          { name: "Temperature", impact: "High", value: liveMetrics.temperature },
          { name: "pH Level", impact: "Low", value: liveMetrics.ph }
        ],
        timestamp: new Date().toLocaleTimeString()
      });
      setPredicting(false);
    }, 2000);
  };

  return (
    <section className="relative py-32 bg-shakespeare-950 overflow-hidden">
      {/* Glowing edge effects */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-aqua-teal to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-aqua-teal to-transparent opacity-60" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-aqua-teal opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: 3D Droplet Illustration + Live Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative space-y-6"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Animated microbe swirl */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-aqua-teal/30 to-royal-blue/30 blur-3xl"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              
              {/* Main droplet */}
              <motion.div
                className="relative w-80 h-80 mx-auto"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-aqua-teal to-royal-blue opacity-20 blur-xl" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-aqua-teal/40 to-royal-blue/40 backdrop-blur-sm border-2 border-aqua-teal/50" />
                
                {/* Microbe icons */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-120px)`,
                      }}
                    >
                      <Activity className="w-6 h-6 text-aqua-teal" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Center glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-aqua-teal shadow-2xl shadow-aqua-teal/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Live Metrics Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="glassmorphism-strong rounded-2xl p-6 border-2 border-aqua-teal/30"
            >
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-aqua-teal" />
                Live Water Quality Metrics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-shakespeare-900/50 border border-aqua-teal/20">
                  <div className="text-xs text-shakespeare-300 mb-1">DO Level</div>
                  <motion.div 
                    key={liveMetrics.do}
                    initial={{ scale: 1.2, color: '#4ac0e6' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                    className="text-2xl font-bold text-white"
                  >
                    {liveMetrics.do} <span className="text-sm text-shakespeare-400">mg/L</span>
                  </motion.div>
                </div>
                <div className="p-3 rounded-lg bg-shakespeare-900/50 border border-aqua-teal/20">
                  <div className="text-xs text-shakespeare-300 mb-1">Turbidity</div>
                  <motion.div 
                    key={liveMetrics.turbidity}
                    initial={{ scale: 1.2, color: '#4ac0e6' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                    className="text-2xl font-bold text-white"
                  >
                    {liveMetrics.turbidity} <span className="text-sm text-shakespeare-400">NTU</span>
                  </motion.div>
                </div>
                <div className="p-3 rounded-lg bg-shakespeare-900/50 border border-aqua-teal/20">
                  <div className="text-xs text-shakespeare-300 mb-1">Conductivity</div>
                  <motion.div 
                    key={liveMetrics.conductivity}
                    initial={{ scale: 1.2, color: '#4ac0e6' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                    className="text-2xl font-bold text-white"
                  >
                    {liveMetrics.conductivity} <span className="text-sm text-shakespeare-400">µS</span>
                  </motion.div>
                </div>
                <div className="p-3 rounded-lg bg-shakespeare-900/50 border border-aqua-teal/20">
                  <div className="text-xs text-shakespeare-300 mb-1">Temperature</div>
                  <motion.div 
                    key={liveMetrics.temperature}
                    initial={{ scale: 1.2, color: '#4ac0e6' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                    className="text-2xl font-bold text-white"
                  >
                    {liveMetrics.temperature} <span className="text-sm text-shakespeare-400">°C</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content Card + Prediction */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glassmorphism-strong rounded-3xl p-10 border-2 border-aqua-teal/30 shadow-2xl shadow-aqua-teal/10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 rounded-full bg-aqua-teal/20 text-aqua-teal text-xs font-semibold border border-aqua-teal/30">
                  🦠 INNOVATION #1
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Microbial Activity Prediction
              </h2>
              <p className="text-xl text-aqua-teal font-semibold mb-6">(No Lab Required)</p>

              <p className="text-lg text-shakespeare-200 mb-8">
                AI predicts microbial load such as <span className="text-aqua-teal font-semibold">e-coli probability</span> without any microbial sensor.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-shakespeare-900/50 border border-aqua-teal/20 hover:border-aqua-teal/50 transition-all"
                  >
                    <feature.icon className={`w-5 h-5 text-${feature.color}`} />
                    <span className="text-sm text-shakespeare-100 font-medium">{feature.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Predict Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePredict}
                disabled={predicting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-aqua-teal to-royal-blue text-white font-bold text-lg shadow-lg hover:shadow-aqua-teal/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Brain className="w-6 h-6" />
                {predicting ? 'Analyzing...' : 'Predict E-coli Probability'}
              </motion.button>

              {/* India Impact Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-orange-accent/20 to-sand-gold/20 border-2 border-orange-accent/30"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🇮🇳</span>
                  <div>
                    <h3 className="text-orange-accent font-bold text-lg mb-2">Why this matters for India</h3>
                    <p className="text-shakespeare-100 text-sm leading-relaxed">
                      Most plants lack microbial sensors — AquaSense fills the gap with AI-powered predictions, making water safety accessible to all.
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
                className="glassmorphism-strong rounded-2xl p-6 border-2 border-aqua-teal/30 shadow-2xl"
              >
                <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-aqua-teal" />
                  AI Prediction Result
                </h3>

                {/* Main prediction */}
                <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-aqua-teal/20 to-royal-blue/20 border border-aqua-teal/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-shakespeare-200 text-sm">E-coli Probability</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      prediction.recommendation === "High Risk" ? "bg-red-500/20 text-red-400 border border-red-500/50" :
                      prediction.recommendation === "Medium Risk" ? "bg-orange-500/20 text-orange-400 border border-orange-500/50" :
                      "bg-green-500/20 text-green-400 border border-green-500/50"
                    }`}>
                      {prediction.recommendation}
                    </span>
                  </div>
                  <div className="text-5xl font-bold text-aqua-teal mb-2">
                    {prediction.ecoliProbability}%
                  </div>
                  <div className="w-full h-2 bg-shakespeare-900/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${prediction.ecoliProbability}%` }}
                      className="h-full bg-gradient-to-r from-aqua-teal to-royal-blue"
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                {/* Contributing factors */}
                <div className="mb-4">
                  <h4 className="text-shakespeare-200 text-sm font-semibold mb-3">Contributing Factors:</h4>
                  <div className="space-y-2">
                    {prediction.factors.map((factor, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-shakespeare-900/50 border border-aqua-teal/10">
                        <div>
                          <span className="text-white text-sm font-medium">{factor.name}</span>
                          <span className="text-shakespeare-400 text-xs ml-2">({factor.value})</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          factor.impact === "High" ? "bg-red-500/20 text-red-400" :
                          factor.impact === "Medium" ? "bg-orange-500/20 text-orange-400" :
                          "bg-green-500/20 text-green-400"
                        }`}>
                          {factor.impact} Impact
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confidence and timestamp */}
                <div className="flex items-center justify-between text-xs text-shakespeare-300">
                  <span>Confidence: <span className="text-aqua-teal font-bold">{prediction.confidence}%</span></span>
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