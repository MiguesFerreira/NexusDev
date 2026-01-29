
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Briefcase, Home, Headphones } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
  theme: 'dark' | 'light';
  activeView: 'home' | 'portfolio' | 'metodologia';
  toggleTheme: () => void;
  onShowHome: () => void;
  onShowPortfolio: () => void;
  onOpenChat: () => void;
}

const NavLink: React.FC<{ children: React.ReactNode, onClick?: () => void, href?: string, active?: boolean, isDark: boolean }> = ({ children, onClick, href, active, isDark }) => {
  const content = (
    <div className={`relative text-sm font-semibold transition-colors group flex items-center gap-2 cursor-pointer py-2 ${active
        ? 'text-indigo-500'
        : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-indigo-600')
      }`}>
      {children}
      <span className={`hidden lg:block absolute -bottom-1 left-0 h-[2px] gradient-bg transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return <button onClick={onClick}>{content}</button>;
};

export const Navbar: React.FC<NavbarProps> = ({ scrolled, theme, activeView, toggleTheme, onShowHome, onShowPortfolio, onOpenChat }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDark = theme === 'dark';
  const isPortfolio = activeView === 'portfolio';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 ${scrolled
          ? (isDark ? 'bg-slate-950 border-b border-white/5 shadow-2xl' : 'bg-white border-b border-slate-200 shadow-md')
          : 'bg-transparent border-b border-transparent shadow-none'
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer group shrink-0"
          onClick={() => { onShowHome(); setIsMenuOpen(false); }}
        >
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            <img src="/public/img/favicon.png" className="w-8 h-8" alt="Ícone" />
          </div>

          <span className={`text-2xl font-bold font-display tracking-tight transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Nexus<span className="text-indigo-500">Dev</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <NavLink onClick={onShowHome} active={activeView === 'home'} isDark={isDark}>
            <Home size={16} /> Home
          </NavLink>

          {!isPortfolio && (
            <>
              <NavLink href="#sobre" isDark={isDark}>Sobre</NavLink>
              <NavLink href="#serviços" isDark={isDark}>Pacotes</NavLink>
              <NavLink href="#depoimentos" isDark={isDark}>Depoimentos</NavLink>
              <NavLink href="#faq" isDark={isDark}>FAQ</NavLink>
              <NavLink href="#contato" isDark={isDark}>Contato</NavLink>
            </>
          )}

          <NavLink onClick={onShowPortfolio} active={isPortfolio} isDark={isDark}>
            <Briefcase size={16} /> Portfólio
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-slate-800/50 text-yellow-400 hover:bg-slate-800' : 'bg-slate-100 text-indigo-600 hover:bg-slate-200'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={onOpenChat}
            className={`hidden sm:flex px-6 py-2.5 gradient-bg rounded-full text-sm font-bold text-white items-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95 ${!scrolled && 'shadow-none'}`}
          >
            <Headphones size={18} /> Fale comigo
          </button>

          <button
            onClick={toggleMenu}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-[60]"
          >
            <motion.div
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className={`w-6 h-0.5 rounded-full ${isDark ? 'bg-white' : 'bg-slate-900'}`}
            />
            <motion.div
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`w-6 h-0.5 rounded-full ${isDark ? 'bg-white' : 'bg-slate-900'}`}
            />
            <motion.div
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className={`w-6 h-0.5 rounded-full ${isDark ? 'bg-white' : 'bg-slate-900'}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed inset-0 z-50 lg:hidden pt-24 px-6 ${isDark ? 'bg-slate-950' : 'bg-white'}`}
          >
            <div className="flex flex-col gap-6">
              <NavLink onClick={() => { onShowHome(); setIsMenuOpen(false); }} active={activeView === 'home'} isDark={isDark}>
                <Home size={24} /> <span className="text-xl">Home</span>
              </NavLink>

              {!isPortfolio && (
                <>
                  <a href="#sobre" onClick={() => setIsMenuOpen(false)} className={`text-xl font-bold py-2 border-b ${isDark ? 'border-white/5 text-slate-300' : 'border-slate-100 text-slate-700'}`}>Sobre</a>
                  <a href="#serviços" onClick={() => setIsMenuOpen(false)} className={`text-xl font-bold py-2 border-b ${isDark ? 'border-white/5 text-slate-300' : 'border-slate-100 text-slate-700'}`}>Pacotes</a>
                  <a href="#depoimentos" onClick={() => setIsMenuOpen(false)} className={`text-xl font-bold py-2 border-b ${isDark ? 'border-white/5 text-slate-300' : 'border-slate-100 text-slate-700'}`}>Depoimentos</a>
                  <a href="#faq" onClick={() => setIsMenuOpen(false)} className={`text-xl font-bold py-2 border-b ${isDark ? 'border-white/5 text-slate-300' : 'border-slate-100 text-slate-700'}`}>FAQ</a>
                  <a href="#contato" onClick={() => setIsMenuOpen(false)} className={`text-xl font-bold py-2 border-b ${isDark ? 'border-white/5 text-slate-300' : 'border-slate-100 text-slate-700'}`}>Contato</a>
                </>
              )}

              <NavLink onClick={() => { onShowPortfolio(); setIsMenuOpen(false); }} active={isPortfolio} isDark={isDark}>
                <Briefcase size={24} /> <span className="text-xl">Portfólio</span>
              </NavLink>

              <button onClick={() => { onOpenChat(); setIsMenuOpen(false); }} className="mt-8 w-full py-5 gradient-bg rounded-2xl text-white font-bold text-lg">Fale comigo agora</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
