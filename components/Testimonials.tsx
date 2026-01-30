
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialsProps { theme: 'dark' | 'light'; }

const FEEDBACK = [
  { name: "Lucas Almeida", role: "CEO TechHub", text: "O site superou todas as expectativas. A velocidade de carregamento é bizarra!", },
  { name: "Mariana Costa", role: "E-commerce Owner", text: "Design impecável. Em uma semana, minha taxa de conversão subiu 20%.", },
  { name: "Roberto Silva", role: "Arquiteto", text: "A Nexus Dev conseguiu traduzir meu estilo minimalista em um site fluido.", },
  { name: "Ana Paula", role: "Consultora", text: "Profissionalismo do início ao fim. O chatbot deles ajuda muito nas vendas.", },
  { name: "Vitor Souza", role: "Advogado", text: "Minha autoridade digital mudou completamente com o novo portal.", },
  { name: "Carla Nunes", role: "Médica", text: "Interface intuitiva e limpa. Meus pacientes elogiam sempre a facilidade.", },
];

export const Testimonials: React.FC<TestimonialsProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="depoimentos" className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className={`text-4xl md :text-5xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            O que dizem os <span className="gradient-text">Parceiros</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] md:text-xs font-black uppercase tracking-[0.6em] text-indigo-500/80 mb-8"
          >
            experiências reais
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative flex overflow-x-hidden py-8"
      >
        <div className="animate-marquee flex whitespace-nowrap">
          {[...FEEDBACK, ...FEEDBACK].map((item, idx) => (
            <div
              key={idx}
              className={`inline-block w-80 mx-4 p-8 rounded-[2rem] whitespace-normal border transition-transform hover:scale-105 ${isDark ? 'bg-slate-900/80 border-white/5' : 'bg-white border-slate-200 shadow-xl shadow-indigo-500/5'
                }`}
            >
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className={`text-sm italic mb-6 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                "{item.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center font-black text-indigo-500">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.name}</h4>
                  <p className="text-[10px] text-indigo-500 font-bold uppercase">{item.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
