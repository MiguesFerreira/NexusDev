import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone, Tablet, CheckCircle2 } from 'lucide-react';

interface DeviceShowcaseProps {
    theme: 'dark' | 'light';
}

interface DeviceInfo {
    id: 'pc' | 'tablet' | 'mobile';
    title: string;
    description: string;
    benefits: string[];
    img: string;
    icon: React.ReactNode;
}

const DEVICES: DeviceInfo[] = [
    {
        id: 'tablet',
        title: 'Tablet',
        description: 'Experiência híbrida perfeita.',
        benefits: [
            'Navegação por toque otimizada',
            'Layout adaptável dinâmico',
            'Performance fluida'
        ],
        img: '/img/nexustablet.png',
        icon: <Tablet className="w-6 h-6" />
    },
    {
        id: 'pc',
        title: 'Desktop',
        description: 'Potência e clareza total.',
        benefits: [
            'Visualização ultra-wide',
            'Interações complexas',
            'Experiência imersiva'
        ],
        img: '/img/nexusmonitor.png',
        icon: <Monitor className="w-6 h-6" />
    },
    {
        id: 'mobile',
        title: 'Mobile',
        description: 'O mundo na palma da mão.',
        benefits: [
            'Mobile-first design',
            'Velocidade máxima',
            'Interface intuitiva'
        ],
        img: '/img/nexuscel.png',
        icon: <Smartphone className="w-6 h-6" />
    }
];

