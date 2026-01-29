
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Globe, Cpu, Layout, ArrowUpRight, MessageSquareCode } from 'lucide-react';
import { ServicePackage } from '../types';

interface ServicesProps {
  theme: 'dark' | 'light';
  onPackageClick: (pkg: string) => void;
}

const PACKAGES: ServicePackage[] = [
  {
    id: 'basico',
    name: 'Pacote Básico',
    description: 'Site de 1 página, layout moderno e responsivo. Ideal para presença profissional rápida.',
    technologies: ['HTML & CSS Premium', 'Mobile First', 'SEO Base'],
    price: 'R$ 500,00',
    maintenance: 'R$ 100,00/mês',
    icon: <Layout className="w-8 h-8" />
  },
  {
    id: 'profissional',
    name: 'Pacote Profissional',
    description: 'Landing page focada em conversão, com design estratégico e funcionalidades interativas de alto nível.',
    technologies: ['JS Animations', 'Framer Motion', 'Conversion Focus'],
    price: 'R$ 900,00',
    maintenance: 'R$ 200,00/mês',
    icon: <Zap className="w-8 h-8" />,
    isPopular: true
  },
  {
    id: 'completo',
    name: 'Pacote Completo',
    description: 'Até 5 páginas, estrutura avançada e UX refinado para marcas em expansão.',
    technologies: ['Multi-page UX', 'Advanced Animations', 'Speed Optimize'],
    price: 'R$ 1.500,00',
    maintenance: 'R$ 300,00/mês',
    icon: <Globe className="w-8 h-8" />
  },
  {
    id: 'react',
    name: 'Pacote React',
    description: 'Tecnologia de ponta: SPA escalável com layout premium e chat de agendamento.',
    technologies: ['React Engine', 'Tailwind CSS', 'Dynamic Content'],
    price: 'R$ 4.000,00',
    maintenance: 'R$ 500,00/mês',
    icon: <Cpu className="w-8 h-8" />
  }
];

const EXTRA_PACKAGE: ServicePackage = {
  id: 'agendamento',
  name: 'Extra – Agendamento (React)',
  description: 'Sistema completo de automação 24h para converter visitantes em agendamentos diretos.',
  technologies: ['Chat Inteligente', 'WhatsApp Sync', 'Auto-Data Collection'],
  price: 'R$ 1.000,00',
  maintenance: 'R$ 200,00/mês',
  icon: <MessageSquareCode className="w-8 h-8" />,
  isExtra: true
};

interface PackageCardProps {
  pkg: ServicePackage;
  idx: number;
  compact?: boolean;
  isDark: boolean;
  onPackageClick: (pkg: string) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, idx, compact = false, isDark, onPackageClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{
      y: -20,
      scale: 1.04,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }}
    viewport={{ once: true }}
    className={`relative flex flex-col rounded-[2.5rem] transition-colors duration-300 group border z-10 hover:z-20 ${compact ? 'p-6 max-w-lg mx-auto' : 'p-8'
      } ${pkg.isPopular
        ? (isDark ? 'bg-indigo-950/30 border-indigo-500/50 shadow-2xl' : 'bg-white border-indigo-200 shadow-xl')
        : (isDark ? 'bg-slate-900/40 border-white/5 hover:border-indigo-500/30' : 'bg-white border-slate-200 shadow-sm')
      }`}
  >
    {pkg.isPopular && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2 rounded-full gradient-bg text-[10px] font-black uppercase tracking-widest text-white shadow-xl z-30">
        Mais Procurado
      </div>
    )}

    <div className={`${compact ? 'mb-4 p-2' : 'mb-6 p-4'} rounded-2xl inline-block transition-transform duration-500 group-hover:scale-110 ${pkg.isPopular ? 'bg-indigo-500 text-white' : (isDark ? 'bg-slate-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600')}`}>
      {React.cloneElement(pkg.icon as React.ReactElement, { className: compact ? "w-6 h-6" : "w-8 h-8" })}
    </div>

    <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-bold mb-2 group-hover:text-indigo-400 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h3>
    <p className={`text-sm mb-6 leading-relaxed flex-grow group-hover:text-slate-300 transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{pkg.description}</p>

    <div className={`mt-auto pt-6 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
      <div className="flex flex-col mb-6">
        <span className={`${compact ? 'text-2xl' : 'text-3xl'} font-black transition-transform origin-left group-hover:scale-105 ${isDark ? 'text-white' : 'text-slate-900'}`}>{pkg.price}</span>
        <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-500 mt-1">Manutenção: {pkg.maintenance}</span>
      </div>
      <button
        onClick={() => onPackageClick(pkg.isExtra ? 'Extra' : pkg.name)}
        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${pkg.isPopular ? 'gradient-bg text-white shadow-lg' : (isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 text-slate-800 hover:bg-indigo-500 hover:text-white')
          }`}
      >
        Selecionar <ArrowUpRight size={18} />
      </button>
    </div>
  </motion.div>
);

export const Services: React.FC<ServicesProps> = ({ theme, onPackageClick }) => {
  const isDark = theme === 'dark';

  return (
    <section id="serviços" className="py-24 relative overflow-visible">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            Nossos <span className="gradient-text">Pacotes</span>
          </motion.h2>
          <p className={`max-w-xl mx-auto text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Soluções diretas para o seu sucesso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {PACKAGES.map((pkg, idx) => (
            <PackageCard key={pkg.id} pkg={pkg} idx={idx} isDark={isDark} onPackageClick={onPackageClick} />
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <div className="w-full">
            <PackageCard pkg={EXTRA_PACKAGE} idx={5} compact={true} isDark={isDark} onPackageClick={onPackageClick} />
          </div>
        </div>
      </div>
    </section>
  );
};
