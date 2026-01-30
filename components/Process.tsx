import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code2, Rocket, Search, ShieldCheck } from 'lucide-react';

const STEPS = [
    {
        icon: <Search className="w-6 h-6" />,
        title: 'Descoberta',
        desc: 'Análise profunda do seu negócio, público e objetivos para traçar o melhor caminho.',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        icon: <Lightbulb className="w-6 h-6" />,
        title: 'Estratégia & Design',
        desc: 'Criação de protótipos focados em UX/UI que resolvem problemas reais com elegância.',
        color: 'from-purple-500 to-indigo-500'
    },
    {
        icon: <Code2 className="w-6 h-6" />,
        title: 'Desenvolvimento',
        desc: 'Transformação do design em código limpo, rápido e escalável com as melhores tecnologias.',
        color: 'from-indigo-500 to-blue-500'
    },
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: 'QA & Refinamento',
        desc: 'Testes rigorosos para garantir que cada pixel e funcionalidade estejam perfeitos.',
        color: 'from-cyan-500 to-blue-500'
    },
    {
        icon: <Rocket className="w-6 h-6" />,
        title: 'Lançamento',
        desc: 'Sua solução vai ao ar com todo o suporte e otimizações necessárias para o sucesso.',
        color: 'from-blue-600 to-indigo-600'
    }
];

export const Process: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    const isDark = theme === 'dark';

    return (
        <section className={`py-24 relative overflow-hidden ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <header className="max-w-3xl mx-auto text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-blue-500 font-bold tracking-tight uppercase text-sm mb-4 block"
                    >
                        Nosso Fluxo
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black mb-6 tracking-tight"
                    >
                        Como transformamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">ideias em impacto</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                        Um processo detalhado e transparente para garantir que sua visão seja executada com excelência técnica e estratégica.
                    </motion.p>
                </header>

                <div className="relative max-w-5xl mx-auto">
                    <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-indigo-500/50 to-transparent md:-translate-x-1/2" />

                    <div className="space-y-12 md:space-y-0">
                        {STEPS.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`relative flex items-center md:pb-24 last:pb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
                                    <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'} backdrop-blur-sm hover:border-blue-500/50 transition-colors duration-500 group`}>
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6 md:hidden lg:flex ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                            {step.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                        <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 w-16 h-16 rounded-full bg-slate-950 border-2 border-slate-900 flex items-center justify-center z-20 overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                    <motion.div
                                        animate={{
                                            background: ["linear-gradient(rgba(59,130,246,0.1), rgba(59,130,246,0.1))", "linear-gradient(rgba(59,130,246,0.4), rgba(59,130,246,0.4))", "linear-gradient(rgba(59,130,246,0.1), rgba(59,130,246,0.1))"]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="absolute inset-0"
                                    />
                                    <span className="text-xl font-black text-blue-500 relative z-10">{index + 1}</span>
                                </div>

                                <div className="hidden md:block w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
