import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Code,
  Smartphone as Mobile,
  Layout,
  Palette
} from 'lucide-react';

/* =========================
   TYPES
========================= */

interface PortfolioProps {
  theme: 'dark' | 'light';
}

interface Project {
  title: string;
  category: string;
  image: string;        // Desktop
  mobileImage?: string;
  tabletImage?: string;
  tags: string[];
  desc: string;
  color: string;
}

/* =========================
   PROJECTS
========================= */

const PROJECTS: Project[] = [
  {
    title: "AuraElegance",
    category: "Site de Perfumes",
    image: "/img/aura.png",
    mobileImage: "/imgsResp/auracel.png",
    tabletImage: "/imgsResp/auratablet.png",
    tags: ["UI/UX", "Tailwind", "Motion", "Js", "Responsive"],
    desc: "Plataforma premium para fragrâncias de luxo.",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "Cronep",
    category: "Site de Tráfego Pago",
    image: "/img/cronep.png",
    mobileImage: "/imgsResp/cronepcel.png",
    tabletImage: "/imgsResp/croneptablet.png",
    tags: ["React", "Js", "Responsive", "UI/UX", "Tailwind"],
    desc: "Landing page de alta conversão.",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Nexus",
    category: "Impermeabilização Técnica",
    image: "/img/nexu.png",
    mobileImage: "/imgsResp/nexucel.png",
    tabletImage: "/imgsResp/nexutablet.png",
    tags: ["React", "Js", "Responsive", "UI/UX", "Tailwind"],
    desc: "Portal corporativo de alta engenharia.",
    color: "from-indigo-500 to-purple-600"
  },
  {
    title: "Vintage & Blade",
    category: "Barbearia Moderna",
    image: "/img/vintage.png",
    mobileImage: "/imgsResp/vintagecel.png",
    tabletImage: "/imgsResp/vintagetablet.png",
    tags: ["React", "Js", "Responsive", "UI/UX", "Tailwind"],
    desc: "Sistema de agendamento moderno.",
    color: "from-amber-500 to-orange-600"
  }
];

const DeviceMockup: React.FC<{
  image: string,
  mobileImage?: string,
  tabletImage?: string,
  theme: 'dark' | 'light'
}> = ({ image, mobileImage, tabletImage, theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="relative w-full aspect-[16/10] md:aspect-[16/9] flex items-center justify-center p-4">
      {/* Laptop / PC Monitor Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="relative w-[85%] lg:w-[75%] aspect-video rounded-xl overflow-hidden border-4 border-slate-800 shadow-2xl z-10 bg-slate-900 group/screen"
      >
        <img src={image} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/screen:scale-105" alt="Desktop View" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-6 bg-slate-800/90 backdrop-blur-md flex items-center px-3 gap-1.5 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-amber-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
      </motion.div>

      {/* Tablet Frame */}
      <motion.div
        initial={{ opacity: 0, x: 20, rotate: 2 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-4 right-[2%] md:right-[5%] w-[32%] md:w-[28%] aspect-[3/4] rounded-2xl overflow-hidden border-[6px] border-slate-800 shadow-2xl z-20 bg-slate-900 group/tablet"
      >
        <img src={tabletImage || image} className={`w-full h-full transition-transform duration-500 group-hover/tablet:scale-110 ${tabletImage ? 'object-cover' : 'object-cover object-top'}`} alt="Tablet View" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-slate-700/50 rounded-full" />
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/20 rounded-full" />
      </motion.div>

      {/* Mobile Frame */}
      <motion.div
        initial={{ opacity: 0, x: -20, rotate: -2 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-0 left-[2%] md:left-[8%] w-[22%] md:w-[18%] aspect-[9/19.5] rounded-[2.5rem] overflow-hidden border-[6px] border-slate-800 shadow-2xl z-30 bg-slate-900 group/mobile"
      >
        <img src={mobileImage || image} className={`w-full h-full transition-transform duration-500 group-hover/mobile:scale-110 ${mobileImage ? 'object-cover' : 'object-cover object-top'}`} alt="Mobile View" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-6 bg-slate-800 rounded-b-2xl flex items-center justify-center">
          <div className="w-6 h-1.5 bg-slate-700/50 rounded-full" />
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full shadow-sm" />
      </motion.div>
    </div>
  );
};

export const PortfolioPage: React.FC<PortfolioProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`pt-32 pb-24 ${isDark ? 'bg-transparent' : 'bg-slate-50'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full gradient-bg text-[10px] font-black uppercase tracking-widest text-white mb-6"
          >
            Digital Portfolio
          </motion.div>

          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Soluções de <br />
            <span className="gradient-text">Alto Impacto</span>
          </h1>

          <p className={`max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Cada projeto é uma peça única de engenharia e design, focada em maximizar a autoridade digital e os resultados do negócio.
          </p>
        </div>

        <div className="space-y-32">
          {PROJECTS.map((project, idx) => (
            <div key={project.title} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
              {/* Visual Side */}
              <div className="w-full lg:w-3/5">
                <DeviceMockup
                  image={project.image}
                  mobileImage={project.mobileImage}
                  tabletImage={project.tabletImage}
                  theme={theme}
                />
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-2/5 space-y-6">
                <div className="space-y-2">
                  <div className={`text-xs font-black uppercase tracking-[0.2em] px-3 py-1 bg-indigo-500/10 text-indigo-500 inline-block rounded-lg`}>
                    {project.category}
                  </div>
                  <h3 className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {project.title}
                  </h3>
                </div>

                <p className={`text-lg md:text-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className={`text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full border ${isDark
                        ? 'border-white/10 bg-white/5 text-slate-300 hover:border-indigo-500/50'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-500'
                        } transition-colors cursor-default`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-8 flex flex-wrap gap-4">
                  <a
                    href="https://github.com/MiguesFerreira"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/20 active:scale-95 transition-all flex items-center gap-2 group"
                  >
                    Ver no GitHub <Github size={20} className="group-hover:rotate-12 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { icon: Palette, title: "UI Design", val: "99%", color: "text-purple-500" },
            { icon: Mobile, title: "Mobile First", val: "100%", color: "text-blue-500" },
            { icon: Code, title: "Code Quality", val: "95%", color: "text-indigo-500" },
            { icon: Layout, title: "UX Strategy", val: "98%", color: "text-cyan-500" }
          ].map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 md:p-8 rounded-[2.5rem] text-center border transition-all hover:-translate-y-2 ${isDark ? 'glass border-white/5 hover:border-indigo-500/30' : 'bg-white border-slate-200 shadow-sm hover:shadow-xl'}`}
            >
              <div className={`inline-flex p-4 rounded-2xl bg-slate-500/5 ${skill.color} mb-4`}>
                <skill.icon size={32} />
              </div>
              <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                {skill.title}
              </h4>
              <div className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {skill.val}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};