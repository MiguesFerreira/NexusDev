
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, ChevronRight, ArrowLeft, CheckCircle2, Plus, Check } from 'lucide-react';
import { ChatStep } from '../types';

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

const PACKAGE_INFO: Record<string, any> = {
  'Pacote Básico': {
    title: '🔹 Pacote Básico',
    description: 'Ideal para quem precisa marcar presença online de forma simples e profissional.',
    bullets: ['Site de 1 página', 'Layout moderno', 'Mobile & Desktop Friendly', 'Carregamento rápido', 'Visual profissional'],
    tech: 'HTML e CSS',
    price: 500,
    maint: 100,
    note: 'Ideal para negócios locais, autônomos e quem está começando.'
  },
  'Pacote Profissional': {
    title: '🔹 Pacote Profissional',
    description: 'Perfeito para quem quer um site que realmente gere resultados.',
    bullets: ['Design estratégico focado em conversão', 'Totalmente responsivo', 'Funcionalidades em JavaScript', 'Experiência moderna'],
    tech: 'HTML, CSS e JavaScript',
    price: 900,
    maint: 200,
    note: 'Ideal para quem quer captar clientes e passar mais autoridade.'
  },
  'Pacote Completo': {
    title: '🔹 Pacote Completo',
    description: 'Para negócios que querem um site profissional e escalável.',
    bullets: ['Até 5 páginas', 'Animações avançadas JS', 'Estrutura organizada', 'Design elaborado', 'Experiência rica'],
    tech: 'HTML, CSS e JavaScript',
    price: 1500,
    maint: 300,
    note: 'Ideal para empresas que querem crescer no digital.'
  },
  'Pacote React': {
    title: '🔹 Pacote Avançado – React',
    description: 'Solução premium para negócios que querem escalar e automatizar.',
    bullets: ['Site desenvolvido em React', 'Estrutura escalável', 'Layout de alto nível', 'Alta performance', 'Chat de agendamento incluso'],
    tech: 'React Engine',
    price: 3500,
    maint: 500,
    note: 'Ideal para empresas que pensam grande e querem tecnologia de ponta.'
  }
};

