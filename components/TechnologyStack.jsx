"use client";

import { motion } from 'framer-motion';
import { Server, Database, Cpu, Cloud, Code, Shield } from 'lucide-react';

export default function TechnologyStack() {
  const technologies = [
    {
      category: 'IoT & Hardware',
      icon: Cpu,
      items: ['ESP32/Arduino Sensors', 'LoRaWAN Gateway', 'Industrial PLCs', 'Flow Meters', 'pH Sensors', 'Turbidity Meters'],
      gradient: 'from-shakespeare-500 to-shakespeare-700',
    },
    {
      category: 'Cloud Infrastructure',
      icon: Cloud,
      items: ['AWS/Azure Cloud', 'Real-time Streaming', 'Auto-scaling', 'Load Balancing', 'CDN', 'Edge Computing'],
      gradient: 'from-aqua-teal to-shakespeare-600',
    },
    {
      category: 'Machine Learning',
      icon: Server,
      items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Time Series Analysis', 'Neural Networks', 'Reinforcement Learning'],
      gradient: 'from-royal-blue to-shakespeare-700',
    },
    {
      category: 'Backend Services',
      icon: Database,
      items: ['Node.js/Python', 'GraphQL API', 'PostgreSQL', 'MongoDB', 'Redis Cache', 'Message Queues'],
      gradient: 'from-shakespeare-600 to-shakespeare-800',
    },
    {
      category: 'Frontend',
      icon: Code,
      items: ['React/Next.js', 'Real-time Dashboards', 'D3.js Charts', 'Progressive Web App', 'Mobile Responsive', 'WebSockets'],
      gradient: 'from-orange-accent to-shakespeare-600',
    },
    {
      category: 'Security',
      icon: Shield,
      items: ['End-to-End Encryption', 'OAuth 2.0', 'Role-based Access', 'Data Privacy', 'Compliance Ready', 'Audit Logs'],
      gradient: 'from-shakespeare-700 to-shakespeare-900',
    },
  ];

  return (
    <section id="technology" className="relative py-32 overflow-hidden">
      {/* HD Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/abstract-3d-liquid-water-splash-forming--99705e75-20251130140111.jpg"
          alt=""
          className="w-full h-full object-cover opacity-15 animate-depth-3d"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-shakespeare-50/95 via-shakespeare-100/90 to-shakespeare-200/95"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-shakespeare-400 rounded-full opacity-20 animate-float-3d"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Caustic overlay */}
      <div className="caustic-overlay z-10"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="inline-block px-6 py-2 glassmorphism-strong text-shakespeare-800 rounded-full font-bold text-sm mb-4 border border-shakespeare-400/30">
            Technology Stack
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-shakespeare-950 mb-6">
            Built on <span className="text-gradient">Modern Technology</span>
          </h2>
          <p className="text-xl text-shakespeare-700 max-w-3xl mx-auto">
            AquaSense leverages cutting-edge tech stack designed for scalability, reliability, and performance
          </p>
        </motion.div>

        {/* Technology Grid - Water-themed liquid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.03 }}
              className="group"
            >
              <div className="relative h-full glassmorphism-strong p-10 shadow-2xl border-2 border-shakespeare-400/30 hover:border-shakespeare-500/50 transition-all duration-500 overflow-hidden animate-liquid-morph">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-10 transition-opacity animate-water-flow`}></div>
                
                {/* Water texture */}
                <div className="absolute inset-0 water-texture opacity-40"></div>

                {/* Ripple effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-shakespeare-400/40 rounded-full animate-ripple-3d"></div>
                </div>

                {/* Icon with 3D depth */}
                <div className="relative flex items-center space-x-4 mb-8">
                  <div 
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform animate-float bg-gradient-to-br ${tech.gradient} depth-layer-1`}
                    style={{
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    <tech.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="relative text-3xl font-bold text-shakespeare-900 z-10">
                    {tech.category}
                  </h3>
                </div>

                {/* Items */}
                <ul className="relative space-y-4 z-10">
                  {tech.items.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + idx * 0.05 }}
                      className="flex items-center space-x-3 text-shakespeare-700 text-lg"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${tech.gradient}`}></div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture Diagram Section - Dark water theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative water-gradient-deep p-16 border-2 border-shakespeare-600/30 shadow-2xl overflow-hidden animate-liquid-morph">
            {/* HD Background with movement */}
            <div className="absolute inset-0 z-0 opacity-10">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/crystal-clear-water-flowing-in-waves-wit-6a4f2083-20251130140111.jpg"
                alt=""
                className="w-full h-full object-cover animate-wave-flow-3d"
              />
            </div>

            {/* Water texture */}
            <div className="absolute inset-0 water-texture opacity-30"></div>

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-shakespeare-300 rounded-full opacity-30 animate-float-3d"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                  }}
                ></div>
              ))}
            </div>

            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold mb-8 text-center text-shakespeare-50">
                Scalable Architecture
              </h3>
              <p className="text-2xl text-shakespeare-200 text-center mb-16 max-w-3xl mx-auto">
                Designed to handle millions of sensor readings per day with 99.9% uptime
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { title: 'Sensors', value: '10K+', subtitle: 'Connected Devices', gradient: 'from-shakespeare-400 to-shakespeare-600' },
                  { title: 'Processing', value: '1M+', subtitle: 'Events/Second', gradient: 'from-aqua-teal to-shakespeare-500' },
                  { title: 'Storage', value: '100TB+', subtitle: 'Data Capacity', gradient: 'from-royal-blue to-shakespeare-600' },
                  { title: 'Uptime', value: '99.9%', subtitle: 'Availability', gradient: 'from-orange-accent to-shakespeare-500' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="glassmorphism-strong rounded-2xl p-8 border-2 border-shakespeare-500/30 text-center overflow-hidden animate-liquid-morph"
                    style={{
                      animationDelay: `${index * 0.3}s`
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10 animate-water-flow`}></div>
                    <div className="relative z-10">
                      <div className="text-sm text-shakespeare-300 mb-3 font-semibold">{stat.title}</div>
                      <div className="text-5xl font-bold text-aqua-teal mb-3">{stat.value}</div>
                      <div className="text-sm text-shakespeare-400">{stat.subtitle}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <button className="px-10 py-5 bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-shakespeare-500/50 hover:scale-105 transition-all">
                  View Technical Documentation
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Integration Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <h3 className="text-3xl font-bold text-shakespeare-900 mb-10">
            Integrates with Leading Platforms
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {['AWS', 'Azure', 'Google Cloud', 'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes', 'TensorFlow'].map((platform, index) => (
              <motion.div 
                key={platform}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-8 py-4 glassmorphism-strong rounded-2xl shadow-lg border-2 border-shakespeare-400/30 font-bold text-shakespeare-800 text-lg"
              >
                {platform}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}