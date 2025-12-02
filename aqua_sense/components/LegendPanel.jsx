'use client';

import { motion } from 'framer-motion';

const legendItems = [
  {
    id: 1,
    color: 'from-emerald-400 to-emerald-600',
    label: 'Normal',
    description: 'All parameters within optimal range',
    icon: '✅'
  },
  {
    id: 2,
    color: 'from-orange-accent to-orange-400',
    label: 'Warning',
    description: 'Parameters approaching threshold',
    icon: '⚠️'
  },
  {
    id: 3,
    color: 'from-red-500 to-red-700',
    label: 'Critical',
    description: 'Immediate attention required',
    icon: '🚨'
  },
  {
    id: 4,
    color: 'from-royal-blue to-shakespeare-600',
    label: 'AI Suggested',
    description: 'ML-optimized routing decision',
    icon: '🤖'
  },
  {
    id: 5,
    color: 'from-shakespeare-400 to-shakespeare-600',
    label: 'Auto Mode',
    description: 'Automated valve control',
    icon: '⚙️'
  },
  {
    id: 6,
    color: 'from-aqua-teal to-shakespeare-500',
    label: 'Processing',
    description: 'Treatment in progress',
    icon: '🔄'
  }
];

export default function LegendPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="glassmorphism-strong rounded-3xl p-6 border border-white/30"
    >
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-display font-bold text-shakespeare-900">Legend</h3>
        <span className="text-shakespeare-700">— Color codes and system states</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {legendItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="glassmorphism rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h4 className="font-display font-semibold text-shakespeare-900 text-sm">
                {item.label}
              </h4>
            </div>
            <p className="text-xs text-shakespeare-700 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Additional info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-6 pt-6 border-t border-shakespeare-300/30 flex items-start gap-3"
      >
        <span className="text-2xl">💡</span>
        <div>
          <h4 className="font-display font-semibold text-shakespeare-900 mb-1">
            Real-time Updates
          </h4>
          <p className="text-sm text-shakespeare-700">
            All sensor data and valve states are updated every 3 seconds from AquaSense IoT network. 
            AI routing decisions are made continuously based on water quality, demand, and sustainability metrics.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
