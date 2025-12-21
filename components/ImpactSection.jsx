"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Droplets, TrendingDown, Sprout, Factory, Award, Users } from 'lucide-react';

function Counter({ end, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function ImpactSection() {
  const impacts = [
    {
      icon: Droplets,
      value: 50,
      suffix: 'M+',
      label: 'Liters Saved Daily',
      description: 'Across all deployed facilities',
      gradient: 'from-shakespeare-400 to-shakespeare-600',
    },
    {
      icon: TrendingDown,
      value: 85,
      suffix: '%',
      label: 'Waste Reduction',
      description: 'In water discharge',
      gradient: 'from-aqua-teal to-shakespeare-500',
    },
    {
      icon: Factory,
      value: 120,
      suffix: '+',
      label: 'Industries Served',
      description: 'Manufacturing & Processing',
      gradient: 'from-royal-blue to-shakespeare-600',
    },
    {
      icon: Sprout,
      value: 15000,
      suffix: '+',
      label: 'Acres Irrigated',
      description: 'Agricultural land',
      gradient: 'from-orange-accent to-shakespeare-500',
    },
    {
      icon: Users,
      value: 2.5,
      suffix: 'M',
      label: 'People Impacted',
      description: 'Beneficiaries nationwide',
      gradient: 'from-shakespeare-500 to-shakespeare-700',
    },
    {
      icon: Award,
      value: 98,
      suffix: '%',
      label: 'Client Satisfaction',
      description: 'Based on surveys',
      gradient: 'from-shakespeare-600 to-shakespeare-800',
    },
  ];

  const sectors = [
    {
      name: 'Agriculture',
      impact: 'Smart irrigation systems saving 40% water',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/indian-farmer-using-smart-irrigation-sys-9782f379-20251130140112.jpg',
    },
    {
      name: 'Manufacturing',
      impact: 'Reusing 70% of industrial wastewater',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/modern-water-treatment-facility-in-india-a50737ba-20251130140111.jpg',
    },
    {
      name: 'Municipal',
      impact: 'Treating & reusing water for non-potable use',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/aerial-view-of-pristine-indian-river-gan-898087a1-20251130140111.jpg',
    },
  ];

  return (
    <section id="impact" className="relative py-32 overflow-hidden">
      {/* HD Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_videos/smooth-flowing-water-with-gentle-waves-a-85892792-20251130140158.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-shakespeare-900/80 via-shakespeare-800/70 to-shakespeare-950/90"></div>
      </div>

      {/* 3D Floating Water Droplets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-shakespeare-300 rounded-full opacity-30 animate-float-3d"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Caustic Light Effect */}
      <div className="caustic-overlay z-10"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-6 py-2 glassmorphism-strong text-shakespeare-100 rounded-full font-semibold text-sm mb-4 border border-shakespeare-400/30">
            Real-World Impact
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-shakespeare-50 mb-6">
            Making Waves Across <span className="text-gradient">India</span>
          </h2>
          <p className="text-xl text-shakespeare-200 max-w-3xl mx-auto">
            From farms to factories, AquaSense is transforming water management and creating measurable impact
          </p>
        </motion.div>

        {/* Impact Stats Grid - Water-themed cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="group"
            >
              <div className="relative h-full glassmorphism-strong p-8 shadow-2xl border-2 border-shakespeare-400/30 hover:border-shakespeare-300/50 transition-all duration-500 overflow-hidden animate-liquid-morph">
                {/* Animated Gradient Background */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${impact.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-water-flow`}
                ></div>
                
                {/* Ripple Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-shakespeare-300/50 rounded-full animate-ripple-3d"></div>
                </div>

                {/* Icon with 3D depth */}
                <div 
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform animate-float bg-gradient-to-br ${impact.gradient} depth-layer-1`}
                  style={{
                    animationDelay: `${index * 0.5}s`
                  }}
                >
                  <impact.icon className="w-10 h-10 text-white" />
                </div>

                {/* Counter */}
                <div className="text-6xl font-bold text-shakespeare-50 mb-3 relative z-10">
                  <Counter end={impact.value} suffix={impact.suffix} />
                </div>

                {/* Label */}
                <h3 className="text-2xl font-bold text-shakespeare-100 mb-2 relative z-10">
                  {impact.label}
                </h3>

                {/* Description */}
                <p className="text-shakespeare-200 relative z-10">
                  {impact.description}
                </p>

                {/* Water Texture Overlay */}
                <div className="absolute inset-0 water-texture opacity-50"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sector Impact - Wave-shaped cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-shakespeare-50 text-center mb-16">
            Impact Across Sectors
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {sectors.map((sector, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -15, scale: 1.03 }}
                className="group relative overflow-hidden shadow-2xl water-card-wave"
              >
                {/* Image with 3D movement */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={sector.image}
                    alt={sector.name}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 animate-depth-3d"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-shakespeare-950 via-shakespeare-900/70 to-transparent"></div>
                  
                  {/* Caustic overlay on image */}
                  <div className="absolute inset-0 caustic-overlay opacity-50"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                  <h4 className="text-3xl font-bold mb-3 text-shakespeare-50">{sector.name}</h4>
                  <p className="text-shakespeare-200 text-lg">{sector.impact}</p>
                </div>

                {/* Hover Overlay with water gradient */}
                <div className="absolute inset-0 water-gradient-deep opacity-0 group-hover:opacity-95 transition-opacity duration-500 flex items-center justify-center">
                  <button className="px-8 py-4 glassmorphism-strong text-shakespeare-50 font-bold text-lg rounded-full hover:scale-110 transition-transform border-2 border-shakespeare-300/50">
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial - Unique liquid shape */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative glassmorphism-strong p-16 text-white shadow-2xl overflow-hidden border-2 border-shakespeare-400/30 animate-liquid-morph">
            {/* HD Background Image */}
            <div className="absolute inset-0 z-0 opacity-10">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/crystal-clear-water-flowing-in-waves-wit-6a4f2083-20251130140111.jpg"
                alt=""
                className="w-full h-full object-cover animate-wave-flow-3d"
              />
            </div>

            {/* Quote Mark */}
            <div className="absolute top-8 left-8 text-9xl text-shakespeare-400 opacity-30 font-serif z-0">"</div>
            
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl font-medium mb-10 leading-relaxed text-shakespeare-100">
                AquaSense has revolutionized how we manage water in our manufacturing facility. We've reduced water costs by 60% and improved our sustainability metrics significantly.
              </p>
              
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-shakespeare-500 to-shakespeare-700 flex items-center justify-center text-3xl font-bold shadow-xl">
                  RK
                </div>
                <div>
                  <div className="font-bold text-2xl text-shakespeare-50">Rajesh Kumar</div>
                  <div className="text-shakespeare-200 text-lg">Operations Director, ABC Industries</div>
                </div>
              </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-shakespeare-300 rounded-full opacity-40 animate-float-3d"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}