const EXTRA_INFO = {
  title: '➕ Extra – Sistema de Agendamento',
  price: 500,
  maint: 200,
  description: 'Chat inteligente com coleta de dados e agendamento automático via WhatsApp.'
};

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialPackage: string | null;
  setInitialPackage: (pkg: string | null) => void;
  questionnaireData?: any;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  isOpen,
  setIsOpen,
  initialPackage,
  setInitialPackage,
  questionnaireData
}) => {
  const [step, setStep] = useState<ChatStep>(ChatStep.WELCOME);
  const [messages, setMessages] = useState<Message[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [addExtra, setAddExtra] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef(null);

  const WHATSAPP_NUMBER = '5515996901137';

  const suggestPackage = (data: any) => {
    if (!data) return null;
    const objective = data[2]; // Objetivo
    const pain = data[5];      // Maior dor

    if (pain === 'Site atual é lento/antigo' || objective === 'Vendas Diretas') {
      return 'Pacote React';
    }
    if (objective === 'Portfólio de Projetos' || objective === 'Institucional / Informativo') {
      return 'Pacote Completo';
    }
    if (objective === 'Autoridade e Credibilidade') {
      return 'Pacote Profissional';
    }
    return 'Pacote Básico';
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, step]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage('bot', 'Olá! Sou o assistente de negócios da Nexus Dev. 🚀');

      if (questionnaireData) {
        // Summarize questionnaire data
        const summary = Object.entries(questionnaireData).map(([id, answer]) => {
          const q = [
            'Possui site',
            'Objetivo',
            'Identidade',
            'Prazo',
            'Maior dor'
          ][parseInt(id) - 1];
          return `• ${q}: ${answer}`;
        }).join('\n');

        const suggestion = suggestPackage(questionnaireData);

        setTimeout(() => {
          addMessage('bot', 'Recebi suas respostas do formulário! Elas nos ajudam muito a entender seu projeto:');
          addMessage('bot', summary);

          if (suggestion) {
            setTimeout(() => {
              addMessage('bot', `💡 Com base no seu perfil, acreditamos que o **${suggestion}** seja a melhor escolha para o seu momento atual!`);
              addMessage('bot', 'Para continuarmos com sua proposta personalizada, qual o nome da sua empresa?');
              setStep(ChatStep.ENTERING_NAME);
            }, 1000);
          } else {
            addMessage('bot', 'Para continuarmos com sua proposta personalizada, qual o nome da sua empresa?');
            setStep(ChatStep.ENTERING_NAME);
          }
        }, 800);
      } else if (initialPackage) {
        if (initialPackage === 'Extra') {
          addMessage('bot', 'Vi que sua empresa se interessou pelo Módulo de Agendamento Automático!');
          setAddExtra(true);
        } else {
          addMessage('bot', `Vi que sua empresa se interessou pelo ${initialPackage}!`);
          setSelectedService(initialPackage);
        }

        setTimeout(() => {
          addMessage('bot', 'Antes de vermos os detalhes e valores, qual o nome da sua empresa?');
          setStep(ChatStep.ENTERING_NAME);
        }, 800);
      } else {
        setTimeout(() => {
          addMessage('bot', 'Qual o nome da sua empresa para começarmos o atendimento corporativo?');
          setStep(ChatStep.ENTERING_NAME);
        }, 800);
      }
    }
  }, [isOpen, initialPackage, questionnaireData]);

  const addMessage = (sender: 'bot' | 'user', text: string) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    addMessage('user', companyName);

    setTimeout(() => {
      if (selectedService || addExtra) {
        addMessage('bot', `Excelente escolha, ${companyName}! Nossos especialistas analisaram seu perfil e temos a solução ideal.`);
        addMessage('bot', 'Aqui estão os detalhes técnicos e o investimento necessário para transformarmos sua presença digital:');
        if (addExtra && !selectedService) {
          setStep(ChatStep.CHOOSING_SERVICE);
          addMessage('bot', 'A qual desses pacotes base você gostaria de integrar o agendamento?');
        } else {
          setStep(ChatStep.PACKAGE_DETAILS);
        }
      } else {
        addMessage('bot', `Prazer em conhecer a ${companyName}! Com base no que você busca, qual dessas soluções digitais parece mais interessante para vocês hoje?`);
        setStep(ChatStep.CHOOSING_SERVICE);
      }
    }, 600);
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    addMessage('user', `Me interessei pelo ${service}`);

    setTimeout(() => {
      addMessage('bot', `Ótima escolha! O ${service} é um dos nossos modelos mais solicitados pela sua eficiência.`);
      addMessage('bot', 'Estamos preparando os detalhes exclusivos para você...');
      setTimeout(() => {
        setStep(ChatStep.PACKAGE_DETAILS);
      }, 800);
    }, 500);
  };

  const handleAction = (action: 'buy' | 'back') => {
    if (action === 'back') {
      setStep(ChatStep.CHOOSING_SERVICE);
      setAddExtra(false);
      return;
    }

    const pkg = PACKAGE_INFO[selectedService];
    const totalInvest = addExtra ? pkg.price + EXTRA_INFO.price : pkg.price;

    let questionnaireInfo = '';
    if (questionnaireData) {
      questionnaireInfo = '\n\r*Respostas do Formulário:* \n' + Object.entries(questionnaireData).map(([id, answer]) => {
        const q = [
          'Possui site',
          'Objetivo',
          'Identidade',
          'Prazo',
          'Maior dor'
        ][parseInt(id as string) - 1];
        return `• ${q}: ${answer}`;
      }).join('\n');
    }

    const text = `Olá Nexus Dev! Represento a empresa *${companyName}*.\n${questionnaireInfo}\n\n*Pacote Escolhido:* ${selectedService}${addExtra ? ' + Sistema de Agendamento' : ''}\n*Investimento:* R$ ${totalInvest.toLocaleString('pt-BR')}.`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const resetChat = () => {
    setMessages([]);
    setStep(ChatStep.WELCOME);
    setCompanyName('');
    setSelectedService('');
    setAddExtra(false);
    setInitialPackage(null);
  };

  const renderDetails = () => {
    const pkg = PACKAGE_INFO[selectedService];
    if (!pkg) return null;

    const totalPrice = addExtra ? pkg.price + EXTRA_INFO.price : pkg.price;
    const totalMaint = addExtra ? pkg.maint + EXTRA_INFO.maint : pkg.maint;

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-4">
        <div className="bg-slate-800 rounded-2xl p-5 border border-white/10 shadow-inner">
          <h4 className="font-bold text-indigo-400 mb-2 flex items-center gap-2">
            <CheckCircle2 size={16} /> {pkg.title}
          </h4>
          <p className="text-xs text-slate-300 mb-4 italic">"{pkg.description}"</p>
          <ul className="space-y-2 mb-4">
            {pkg.bullets.map((b: string, i: number) => (
              <li key={i} className="flex items-center gap-2 text-[11px] text-slate-400">
                <Check size={12} className="text-indigo-500 shrink-0" /> {b}
              </li>
            ))}
          </ul>

          {!selectedService.includes('React') && (
            <div className={`mt-4 p-3 rounded-xl border transition-all duration-500 ${addExtra ? 'bg-indigo-500/20 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-slate-950 border-white/5'}`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-grow">
                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Upgrade Recomendado</p>
                  <p className="text-[11px] font-bold text-white">Módulo de Agendamento</p>
                  <p className="text-[9px] text-slate-500">Automatize seus atendimentos por apenas + R$ 500,00</p>
                </div>
                <button
                  onClick={() => setAddExtra(!addExtra)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${addExtra ? 'bg-indigo-500 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                  {addExtra ? <Check size={18} /> : <Plus size={18} />}
                </button>
              </div>
            </div>
          )}

          <div className="border-t border-white/5 pt-3 mt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">Stack: {pkg.tech}{addExtra ? ' + Smart Chat' : ''}</p>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-indigo-500/50" />
              </div>
            </div>
            <p className="text-lg font-black text-white">R$ {totalPrice.toLocaleString('pt-BR')},00</p>
            <p className="text-[10px] text-indigo-500 font-bold">Investimento com manutenção de R$ {totalMaint.toLocaleString('pt-BR')},00 /mês</p>
          </div>
        </div>

        <div className="space-y-3">
          <button onClick={() => handleAction('buy')} className="w-full py-4 gradient-bg rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 active:scale-95 transition-all hover:brightness-110">
            Garantir esse projeto para a {companyName}
          </button>
          <button onClick={() => handleAction('back')} className="w-full py-2 text-slate-500 hover:text-white text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
            <ArrowLeft size={14} /> Voltar aos Planos
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-8 w-14 h-14 gradient-bg rounded-full flex items-center justify-center text-white shadow-2xl z-[40] hover:scale-110 active:scale-90 transition-transform"
      >
        <MessageSquare size={28} />
      </button>

      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[100]" />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-10 right-4 md:bottom-40 md:right-8 z-[100] w-[82vw] md:w-[380px] h-[580px] md:h-[600px] bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden pointer-events-auto touch-none"
          >
            <div className="p-5 md:p-6 gradient-bg flex items-center justify-between text-white cursor-move">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                  <img src="/img/favicon.png" className="w-8 h-8" alt="Ícone" />
                  <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-[#6366f1] rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold flex items-center gap-2 text-sm md:text-base">
                    NexusIA
                  </h3>
                  <span className="text-[10px] text-green-300 font-bold uppercase tracking-widest">Online</span>
                </div>
              </div>

              <button onClick={() => { setIsOpen(false); resetChat(); }} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 md:p-6 space-y-4 scroll-smooth bg-slate-900">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.sender === 'bot' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] p-4 rounded-2xl text-[13px] md:text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'
                    }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {step === ChatStep.CHOOSING_SERVICE && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 gap-2 pt-2">
                  <p className="text-[10px] text-center text-slate-500 uppercase font-bold tracking-widest mb-1">Selecione uma opção</p>
                  {Object.keys(PACKAGE_INFO).map((service) => (
                    <button
                      key={service}
                      onClick={() => handleServiceSelect(service)}
                      className="w-full p-4 rounded-2xl glass border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 text-left text-[13px] font-bold transition-all flex items-center justify-between group"
                    >
                      {service}
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                    </button>
                  ))}
                </motion.div>
              )}

              {step === ChatStep.PACKAGE_DETAILS && renderDetails()}
            </div>

            <div className="p-4 border-t border-white/5 bg-slate-900">
              {step === ChatStep.ENTERING_NAME ? (
                <form onSubmit={handleCompanySubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Nome da sua Empresa..."
                    className="flex-grow bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-indigo-500/50 transition-colors text-white shadow-inner"
                    autoFocus
                  />
                  <button type="submit" className="p-3 gradient-bg rounded-xl text-white shadow-lg active:scale-95 transition-transform">
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-slate-700" />
                  <div className="text-center text-[10px] text-slate-500 uppercase tracking-widest font-black py-2">
                    {companyName ? `Foco em Resultados para ${companyName}` : 'Nexus Dev Solutions'}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-700" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
