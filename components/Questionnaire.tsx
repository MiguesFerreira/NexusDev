import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';

interface QuestionnaireProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: (data: any) => void;
    theme: 'light' | 'dark';
}

const QUESTIONS = [
    {
        id: 1,
        question: 'Você já possui um site?',
        options: ['Sim, quero melhorar', 'Não, quero um do zero', 'Tenho um, mas está desativado'],
    },
    {
        id: 2,
        question: 'Qual o objetivo principal do seu novo site?',
        options: ['Vendas Diretas', 'Autoridade e Credibilidade', 'Portfólio de Projetos', 'Institucional / Informativo', 'Outros'],
    },
    {
        id: 3,
        question: 'Você já tem uma identidade visual (logo, cores)?',
        options: ['Sim, completa', 'Apenas a logo', 'Não, preciso criar tudo do zero'],
    },
    {
        id: 4,
        question: 'Qual o seu prazo para o lançamento?',
        options: ['O mais rápido possível', '15 a 30 dias', 'Mais de 30 dias', 'Estou apenas pesquisando'],
    },
    {
        id: 5,
        question: 'Qual a maior dor que você sente hoje no seu negócio digital?',
        options: ['Pouca visibilidade', 'Site atual é lento/antigo', 'Não consigo passar confiança', 'Dificuldade em captar leads', 'Nenhuma das anteriores'],
    },
];

export const Questionnaire: React.FC<QuestionnaireProps> = ({ isOpen, onClose, onComplete, theme }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const isDark = theme === 'dark';

    const handleOptionSelect = (option: string) => {
        const newAnswers = { ...answers, [QUESTIONS[currentStep].id]: option };
        setAnswers(newAnswers);

        if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete(newAnswers);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (!isOpen) return null;

    const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className={`relative w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-slate-900 border border-white/10' : 'bg-white border border-slate-200'}`}
            >
                <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            {currentStep > 0 && (
                                <button
                                    onClick={handleBack}
                                    className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
                                >
                                    <ArrowLeft size={20} />
                                </button>
                            )}
                            <h2 className={`font-black text-xl md:text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Personalize sua Experiência
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="mb-8 relative h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute inset-y-0 left-0 gradient-bg"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2 block">
                                    Pergunta {currentStep + 1} de {QUESTIONS.length}
                                </span>
                                <h3 className={`text-xl md:text-2xl font-bold leading-tight ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                                    {QUESTIONS[currentStep].question}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {QUESTIONS[currentStep].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(option)}
                                        className={`group w-full p-4 md:p-5 rounded-2xl text-left transition-all duration-300 flex items-center justify-between border ${answers[QUESTIONS[currentStep].id] === option
                                            ? 'border-indigo-500 bg-indigo-500/10'
                                            : isDark
                                                ? 'border-white/5 bg-slate-800/50 hover:border-white/20 hover:bg-slate-800'
                                                : 'border-slate-200 bg-slate-50 hover:border-indigo-200 hover:bg-slate-100'
                                            }`}
                                    >
                                        <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                                            {option}
                                        </span>
                                        <div className={`p-1 rounded-full transition-colors ${answers[QUESTIONS[currentStep].id] === option
                                            ? 'bg-indigo-500 text-white'
                                            : isDark ? 'bg-slate-700 text-transparent' : 'bg-slate-200 text-transparent'
                                            }`}>
                                            <CheckCircle2 size={18} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className={`p-4 text-center text-[10px] md:text-xs font-medium uppercase tracking-widest ${isDark ? 'bg-slate-950/50 text-slate-500' : 'bg-slate-50 text-slate-400'}`}>
                    Analisando seu perfil para uma solução sob medida
                </div>
            </motion.div>
        </div>
    );
};
