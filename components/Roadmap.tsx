import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Palette, Terminal, Zap } from 'lucide-react';

const MILESTONES = [
    { icon: <Compass />, title: 'Imersão', desc: 'Entendendo seu DNA' },
    { icon: <Palette />, title: 'Concepção', desc: 'Design que converte' },
    { icon: <Terminal />, title: 'Engenharia', desc: 'Código de elite' },
    { icon: <Zap />, title: 'Aceleração', desc: 'Performance extrema' }
];

export const Roadmap: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    const isDark = theme === 'dark';

    return (
        <section className={`py-20 ${isDark ? 'bg-slate-950/50' : 'bg-white'}`}>
            <div className="container mx-auto px-6">
                <div className="flex flex-row flex-wrap items-start justify-center gap-6 lg:gap-4 lg:justify-between relative">
                    <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

                    {MILESTONES.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative z-10 flex flex-col items-center text-center group w-[140px] md:w-[160px] lg:w-1/5 shrink-0"
                        >
                            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${isDark ? 'bg-slate-900' : 'bg-slate-50'} border ${isDark ? 'border-slate-800' : 'border-slate-200'} flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-500 shadow-xl`}>
                                {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                            </div>
                            <h4 className="text-sm md:text-xl font-bold mb-2 uppercase tracking-tighter">{item.title}</h4>
                            <p id="map" className={`text-[10px] md:text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'} font-medium`}>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
