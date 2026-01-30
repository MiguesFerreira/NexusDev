import React from 'react';
import { motion } from 'framer-motion';

const TECHNOLOGIES = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Tailwind', icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Netlify', icon: 'https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg' },
];

export const TechCarousel: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    const isDark = theme === 'dark';

    return (
        <section className={`py-12 overflow-hidden ${isDark ? 'bg-slate-950/30' : 'bg-slate-50/50'}`}>
            <div className="container mx-auto px-6 mb-8 text-center">
                <h3 className={`text-sm font-bold uppercase tracking-widest ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    Tecnologias que Dominamos
                </h3>
            </div>

            <div className="relative flex">
                <motion.div
                    className="flex gap-12 items-center whitespace-nowrap"
                    animate={{
                        x: [0, -1920],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {[...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 group transition-all duration-300"
                        >
                            <div className={`w-12 h-12 flex items-center justify-center rounded-xl p-2 h-12 transition-all duration-300 ${isDark ? 'bg-slate-900 group-hover:bg-slate-800' : 'bg-white group-hover:bg-slate-100 shadow-sm'}`}>
                                <img
                                    src={tech.icon}
                                    alt={tech.name}
                                    className="w-full h-full object-contain transition-all duration-300"
                                />
                            </div>
                            <span className={`text-lg font-bold ${isDark ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-900'} transition-colors`}>
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Gradient overlays for smooth fade edges */}
                <div className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r ${isDark ? 'from-slate-950 to-transparent' : 'from-slate-50 to-transparent'} z-10`} />
                <div className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l ${isDark ? 'from-slate-950 to-transparent' : 'from-slate-50 to-transparent'} z-10`} />
            </div>
        </section>
    );
};
