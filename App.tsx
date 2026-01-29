
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Chatbot } from './components/Chatbot';
import { Footer } from './components/Footer';
import { PortfolioPage } from './components/PortfolioPage';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { ContactForm } from './components/ContactForm';
import { CookieBanner } from './components/CookieBanner';
import { Metodologia } from './components/Metodologia';
import { SplashScreen } from './components/SplashScreen';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Anel de Foco - Agora sem delay (direto no cursorX/Y) */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-indigo-500/30 rounded-full pointer-events-none z-[9999] hidden lg:block"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-indigo-500/50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-indigo-500/50" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-indigo-500/50" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-indigo-500/50" />
      </motion.div>
      
      {/* Ponto de Precisão - Resposta Instantânea */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] hidden lg:block shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
};

const LightweightBackground = () => (
  <div className="fixed inset-0 pointer-events-none -z-50 bg-[#020617]">
    <div 
      className="absolute inset-0 opacity-[0.02]" 
      style={{ 
        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} 
    />
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(67,56,202,0.08),_transparent_50%),_radial-gradient(circle_at_80%_80%,_rgba(107,33,168,0.08),_transparent_50%)]" />
  </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentView, setCurrentView] = useState<'home' | 'portfolio' | 'metodologia'>('home');
  const [chatInitialPackage, setChatInitialPackage] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const navigateTo = (view: 'home' | 'portfolio' | 'metodologia') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'auto' }); 
  };

  const isDark = theme === 'dark';

  return (
    <div className={`relative min-h-screen ${isDark ? 'text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <CustomCursor />
      
      <AnimatePresence>
        {loading && <SplashScreen />}
      </AnimatePresence>

      <LightweightBackground />

      <Navbar 
        scrolled={scrolled} 
        theme={theme} 
        toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} 
        activeView={currentView}
        onShowHome={() => navigateTo('home')}
        onShowPortfolio={() => navigateTo('portfolio')}
        onOpenChat={() => setIsChatOpen(true)}
      />
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero theme={theme} onShowMetodologia={() => navigateTo('metodologia')} />
              <About theme={theme} />
              <Services theme={theme} onPackageClick={(pkg) => { setChatInitialPackage(pkg); setIsChatOpen(true); }} />
              <Testimonials theme={theme} />
              <FAQ theme={theme} />
              <ContactForm theme={theme} />
            </motion.div>
          )}

          {currentView === 'portfolio' && (
            <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PortfolioPage theme={theme} />
              <ContactForm theme={theme} />
            </motion.div>
          )}

          {currentView === 'metodologia' && (
            <motion.div key="metodologia" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Metodologia theme={theme} onBack={() => navigateTo('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer 
        theme={theme} 
        onShowHome={() => navigateTo('home')} 
        onShowPortfolio={() => navigateTo('portfolio')} 
        onOpenChat={() => setIsChatOpen(true)}
      />
      
      <Chatbot 
        isOpen={isChatOpen} 
        setIsOpen={setIsChatOpen} 
        initialPackage={chatInitialPackage} 
        setInitialPackage={setChatInitialPackage} 
      />
      <CookieBanner theme={theme} />
    </div>
  );
};

export default App;
