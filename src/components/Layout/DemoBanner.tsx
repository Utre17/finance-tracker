import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEMO_FEATURES, enableDemoMode, disableDemoMode, isDemoMode } from '../../utils/demoData';

interface DemoBannerProps {
  onLoadDemoData: () => void;
  onClearData: () => void;
  hasExistingData: boolean;
}

const DemoBanner: React.FC<DemoBannerProps> = ({ 
  onLoadDemoData, 
  onClearData, 
  hasExistingData 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDemoActive, setIsDemoActive] = useState(isDemoMode());

  const handleLoadDemo = () => {
    enableDemoMode();
    setIsDemoActive(true);
    onLoadDemoData();
  };

  const handleClearDemo = () => {
    disableDemoMode();
    setIsDemoActive(false);
    onClearData();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.div>
            
            <div>
              <h3 className="text-lg font-semibold">
                🎯 Portfolio Demo - Finance Tracker
              </h3>
              <p className="text-sm text-blue-100">
                {isDemoActive 
                  ? 'Demo mode active - showcasing application capabilities'
                  : 'Professional financial management application built with React & TypeScript'
                }
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {!hasExistingData && !isDemoActive && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLoadDemo}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 transition-colors text-sm font-medium"
              >
                🚀 Try Demo Data
              </motion.button>
            )}

            {isDemoActive && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearDemo}
                className="bg-red-500/20 hover:bg-red-500/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-red-300/20 transition-colors text-sm font-medium"
              >
                🗑️ Clear Demo
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg backdrop-blur-sm border border-white/20 transition-colors"
            >
              <motion.svg
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-white/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-blue-100">✨ Key Features</h4>
                  <ul className="space-y-1 text-sm text-blue-100">
                    {DEMO_FEATURES.slice(0, 3).map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-blue-100">🛠️ Tech Stack</h4>
                  <ul className="space-y-1 text-sm text-blue-100">
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      ⚛️ React 18 + TypeScript
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      🎨 Tailwind CSS + Framer Motion
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      📊 Recharts + Custom Hooks
                    </motion.li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-blue-100">🎯 Portfolio Highlights</h4>
                  <ul className="space-y-1 text-sm text-blue-100">
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      🏗️ Clean Architecture
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      🔄 State Management
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      📱 Responsive Design
                    </motion.li>
                  </ul>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm"
              >
                <p className="text-sm text-center text-blue-100">
                  💼 <strong>Built for Portfolio:</strong> This application demonstrates modern React development practices, 
                  TypeScript integration, responsive design, and professional UI/UX patterns suitable for enterprise applications.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DemoBanner; 