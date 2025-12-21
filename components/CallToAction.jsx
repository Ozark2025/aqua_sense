"use client";

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Mail, Phone } from 'lucide-react';

export default function CallToAction() {
  const benefits = [
    'Free consultation with water experts',
    'Custom deployment plan',
    '30-day trial period',
    'Dedicated support team',
    'ROI guarantee',
    'Scalable solutions',
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* HD Video Background with dark water theme */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-95"
        >
          <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_videos/smooth-flowing-water-with-gentle-waves-a-85892792-20251130140158.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-shakespeare-200/80 via-shakespeare-950/90 to-shakespeare-950 opacity-50"></div>
      </div>

      {/* 3D Floating Water Droplets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-shakespeare-300 rounded-full opacity-30 animate-float-3d"
            style={{
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${12 + Math.random() * 6}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Caustic light effect */}
      <div className="caustic-overlay z-10"></div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5 z-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        }}></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-6 py-2 glassmorphism-strong text-shakespeare-100 rounded-full font-bold text-sm mb-6 border border-shakespeare-400/30">
                Ready to Transform?
              </span>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                Start Saving Water
                <br />
                <span className="text-gradient">Today</span>
              </h2>
              
              <p className="text-2xl text-shakespeare-200 mb-10 leading-relaxed">
                Join hundreds of organizations across India that are already maximizing water efficiency with AquaSense. Let's build a sustainable future together.
              </p>

              {/* Benefits List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-aqua-teal to-shakespeare-400 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-shakespeare-100 text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-10 py-5 bg-gradient-to-r from-orange-accent to-shakespeare-500 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-orange-accent/50 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 glassmorphism-strong text-shakespeare-100 font-bold text-lg rounded-full border-2 border-shakespeare-400/50 hover:border-shakespeare-300 transition-all shadow-2xl"
                >
                  Schedule Demo
                </motion.button>
              </div>
            </motion.div>

            {/* Right Form Card - Liquid shape */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="glassmorphism-strong rounded-3xl p-10 shadow-2xl border-2 border-shakespeare-400/30 overflow-hidden animate-liquid-morph">
                {/* Water texture */}
                <div className="absolute inset-0 water-texture opacity-20"></div>
                
                <div className="relative z-10">
                  <h3 className="text-4xl font-bold text-shakespeare-50 mb-3">
                    Get a Free Consultation
                  </h3>
                  <p className="text-shakespeare-200 text-lg mb-8">
                    Our water experts will analyze your needs and create a custom solution
                  </p>

                  <form className="space-y-5">
                    <div>
                      <label className="block text-shakespeare-100 font-semibold mb-2 text-lg">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-5 py-4 rounded-xl bg-shakespeare-800/30 border-2 border-shakespeare-500/30 focus:border-shakespeare-400 text-shakespeare-100 placeholder-shakespeare-400 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-shakespeare-100 font-semibold mb-2 text-lg">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-5 py-4 rounded-xl bg-shakespeare-800/30 border-2 border-shakespeare-500/30 focus:border-shakespeare-400 text-shakespeare-100 placeholder-shakespeare-400 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-shakespeare-100 font-semibold mb-2 text-lg">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full px-5 py-4 rounded-xl bg-shakespeare-800/30 border-2 border-shakespeare-500/30 focus:border-shakespeare-400 text-shakespeare-100 placeholder-shakespeare-400 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-shakespeare-100 font-semibold mb-2 text-lg">
                        Organization Type *
                      </label>
                      <select className="w-full px-5 py-4 rounded-xl bg-shakespeare-800/30 border-2 border-shakespeare-500/30 focus:border-shakespeare-400 text-shakespeare-100 outline-none transition-all">
                        <option>Select type</option>
                        <option>Agriculture</option>
                        <option>Manufacturing</option>
                        <option>Municipal</option>
                        <option>Commercial</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-shakespeare-100 font-semibold mb-2 text-lg">
                        Message
                      </label>
                      <textarea
                        rows="3"
                        placeholder="Tell us about your water management needs..."
                        className="w-full px-5 py-4 rounded-xl bg-shakespeare-800/30 border-2 border-shakespeare-500/30 focus:border-shakespeare-400 text-shakespeare-100 placeholder-shakespeare-400 outline-none transition-all resize-none"
                      ></textarea>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full px-10 py-5 bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-shakespeare-500/50 transition-all"
                    >
                      Submit Request
                    </motion.button>
                  </form>

                  {/* Contact Info */}
                  <div className="mt-8 pt-8 border-t border-shakespeare-500/30">
                    <p className="text-shakespeare-300 text-center mb-5">
                      Or reach us directly:
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-5">
                      <a href="mailto:info@aquasense.in" className="flex items-center justify-center space-x-2 text-shakespeare-200 hover:text-shakespeare-100 transition-colors">
                        <Mail className="w-5 h-5" />
                        <span>info@aquasense.in</span>
                      </a>
                      <a href="tel:+919876543210" className="flex items-center justify-center space-x-2 text-shakespeare-200 hover:text-shakespeare-100 transition-colors">
                        <Phone className="w-5 h-5" />
                        <span>+91 98765 43210</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24 text-center"
          >
            <p className="text-shakespeare-200 text-lg mb-8">Trusted by leading organizations</p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {['IIT Delhi', 'CSIR', 'Ministry of Jal Shakti', 'NITI Aayog', 'Smart India Hackathon'].map((org, index) => (
                <motion.div 
                  key={org}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="px-8 py-4 glassmorphism-strong rounded-2xl border-2 border-shakespeare-400/30 text-white font-bold text-lg shadow-xl"
                >
                  {org}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}