export const DeviceShowcase: React.FC<DeviceShowcaseProps> = ({ theme }) => {
    const isDark = theme === 'dark';
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section id="tecnologia" className="py-24 relative overflow-hidden bg-transparent">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <header className="lg:w-1/2 text-left">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}
                        >
                            Performance em <span className="gradient-text">Qualquer Tela</span>
                        </motion.h2>
                        <p className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Nossos sites são projetados para oferecer uma experiência excepcional, independentemente do dispositivo.
                            Da precisão do desktop à agilidade do mobile, garantimos que sua marca brilhe em todos os lugares.
                        </p>

                        <nav className="space-y-4">
                            {DEVICES.map((device) => (
                                <motion.article
                                    key={device.id}
                                    whileHover={{ x: 5 }}
                                    className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 relative group cursor-pointer overflow-hidden`}
                                    onMouseEnter={() => setHoveredId(device.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            scale: hoveredId === device.id ? 0.98 : 1,
                                            opacity: hoveredId === device.id ? 1 : 0
                                        }}
                                        className={`absolute inset-0 -z-10 ${isDark
                                            ? 'bg-gradient-to-r from-indigo-500/20 via-indigo-500/5 to-transparent'
                                            : 'bg-gradient-to-r from-indigo-50 via-indigo-50/50 to-transparent'
                                            }`}
                                    />

                                    <motion.div
                                        animate={{ scale: hoveredId === device.id ? 0.92 : 1 }}
                                        className={`p-3 rounded-xl transition-colors duration-300 relative z-10 ${isDark ? 'bg-slate-800 text-indigo-400' : 'bg-white text-indigo-600 shadow-sm'}`}
                                    >
                                        {device.icon}
                                    </motion.div>
                                    <div className="relative z-10 pr-4">
                                        <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{device.title}</h4>
                                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{device.description}</p>
                                    </div>
                                </motion.article>
                            ))}
                        </nav>
                    </header>

                    <div className="lg:w-[60%] relative h-[600px] w-full hidden lg:flex items-end justify-start gap-8 pointer-events-auto -mt-24 lg:-ml-80">
                        <motion.figure
                            className="z-30 cursor-pointer shrink-0"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ zIndex: 50 }}
                            onHoverStart={() => setHoveredId('mobile')}
                            onHoverEnd={() => setHoveredId(null)}
                        >
                            <div className="relative group">
                                <motion.div
                                    animate={{ scale: hoveredId === 'mobile' ? 0.85 : 1.1, opacity: hoveredId === 'mobile' ? 0.6 : 0 }}
                                    className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full -z-10"
                                />
                                <motion.img
                                    animate={{ scale: hoveredId === 'mobile' ? 1.1 : 1 }}
                                    src="/img/nexuscel.png"
                                    alt="Mobile View"
                                    className="w-32 md:w-40 rounded-[2rem] bg-transparent transition-transform duration-500"
                                />
                                <AnimatePresence>
                                    {hoveredId === 'mobile' && (
                                        <motion.figcaption
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            className="absolute -top-36 left-0 w-64 p-5 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.3)] z-[60]"
                                        >
                                            <h5 className="text-white font-bold mb-2 flex items-center gap-2">
                                                <Smartphone size={16} className="text-indigo-400" /> Mobile Nexus
                                            </h5>
                                            <ul className="space-y-2">
                                                {DEVICES[2].benefits.map((b, i) => (
                                                    <li key={i} className="text-xs text-slate-300 flex items-center gap-2 font-medium">
                                                        <CheckCircle2 size={12} className="text-indigo-400" /> {b}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.figcaption>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.figure>

                        <motion.figure
                            className="z-20 cursor-pointer shrink-0"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ zIndex: 50 }}
                            onHoverStart={() => setHoveredId('pc')}
                            onHoverEnd={() => setHoveredId(null)}
                        >
                            <div className="relative group">
                                <motion.div
                                    animate={{ scale: hoveredId === 'pc' ? 0.85 : 1.1, opacity: hoveredId === 'pc' ? 0.6 : 0 }}
                                    className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full -z-10"
                                />
                                <motion.img
                                    animate={{ scale: hoveredId === 'pc' ? 1.05 : 1 }}
                                    src="/img/nexusmonitor.png"
                                    alt="PC View"
                                    className="w-[400px] lg:w-[500px] rounded-xl bg-transparent transition-transform duration-500"
                                />
                                <AnimatePresence>
                                    {hoveredId === 'pc' && (
                                        <motion.figcaption
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            className="absolute -top-36 left-1/2 -translate-x-1/2 w-64 p-5 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.3)] z-[60]"
                                        >
                                            <h5 className="text-white font-bold mb-2 flex items-center gap-2">
                                                <Monitor size={16} className="text-indigo-400" /> Desktop Nexus
                                            </h5>
                                            <ul className="space-y-2">
                                                {DEVICES[1].benefits.map((b, i) => (
                                                    <li key={i} className="text-xs text-slate-300 flex items-center gap-2 font-medium">
                                                        <CheckCircle2 size={12} className="text-indigo-400" /> {b}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.figcaption>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.figure>

                        <motion.figure
                            className="z-10 cursor-pointer shrink-0"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ zIndex: 50 }}
                            onHoverStart={() => setHoveredId('tablet')}
                            onHoverEnd={() => setHoveredId(null)}
                        >
                            <div className="relative group">
                                <motion.div
                                    animate={{ scale: hoveredId === 'tablet' ? 0.85 : 1.1, opacity: hoveredId === 'tablet' ? 0.6 : 0 }}
                                    className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full -z-10"
                                />
                                <motion.img
                                    animate={{ scale: hoveredId === 'tablet' ? 1.1 : 1 }}
                                    src="/img/nexustablet.png"
                                    alt="Tablet View"
                                    className="w-56 lg:w-72 rounded-xl bg-transparent transition-transform duration-500"
                                />
                                <AnimatePresence>
                                    {hoveredId === 'tablet' && (
                                        <motion.figcaption
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            className="absolute -top-36 right-0 w-64 p-5 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.3)] z-[60]"
                                        >
                                            <h5 className="text-white font-bold mb-2 flex items-center gap-2">
                                                <Tablet size={16} className="text-indigo-400" /> Tablet Nexus
                                            </h5>
                                            <ul className="space-y-2">
                                                {DEVICES[0].benefits.map((b, i) => (
                                                    <li key={i} className="text-xs text-slate-300 flex items-center gap-2 font-medium">
                                                        <CheckCircle2 size={12} className="text-indigo-400" /> {b}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.figcaption>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.figure>
                    </div>
                </div>
            </div>
        </section>
    );
};
