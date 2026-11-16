import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoadingScreen: React.FC = () => {
  const { showIntroLoading, setShowIntroLoading } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!showIntroLoading) return;

    // Smooth progress bar from 0 to 100% over ~1.6s
    const startTime = Date.now();
    const duration = 1600;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        sessionStorage.setItem('aegis_seen_intro', 'true');
        setTimeout(() => {
          setShowIntroLoading(false);
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [showIntroLoading, setShowIntroLoading]);

  const handleSkip = () => {
    sessionStorage.setItem('aegis_seen_intro', 'true');
    setShowIntroLoading(false);
  };

  return (
    <AnimatePresence>
      {showIntroLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] bg-[#F8F8F5] flex flex-col items-center justify-center p-6 select-none cursor-pointer"
          onClick={handleSkip}
        >
          {/* Subtle warm ambient background blur elements */}
          <div className="absolute w-96 h-96 rounded-full bg-sage-100/60 blur-3xl -top-20 -left-20 pointer-events-none" />
          <div className="absolute w-80 h-80 rounded-full bg-sand-200/50 blur-3xl -bottom-10 -right-10 pointer-events-none" />

          <div className="relative flex flex-col items-center text-center max-w-sm">
            {/* Elegant Brand Symbol with gentle scale animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-soft border border-charcoal-100 text-sage-600 mb-6"
            >
              <ShieldCheck size={36} strokeWidth={1.75} />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-sage-500 animate-pulse" />
            </motion.div>

            {/* Product Name */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="font-heading font-bold text-2xl md:text-3xl text-charcoal-800 tracking-tight"
            >
              Parental Control System
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm text-charcoal-500 mt-2 font-normal"
            >
              A safer, more connected family experience
            </motion.p>

            {/* Very thin progress indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="w-48 h-1 bg-ivory-300 rounded-full mt-8 overflow-hidden relative"
            >
              <div
                className="h-full bg-sage-600 transition-all duration-75 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </motion.div>

            {/* Status text */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="text-xs text-charcoal-500/80 font-medium tracking-wide mt-3"
            >
              Preparing your secure environment...
            </motion.span>
          </div>

          <div className="absolute bottom-6 text-[11px] text-charcoal-400">
            Click anywhere to jump in
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
