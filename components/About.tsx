
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users, Zap } from 'lucide-react';

interface AboutProps { theme: 'dark' | 'light'; }

export const About: React.FC<AboutProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const stats = [
    { icon: Target, title: 'Objetivo', desc: 'Sua conversão é nossa prioridade absoluta.' },
    { icon: Zap, title: 'Velocidade', desc: 'Performance otimizada para Core Web Vitals.' },
    { icon: Shield, title: 'Confiança', desc: 'Suporte humanizado e manutenção contínua.' },
    { icon: Users, title: 'UX Design', desc: 'Foco total na experiência do usuário final.' },
  ];

  return (
    <section id="sobre" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-8 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Nexus Dev: Onde a <span className="text-indigo-500">Criatividade</span> encontra a <span className="text-purple-500">Engenharia.</span>
            </h2>
            <p className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Nascemos com a missão de elevar o padrão da web brasileira. Não entregamos apenas código; entregamos autoridade digital.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${isDark ? 'bg-slate-900 text-indigo-400' : 'bg-white text-indigo-600 border'}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`font-bold mb-1 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{stat.title}</h4>
                    <p className="text-xs text-slate-500">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:w-1/2 relative"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className={`relative z-10 rounded-[3rem] overflow-hidden border shadow-2xl ${isDark ? 'border-white/10' : 'border-slate-200'}`}
            >
              <img 
                 src="/img/nexus.png" 
                alt="Nexus Dev Brand Identity" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent pointer-events-none" />
            </motion.div>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-[120px] -z-10 opacity-40 ${isDark ? 'bg-indigo-600/30' : 'bg-indigo-400/20'}`} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
