import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Mail, Phone, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';

interface ContactFormProps {
  theme: 'dark' | 'light';
}

export const ContactForm: React.FC<ContactFormProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) return;

    setIsSending(true);

    // Simulação de delay de envio
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSending(false);
    setIsSuccess(true);

    const phoneNumber = '5515996901137';
    const text = `
Olá! Quero entrar em contato.

| Nome: ${name}
| E-mail: ${email}
| Mensagem:
${message}
    `;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      window.open(whatsappURL, '_blank');
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  return (
    <section id="contato" className={`py-24 relative overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className={`absolute inset-0 opacity-20 ${isDark ? 'bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-900/50 via-transparent to-transparent' : 'bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-200/50 via-transparent to-transparent'}`} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className={`glass border p-8 md:p-12 rounded-[3rem] ${isDark ? 'border-white/10' : 'bg-white border-slate-200 shadow-2xl shadow-indigo-500/5'}`}
        >
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className={`text-4xl font-black mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Vamos <span className="gradient-text">Conversar?</span>
              </h2>
              <p className={`mb-12 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Preencha o formulário e nossa equipe entrará em contato em menos de 24 horas.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: "E-mail", val: "nexusdev.contato@gmail.com" },
                  { icon: Phone, label: "WhatsApp", val: "(15) 99690-1137" },
                  { icon: MapPin, label: "Localização", val: "Brasil / Remoto" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{item.label}</p>
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-2/3">
              <form className="grid sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Seu Nome</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: João Silva"
                    className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all ${isDark ? 'bg-white/5 border-white/10 focus:border-indigo-500 text-white' : 'bg-white border-slate-200 focus:border-indigo-400 text-slate-900'}`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">E-mail Profissional</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@suaempresa.com"
                    className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all ${isDark ? 'bg-white/5 border-white/10 focus:border-indigo-500 text-white' : 'bg-white border-slate-200 focus:border-indigo-400 text-slate-900'}`}
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Mensagem</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Como podemos ajudar no seu projeto?"
                    className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all resize-none ${isDark ? 'bg-white/5 border-white/10 focus:border-indigo-500 text-white' : 'bg-white border-slate-200 focus:border-indigo-400 text-slate-900'}`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer group mb-6">
                    <div className="relative">
                      <input
                        type="checkbox"
                        required
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${acceptedTerms
                        ? 'bg-indigo-500 border-indigo-500'
                        : (isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white')
                        }`}>
                        <ShieldCheck size={14} className={`text-white transition-opacity ${acceptedTerms ? 'opacity-100' : 'opacity-0'}`} />
                      </div>
                    </div>
                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Eu aceito os <a href="/privacidade.html" target="_blank" className="text-indigo-500 hover:underline font-bold">Termos e Política de Privacidade</a>
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSending || isSuccess || !acceptedTerms}
                    className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${isSuccess
                      ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                      : 'gradient-bg text-white shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-1'
                      }`}
                  >
                    <AnimatePresence mode="wait">
                      {isSending ? (
                        <motion.div
                          key="sending"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <Loader2 size={18} className="animate-spin" />
                          Enviando...
                        </motion.div>
                      ) : isSuccess ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 size={18} />
                          Enviado com Sucesso!
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          Enviar Mensagem <Send size={18} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};