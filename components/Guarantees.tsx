import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Headphones, HeartHandshake, Zap, Award, Lock } from 'lucide-react';

const GUARANTEES = [
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: 'Garantia de Satisfação',
        desc: 'Comprometimento total com a entrega. Só ficamos satisfeitos quando você estiver impressionado.',
        badge: '100% Seguro'
    },
    {
        icon: <Headphones className="w-8 h-8" />,
        title: 'Suporte Vitalício',
        desc: 'Oferecemos monitoramento e suporte contínuo após o lançamento para garantir estabilidade.',
        badge: '24/7 Ativo'
    },
    {
        icon: <Lock className="w-8 h-8" />,
        title: 'Segurança de Dados',
        desc: 'Implementação de protocolos de segurança avançados e criptografia de ponta a ponta.',
        badge: 'SSL Premium'
    },
    {
        icon: <Zap className="w-8 h-8" />,
        title: 'Alta Performance',
        desc: 'Código otimizado para velocidade máxima, garantindo o melhor Core Web Vitals do setor.',
        badge: 'Ultra Rápido'
    },
    {
        icon: <Award className="w-8 h-8" />,
        title: 'Qualidade Premium',
        desc: 'Seguimos os mais altos padrões de design e desenvolvimento do mercado global.',
        badge: 'Elite Dev'
    },
    {
        icon: <HeartHandshake className="w-8 h-8" />,
        title: 'Parceria Estratégica',
        desc: 'Mais que fornecedores, somos parceiros focados no crescimento real do seu faturamento.',
        badge: 'Foco em ROI'
    }
];

export const Guarantees: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    const isDark = theme === 'dark';

    return (
        <section className={`py-24 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
            <div className="container mx-auto px-6">
                <header className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black mb-6"
                    >
                        Sua confiança é a nossa <span className="text-blue-500">prioridade #1</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`max-w-2xl mx-auto text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                        Trabalhamos com os mais altos níveis de entrega técnica e ética, garantindo segurança e resultados para o seu investimento.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {GUARANTEES.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'} hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] group relative overflow-hidden`}
                        >
                            <div className="absolute top-4 right-4 bg-blue-500/10 text-blue-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest border border-blue-500/20">
                                {item.badge}
                            </div>

                            <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-500 inline-block">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                            <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
                >
                    <div className="flex items-center gap-2 font-bold text-lg"><ShieldCheck /> SSL SEGURO</div>
                    <div className="flex items-center gap-2 font-bold text-lg"><Award /> CERTIFICADO DEV</div>
                    <div className="flex items-center gap-2 font-bold text-lg"><Zap /> RAPIDIDADE</div>
                </motion.div>
            </div>
        </section>
    );
};
