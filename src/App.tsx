/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function App() {
  const [loadingText, setLoadingText] = useState('Initializing system');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const texts = [
      'Initializing system',
      'Establishing connection',
      'Decrypting payload',
      'Rendering interface',
      'Almost ready'
    ];
    let currentIndex = 0;
    const textInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setLoadingText(texts[currentIndex]);
    }, 2500);

    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 500);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center overflow-hidden relative font-sans selection:bg-cyan-500/30">
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }}
        />
      </div>

      {/* Ambient Glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] opacity-30 pointer-events-none z-0"
        animate={{
          background: [
            'radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(0,0,0,0) 70%)',
            'radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(0,0,0,0) 70%)',
            'radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(0,0,0,0) 70%)',
            'radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(0,0,0,0) 70%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white z-0"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0, Math.random() * 0.5 + 0.2, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center">
        {/* Central Animation */}
        <div className="relative w-40 h-40 flex items-center justify-center mb-12">
          {/* Outer dashed ring */}
          <motion.svg 
            className="absolute inset-0 w-full h-full text-cyan-500/30"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <circle 
              cx="50" cy="50" r="48" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1" 
              strokeDasharray="4 4" 
            />
          </motion.svg>

          {/* Inner solid ring with gap */}
          <motion.svg 
            className="absolute inset-2 w-36 h-36 text-blue-500/50"
            viewBox="0 0 100 100"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <circle 
              cx="50" cy="50" r="46" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeDasharray="200 80" 
              strokeLinecap="round"
            />
          </motion.svg>

          {/* Core morphing shape */}
          <motion.div
            className="w-16 h-16 bg-gradient-to-tr from-cyan-400 to-violet-500 shadow-[0_0_30px_rgba(6,182,212,0.5)]"
            animate={{
              borderRadius: ["20%", "50%", "30%", "20%"],
              rotate: [0, 90, 180, 360],
              scale: [1, 0.8, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Core glow */}
          <motion.div
            className="absolute w-16 h-16 bg-white rounded-full mix-blend-overlay blur-md"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Text and Progress */}
        <div className="flex flex-col items-center w-80">
          <div className="flex justify-between w-full mb-3 text-xs font-mono text-cyan-400/80 uppercase tracking-widest">
            <motion.span
              key={loadingText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {loadingText}
            </motion.span>
            <span>{Math.min(Math.round(progress), 100)}%</span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-1.5 bg-neutral-800/80 rounded-full overflow-hidden relative backdrop-blur-sm border border-white/5">
            {/* Progress Fill */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut", duration: 0.5 }}
            />
            {/* Progress Glow */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-white/30 blur-[2px]"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut", duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
