
import React from 'react';
import { motion } from 'framer-motion';

export const SplashScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-[#030712] flex items-center justify-center"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 1, 
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5
          }}
          className="w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.4)] mb-6"
        >
          <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            <img src="/img/favicon.png" className="w-15 h-15" alt="Ícone" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold font-display tracking-tighter text-white">
            Nexus<span className="text-indigo-500">Dev</span>
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.6, duration: 1.5 }}
            className="h-[1px] gradient-bg mt-2 mx-auto"
          />
          <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold mt-4">
            Inovação Digital
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
