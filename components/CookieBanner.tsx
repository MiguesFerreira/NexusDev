
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

interface CookieBannerProps {
  theme: 'dark' | 'light';
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ theme }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('nexus_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (type: 'accept' | 'refuse') => {
    localStorage.setItem('nexus_cookie_consent', type);
    setShow(false);
  };

  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          exit={{ y: 100, x: '-50%', opacity: 0 }}
          className="fixed bottom-8 left-1/2 z-[60] w-[calc(100vw-32px)] max-w-[600px]"
        >
          <div className={`p-6 rounded-[2.5rem] border shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-6 ${isDark ? 'glass border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="p-4 rounded-full bg-indigo-500/10 text-indigo-500 hidden md:block shrink-0">
              <Cookie size={28} />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h4 className="font-bold text-base mb-1">Privacidade & Cookies</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Utilizamos tecnologias para melhorar sua experiência. Ao continuar, você concorda com nossa política de dados corporativos.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto shrink-0">
              <button 
                onClick={() => handleAction('refuse')}
                className={`flex-1 md:px-6 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${isDark ? 'bg-white/5 hover:bg-white/10 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
              >
                Recusar
              </button>
              <button 
                onClick={() => handleAction('accept')}
                className="flex-1 md:px-6 py-3 gradient-bg text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                Aceitar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
