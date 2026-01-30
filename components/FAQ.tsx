
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQProps {
  theme: 'dark' | 'light';
}

const FAQS = [
  { q: "Quanto tempo demora para meu site ficar pronto?", a: "Depende do pacote escolhido. Landing Pages levam de 3 a 7 dias, enquanto sites completos podem levar de 15 a 30 dias úteis." },
  { q: "Vocês fazem a manutenção do site?", a: "Sim! Oferecemos planos de manutenção mensal para garantir que seu site esteja sempre atualizado, seguro e rápido." },
  { q: "O site é meu ou sou dependente da Nexus Dev?", a: "O site é 100% seu. Após o pagamento final, entregamos todos os acessos e arquivos. Não prendemos nossos clientes." },
  { q: "O site vai aparecer no Google?", a: "Sim! Todos os nossos sites são construídos com práticas de SEO On-Page integradas para facilitar a indexação e ranking." },
  { q: "Posso atualizar o conteúdo sozinho?", a: "Sim, especialmente nos pacotes completos e React, entregamos interfaces fáceis para você gerir textos e imagens." }
];

export const FAQ: React.FC<FAQProps> = ({ theme }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isDark = theme === 'dark';

  return (
    <section id="faq" className="py-24 container mx-auto px-6 relative">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="lg:w-1/3 lg:sticky lg:top-32 self-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 text-indigo-500 mb-6">
              <HelpCircle size={32} />
            </div>
            <h2 className={`text-4xl font-black mb-6 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Dúvidas <br /> <span className="gradient-text">Frequentes</span>
            </h2>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
              A Nexus Dev preza pela clareza. Se sua dúvida não estiver aqui, nosso suporte está pronto para te ouvir em tempo real.
            </p>
          </motion.div>
        </div>

        <div className="lg:w-2/3 space-y-4">
          {FAQS.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false, amount: 0.2 }}
              className={`rounded-3xl border transition-all duration-300 ${
                openIndex === idx 
                  ? (isDark ? 'bg-indigo-500/10 border-indigo-500/30 shadow-lg' : 'bg-white border-indigo-200 shadow-md') 
                  : (isDark ? 'bg-slate-900/40 border-white/5 hover:border-white/10' : 'bg-white border-slate-200')
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className={`font-bold transition-colors ${openIndex === idx ? 'text-indigo-500' : (isDark ? 'text-white' : 'text-slate-800')}`}>
                  {item.q}
                </span>
                <div className={`p-1 rounded-lg transition-transform ${openIndex === idx ? 'rotate-180 bg-indigo-500 text-white' : 'text-slate-500'}`}>
                  {openIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`px-6 pb-6 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
