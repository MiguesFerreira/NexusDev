import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Code, Palette, Smartphone, Layout } from 'lucide-react';

interface PortfolioProps {
  theme: 'dark' | 'light';
}

const PROJECTS = [
  {
    title: "AuraElegamnce",
    category: "Site de Perfumes",
    image: "/img/aura.png",
    tags: ["UI/UX", "Tailwind", "Motion", "Js", "Responsive"],
    desc: "Site de vendas de perfumes de luxo."
  },
  {
    title: "Cronep",
    category: "Site de Tráfego Pago",
    image: "/img/cronep.png",
    tags: ["React", "Js", "Responsive", "UI/UX", "Tailwind"],
    desc: "Site focado em tráfego pago de alta performance."
  },
  {
    title: "Nexus",
    category: "Site de Impermeabilização Técnica",
    image: "/img/nexu.png",
    tags: ["React", "Js", "Responsive", "UI/UX", "Tailwind"],
    desc: "Site especializado em impermeabilização técnica, oferecendo soluções confiáveis para proteger construções de infiltrações"
  },
  {
    title: "Vintage & Blade",
    category: "Site de Barbearia",
    image: "/img/vintage.png",
    tags: ["React", "Js", "Responsive", "UI/UX", "Tailwind"],
    desc: "Site moderno para barbearia, pensado para oferecer uma experiência digital completa aos clientes."
  }
];

export const PortfolioPage: React.FC<PortfolioProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          className="inline-block px-4 py-1.5 rounded-full gradient-bg text-[10px] font-black uppercase tracking-widest text-white mb-4"
        >
          Meus Projetos
        </motion.div>

        <h1 className={`text-5xl md:text-7xl font-black mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Projetos <span className="gradient-text">Recentes</span>
        </h1>

        <p className={`max-w-2xl mx-auto text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Confira alguns dos projetos que transformaram a presença digital dos nossos clientes através de design de alto impacto.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ delay: idx * 0.1 }}
            className={`group relative overflow-hidden rounded-[2.5rem] border transition-all duration-500 ${isDark ? 'bg-slate-900/50 border-white/5' : 'bg-white border-slate-200 shadow-xl'}`}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div className="flex gap-4">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-colors"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2 block">{project.category}</span>
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                </div>
              </div>
              <p className={`text-sm mb-6 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className={`text-[10px] font-bold px-3 py-1 rounded-full border ${isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 grid md:grid-cols-4 gap-8">
        {[
          { icon: Palette, title: "UI Design", val: "99%" },
          { icon: Smartphone, title: "Mobile", val: "100%" },
          { icon: Code, title: "Clean Code", val: "95%" },
          { icon: Layout, title: "UX Flow", val: "98%" }
        ].map((skill, i) => (
          <div key={i} className={`p-8 rounded-3xl text-center border ${isDark ? 'glass border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="inline-flex p-4 rounded-2xl bg-indigo-500/10 text-indigo-500 mb-4">
              <skill.icon size={32} />
            </div>
            <h4 className={`text-sm font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{skill.title}</h4>
            <div className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{skill.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
};