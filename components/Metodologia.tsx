
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Zap, Target, Palette, Cpu, Rocket, Shield, Send } from 'lucide-react';

interface MetodologiaProps {
  theme: 'dark' | 'light';
  onBack: () => void;
}

export const Metodologia: React.FC<MetodologiaProps> = ({ theme, onBack }) => {
  const isDark = theme === 'dark';

  const steps = [
    {
      icon: Target,
      title: "1. Diagnóstico Estratégico",
      content: "Antes de escrever uma linha de código, entendemos o seu negócio. Analisamos objetivos, público, concorrência e necessidades reais para criar uma solução sob medida."
    },
    {
      icon: Palette,
      title: "2. Design com Propósito",
      content: "Cada layout é pensado para guiar o usuário. Design moderno, visual limpo, animações inteligentes e foco total em usabilidade e conversão — principalmente no celular."
    },
    {
      icon: Cpu,
      title: "3. Desenvolvimento de Alta Performance",
      content: "Código limpo, organizado e escalável. Sites rápidos, responsivos e preparados para crescer junto com o seu negócio."
    },
    {
      icon: Zap,
      title: "4. Automação & Interação",
      content: "Integramos chatbots, formulários inteligentes e automações para transformar visitantes em oportunidades reais de contato."
    },
    {
      icon: Rocket,
      title: "5. Entrega, Testes e Evolução",
      content: "Testamos em todos os dispositivos, ajustamos cada detalhe e entregamos um site pronto para o mercado. E se precisar evoluir, a Nexus Dev cresce com você."
    }
  ];

  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      <button
        onClick={onBack}
        className={`flex items-center gap-2 mb-12 text-sm font-bold uppercase tracking-widest transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-indigo-600'}`}
      >
        <ChevronLeft size={20} /> Voltar para Home
      </button>

      <div className={`glass p-12 md:p-20 rounded-[3rem] border ${isDark ? 'border-white/10' : 'bg-white border-slate-200 shadow-2xl'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h1 className={`text-4xl md:text-6xl font-black mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              🧠 Metodologia <span className="gradient-text">Nexus Dev</span>
            </h1>
            <p className={`text-lg md:text-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Na Nexus Dev, não criamos apenas sites. Criamos experiências digitais que geram confiança, conversão e crescimento.
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center text-white shadow-xl">
                  <step.icon size={32} />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{step.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
  <div className="mt-16 p-12 rounded-[2.5rem] text-center">
  <h4 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>🔥 Nosso Compromisso</h4>
  <br />
  
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
    {[
      { icon: Shield, t: "Clareza" },
      { icon: Send, t: "Direto" },
      { icon: Zap, t: "Moderno" },
      { icon: Rocket, t: "Resultado" }
    ].map((item, i) => (
      <div key={i} className="flex flex-col items-center gap-1">
        <div className="text-indigo-500"><item.icon size={28} /></div>
        <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.t}</span>
      </div>
    ))}
  </div>
  
  <p className={`text-lg italic mb-10 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
    "Na Nexus Dev, tecnologia e estratégia caminham juntas."
  </p>
  
  <a
    href="https://wa.me/5515996901137"
    target="_blank"
    className="inline-flex px-10 py-5 gradient-bg text-white font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-all"
  >
    📩 Vamos tirar seu projeto do papel?
  </a>
</div>

    </div>
  );
};
