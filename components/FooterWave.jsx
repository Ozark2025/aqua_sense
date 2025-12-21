'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FooterWave() {
  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* Wavy top edge */}
      <div className="absolute top-0 left-0 w-full h-16">
        <svg className="absolute top-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,50 C300,100 500,0 600,50 C700,100 900,0 1200,50 L1200,0 L0,0 Z"
            fill="currentColor"
            className="text-shakespeare-100 animate-wave"
          />
        </svg>
      </div>

      {/* Footer content */}
      <div className="relative bg-gradient-to-b from-shakespeare-800 via-shakespeare-900 to-shakespeare-950 pt-24 pb-12">
        {/* Caustic overlay */}
        <div className="caustic-overlay opacity-20"></div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-shakespeare-400/20 rounded-full blur-sm"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${5 + i * 6}%`,
              top: `${20 + Math.random() * 60}%`
            }}
          />
        ))}

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-display font-bold text-white mb-4">AquaSense</h3>
              <p className="text-shakespeare-300 mb-4">
                India's smartest water recovery and reuse platform powered by AI and IoT innovation.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-lg font-display font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-shakespeare-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-shakespeare-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/water-monitor" className="text-shakespeare-300 hover:text-white transition-colors">Live Monitor</Link></li>
                <li><a href="#features" className="text-shakespeare-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#technology" className="text-shakespeare-300 hover:text-white transition-colors">Technology</a></li>
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-lg font-display font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-shakespeare-300">
                <li>📧 info@aquasense.in</li>
                <li>📱 +91 98765 43210</li>
                <li>📍 Smart India Hackathon 2024</li>
                <li>🏛️ Innovation Hub, India</li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-8 border-t border-shakespeare-700/30 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-shakespeare-400 text-sm">
              © 2024 AquaSense. All rights reserved. | Smart India Hackathon Project
            </p>
            <div className="flex gap-6 text-sm text-shakespeare-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sustainability Report</a>
            </div>
          </motion.div>

          {/* SIH Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex justify-center"
          >
            <div className="glassmorphism-strong rounded-2xl px-6 py-3 flex items-center gap-3">
              <span className="text-3xl">🇮🇳</span>
              <div>
                <p className="text-white font-display font-semibold">Smart India Hackathon 2024</p>
                <p className="text-shakespeare-300 text-sm">Empowering India's Water Future</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="w-full h-4 bg-shakespeare-950">
        <svg className="w-full h-4" viewBox="0 0 1200 40" preserveAspectRatio="none">
          <path
            d="M0,20 C300,40 500,0 600,20 C700,40 900,0 1200,20 L1200,40 L0,40 Z"
            fill="currentColor"
            className="text-shakespeare-950 animate-wave"
          />
        </svg>
      </div>
    </footer>
  );
}
