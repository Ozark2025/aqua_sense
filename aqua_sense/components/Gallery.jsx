"use client";

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function Gallery() {
  const mediaItems = [
    {
      type: 'image',
      url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/aerial-view-of-pristine-indian-river-gan-898087a1-20251130140111.jpg',
      title: 'Ganges River',
      description: 'Monitoring India\'s sacred rivers',
    },
    {
      type: 'video',
      url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_videos/close-up-of-water-droplets-falling-and-c-e21a1042-20251130140131.mp4',
      title: 'Smart Irrigation',
      description: 'Precision agriculture in action',
    },
    {
      type: 'image',
      url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/modern-water-treatment-facility-in-india-a50737ba-20251130140111.jpg',
      title: 'Water Treatment Plant',
      description: 'Modern purification technology',
    },
    {
      type: 'image',
      url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/indian-farmer-using-smart-irrigation-sys-9782f379-20251130140112.jpg',
      title: 'Agricultural Innovation',
      description: 'Empowering Indian farmers',
    },
    {
      type: 'video',
      url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_videos/smooth-flowing-water-with-gentle-waves-a-85892792-20251130140158.mp4',
      title: 'Industrial Water Management',
      description: 'Factory-scale solutions',
    },
    {
      type: 'image',
      url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/crystal-clear-water-flowing-in-waves-wit-6a4f2083-20251130140111.jpg',
      title: 'Future of Water Tech',
      description: 'Futuristic monitoring systems',
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* HD Background with water theme */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/underwater-scene-with-water-droplets-and-2bf1b9d8-20251130140112.jpg"
          alt=""
          className="w-full h-full object-cover opacity-10 animate-wave-flow-3d"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-shakespeare-50/95 via-shakespeare-100/90 to-shakespeare-50/95"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(15)].map((_, i) => (
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
          className="text-center mb-20"
        >
          <span className="inline-block px-6 py-2 glassmorphism-strong text-shakespeare-800 rounded-full font-bold text-sm mb-4 border border-shakespeare-400/30">
            Visual Journey
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-shakespeare-950 mb-6">
            AquaSense in <span className="text-gradient">Action</span>
          </h2>
          <p className="text-xl text-shakespeare-700 max-w-3xl mx-auto">
            Witness the transformation of water management across India - from rivers to farmlands to industries
          </p>
        </motion.div>

        {/* Gallery Grid - Water-themed cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mediaItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.03 }}
              className="group relative"
            >
              <div className="relative h-96 shadow-2xl overflow-hidden water-card-wave">
                {/* Image or Video */}
                {item.type === 'video' ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  >
                    <source src={item.url} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-shakespeare-950 via-shakespeare-900/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>

                {/* Caustic effect on images */}
                <div className="absolute inset-0 caustic-overlay opacity-40"></div>

                {/* Video Play Button */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-24 h-24 rounded-full glassmorphism-strong flex items-center justify-center shadow-2xl cursor-pointer border-2 border-shakespeare-400/50"
                    >
                      <Play className="w-10 h-10 text-shakespeare-100 ml-1" />
                    </motion.div>
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform z-10">
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-shakespeare-200 text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </p>
                </div>

                {/* Animated border glow */}
                <div className="absolute inset-0 border-4 border-shakespeare-400 opacity-0 group-hover:opacity-60 transition-opacity animate-pulse"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner - Liquid shape */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24"
        >
          <div className="water-gradient-deep rounded-3xl p-16 text-white shadow-2xl overflow-hidden relative animate-liquid-morph">
            {/* Water texture */}
            <div className="absolute inset-0 water-texture opacity-20"></div>
            
            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float-3d"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                ></div>
              ))}
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 text-center z-10">
              {[
                { value: '28', label: 'States Covered', gradient: 'from-shakespeare-300 to-aqua-teal' },
                { value: '500+', label: 'Deployments', gradient: 'from-aqua-teal to-shakespeare-400' },
                { value: '15K+', label: 'Sensors Active', gradient: 'from-shakespeare-400 to-royal-blue' },
                { value: '24/7', label: 'Support', gradient: 'from-orange-accent to-shakespeare-400' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={`text-6xl font-bold mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>{stat.value}</div>
                  <div className="text-shakespeare-100 text-xl font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Video Testimonial Section - Liquid card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 max-w-6xl mx-auto"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-shakespeare-950 text-center mb-16">
            Hear from Our Partners
          </h3>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer animate-liquid-morph">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/indian-farmer-using-smart-irrigation-sys-9782f379-20251130140112.jpg"
              alt="Customer testimonial"
              className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-shakespeare-950/95 via-shakespeare-900/60 to-transparent"></div>
            
            {/* Caustic overlay */}
            <div className="absolute inset-0 caustic-overlay opacity-40"></div>

            <div className="absolute inset-0 flex items-center justify-center z-10">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="w-32 h-32 rounded-full glassmorphism-strong flex items-center justify-center shadow-2xl border-2 border-shakespeare-400/50"
              >
                <Play className="w-14 h-14 text-shakespeare-100 ml-2" />
              </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
              <h4 className="text-3xl font-bold text-white mb-3">
                Success Story: Maharashtra Water Board
              </h4>
              <p className="text-shakespeare-200 text-xl">
                How AquaSense helped save 100M+ liters of water annually
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}