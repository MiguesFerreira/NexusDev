
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Target, Users, Zap } from 'lucide-react';

interface AboutProps { theme: 'dark' | 'light'; }

export const About: React.FC<AboutProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const containerRef = React.useRef(null);

  const [isHovered, setIsHovered] = React.useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  const stats = [
    { icon: Target, title: 'Objetivo', desc: 'Sua conversão é nossa prioridade absoluta.' },
    { icon: Zap, title: 'Velocidade', desc: 'Performance otimizada para Core Web Vitals.' },
    { icon: Shield, title: 'Confiança', desc: 'Suporte humanizado e manutenção contínua.' },
    { icon: Users, title: 'UX Design', desc: 'Foco total na experiência do usuário final.' },
  ];

  return (
    <section ref={containerRef} id="sobre" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
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

          <div className="hidden lg:flex lg:w-1/2 relative h-[700px] items-center justify-center">
            <motion.div
              style={{ y: yParallax }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`relative z-10 drop-shadow-2xl w-[180%] max-w-none flex items-center justify-center`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: isHovered ? -5 : [-1.5, 1.5, -1.5],
                    x: isHovered ? -150 : 0,
                    opacity: isHovered ? 0.4 : 1,
                    scale: isHovered ? 1.1 : 1.3,
                    filter: isHovered ? 'blur(4px)' : 'blur(0px)'
                  }}
                  transition={{
                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    default: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
                  }}
                  className="absolute z-20"
                >
                  <img
                    src="/img/nexusnote.png"
                    alt="Nexus Dev Notebook Closed"
                    className="w-[1400px] h-auto object-contain translate-x-23"
                  />

                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 300, scale: 0.8, rotate: 10 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 150 : 400,
                    scale: isHovered ? 1.4 : 0.8,
                    rotate: isHovered ? 0 : 15,
                  }}
                  transition={{
                    duration: 1.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="absolute z-30"
                >
                  <img
                    src="/img/nexusnoteaberto.png"
                    alt="Nexus Dev Notebook Open"
                    className="w-[700px] h-auto object-contain drop-shadow-[0_0_80px_rgba(99,102,241,0.4)] translate-x-23"
                  />

                </motion.div>
              </div>
            </motion.div>

            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] blur-[100px] -z-10 opacity-30 ${isDark ? 'bg-indigo-600/40' : 'bg-indigo-400/30'}`} />
          </div>
        </div>
      </div>
    </section>
  );
};
