
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Github, Mail, Phone, ArrowUpRight, Globe, ShieldCheck } from 'lucide-react';

interface FooterProps {
  theme: 'dark' | 'light';
  onShowHome?: () => void;
  onShowPortfolio?: () => void;
  onOpenChat?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, onShowHome, onShowPortfolio, onOpenChat }) => {
  const isDark = theme === 'dark';

  return (
    <footer className="relative mt-20 group">
      <div
        className={`absolute top-0 left-0 w-full h-32 -translate-y-full overflow-hidden pointer-events-none`}
      >
        <div
          className={`absolute bottom-0 left-0 w-full h-[200%] origin-bottom-left -skew-y-3 transition-colors duration-700 ${isDark ? 'bg-black' : 'bg-slate-50'
            }`}
        />
      </div>

      <div className={`relative pt-20 pb-10 transition-colors duration-700 ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
        }`}>
        <div className="absolute bottom-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[80%] bg-indigo-600 blur-[150px] rounded-full" />
          <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[60%] bg-purple-900 blur-[150px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-8 mb-20">

            <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
              <div
                className="flex items-center gap-3 cursor-pointer group/logo"
                onClick={onShowHome}
              >
                <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover/logo:rotate-12 transition-transform duration-500">
                  <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                    <img src="/img/favicon.png" className="w-8 h-8" alt="Ícone" />
                  </div>

                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black font-display tracking-tighter leading-none">
                    Nexus<span className="text-indigo-500">Dev</span>
                  </span>
                </div>
              </div>
              <p className={`text-sm leading-relaxed max-w-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Engenharia de software com foco em experiências sensoriais e conversão de alta performance. Transformamos o complexo em elegante.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: "https://instagram.com/nexusdev.br" },
                  { icon: Github, href: "https://github.com/miguelferreira18" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 group/social ${isDark
                      ? 'bg-white/5 border-white/10 text-white hover:border-indigo-500 hover:bg-indigo-500/10'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50'
                      }`}
                  >
                    <social.icon size={18} className="group-hover/social:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start md:items-start text-left lg:pl-20">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-indigo-500">Explorar</h4>
              <ul className="flex flex-col gap-5">
                {[
                  { label: "Home", action: onShowHome },
                  { label: "Sobre", action: () => { onShowHome?.(); setTimeout(() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
                  { label: "Map", action: () => { onShowHome?.(); setTimeout(() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
                  { label: "Tech", action: () => { onShowHome?.(); setTimeout(() => document.getElementById('tecnologia')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
                  { label: "Pacotes", action: () => { onShowHome?.(); setTimeout(() => document.getElementById('serviços')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
                  { label: "Depoimentos", action: () => { onShowHome?.(); setTimeout(() => document.getElementById('depoimentos')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
                  { label: "FAQ", action: () => { onShowHome?.(); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
                  { label: "Contato", action: () => { onShowHome?.(); setTimeout(() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
                  { label: "Portfólio", action: onShowPortfolio },
                ].map((link, i) => (
                  <li key={i}>
                    <button
                      onClick={link.action}
                      className={`text-sm font-medium transition-all flex items-center gap-3 group/link ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-indigo-600'
                        }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 scale-0 group-hover/link:scale-100 transition-transform" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-8 rounded-[2.5rem] border relative overflow-hidden group/contact self-start ${isDark ? 'bg-white/5 border-white/10' : 'bg-indigo-50/50 border-indigo-100'
              }`}>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/contact:opacity-20 transition-opacity">
                <Globe size={64} className="text-indigo-500" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-indigo-500">Contato Direto</h4>
              <div className="space-y-4">
                <a href="mailto:nexusdev.contato@gmail.com" className="flex items-center gap-3 text-sm font-bold group/mail">
                  <Mail size={16} className="text-indigo-500" />
                  <span className="truncate group-hover/mail:underline decoration-indigo-500 underline-offset-4">nexusdev.contato@gmail.com</span>
                </a>
                <a href="https://wa.me/5515996901137" className="flex items-center gap-3 text-sm font-bold group/phone">
                  <Phone size={16} className="text-indigo-500" />
                  <span>(15) 99690-1137</span>
                </a>
              </div>
              <button
                onClick={onOpenChat}
                className="mt-8 w-full py-4 px-4 gradient-bg rounded-2xl text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-indigo-500/20"
              >
                Começar Projeto <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          <div className={`pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-6 ${isDark ? 'border-white/5' : 'border-slate-200'
            }`}>
            <div className="flex items-center gap-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                © {new Date().getFullYear()} Nexus Dev. Excelência Global.
              </p>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-emerald-500" />
                Criptografia de dados segura
              </div>
              <div className="h-4 w-px bg-slate-800" />
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Estado da rede: Ótimo
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
