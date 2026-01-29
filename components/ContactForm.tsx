
import React from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone } from 'lucide-react';

interface ContactFormProps {
  theme: 'dark' | 'light';
}

export const ContactForm: React.FC<ContactFormProps> = ({ theme }) => {
  const isDark = theme === 'dark';

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
              <h2 className={`text-4xl font-black mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>Vamos <span className="gradient-text">Conversar?</span></h2>
              <p className={`mb-12 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Preencha o formulário e nossa equipe entrará em contato em menos de 24 horas.</p>
              
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
              <form className="grid sm:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Seu Nome</label>
                  <input 
                    type="text" 
                    placeholder="Ex: João Silva" 
                    className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all ${isDark ? 'bg-white/5 border-white/10 focus:border-indigo-500 text-white' : 'bg-white border-slate-200 focus:border-indigo-400 text-slate-900'}`} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">E-mail Profissional</label>
                  <input 
                    type="email" 
                    placeholder="email@suaempresa.com" 
                    className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all ${isDark ? 'bg-white/5 border-white/10 focus:border-indigo-500 text-white' : 'bg-white border-slate-200 focus:border-indigo-400 text-slate-900'}`} 
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Mensagem</label>
                  <textarea 
                    rows={4}
                    placeholder="Como podemos ajudar no seu projeto?" 
                    className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all resize-none ${isDark ? 'bg-white/5 border-white/10 focus:border-indigo-500 text-white' : 'bg-white border-slate-200 focus:border-indigo-400 text-slate-900'}`} 
                  />
                </div>
                <div className="sm:col-span-2">
                  <button className="w-full py-4 gradient-bg text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all hover:-translate-y-1 active:scale-95">
                    Enviar Mensagem <Send size={18} />
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
