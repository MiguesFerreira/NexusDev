
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Code2, Rocket } from 'lucide-react';

interface HeroProps {
  theme: 'dark' | 'light';
  onShowMetodologia: () => void;
}

const PHRASES = [
  "Impressionam.",
  "Convertem.",
  "Escalam.",
  "Faturam.",
  "Conectam."
];

export const Hero: React.FC<HeroProps> = ({ theme, onShowMetodologia }) => {
  const [index, setIndex] = useState(0);
  const isDark = theme === 'dark';

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center">
      {/* Cinematic Animated Background */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920"
            alt="Nexus Background"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Blur Layer Overlay */}
        <div className={`absolute inset-0 backdrop-blur-[3px] ${isDark ? 'bg-slate-950/70' : 'bg-slate-50/60'}`} />
      </div>

      <motion.div
        className="container mx-auto px-6 text-center relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 ${isDark ? 'glass border-white/10 text-indigo-300' : 'bg-indigo-50 border border-indigo-100 text-indigo-600'}`}
        >
          <span className="shrink-0"><Sparkles className="w-4 h-4" /></span>
          <span className="truncate">O próximo nível do seu negócio.</span>
        </motion.div>

        <div className="min-h-[140px] md:min-h-[280px]">
          <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight mb-8 leading-[1.1] ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Experiências que <br />
            <div className="relative inline-block mt-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="gradient-text block"
                >
                  {PHRASES[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed ${isDark ? 'text-slate-100' : 'text-slate-700'}`}
        >
          Desenvolvemos sites e landing pages de alto impacto visual, focados em autoridade e conversão para negócios que não aceitam o comum.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/5515996901137"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 gradient-bg rounded-2xl font-bold text-lg flex items-center justify-center gap-2 text-white shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all hover:-translate-y-1 active:scale-95"
          >
            Quero meu site <ArrowRight className="w-5 h-5" />
          </a>
          <button
            onClick={onShowMetodologia}
            className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-lg transition-all ${isDark ? 'glass border-white/20 text-white hover:bg-white/10' : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'}`}
          >
            Nossa Metodologia
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
