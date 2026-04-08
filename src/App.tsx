/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle2, Clock, Ban, ShieldCheck, Zap, Music, FileText } from 'lucide-react';

export default function App() {
  const [timeLeft, setTimeLeft] = useState(865); // 14:25 in seconds

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 10;

    const loadScript = () => {
      if (document.querySelector('script[src*="hotmart-checkout-elements.js"]')) {
        initHotmart();
        return;
      }
      const script = document.createElement('script');
      script.src = "https://checkout.hotmart.com/lib/hotmart-checkout-elements.js";
      script.async = true;
      script.onload = initHotmart;
      script.onerror = () => console.error('Failed to load Hotmart script');
      document.body.appendChild(script);
    };

    const initHotmart = () => {
      // @ts-ignore
      if (window.checkoutElements) {
        try {
          // @ts-ignore
          window.checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
        } catch (e) {
          console.error('Hotmart init error:', e);
        }
      } else if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(initHotmart, 1000);
      }
    };

    loadScript();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500/30">
      {/* Top Warning Bar */}
      <div className="bg-red-600 text-white text-center py-2 px-4 text-xs md:text-sm font-bold uppercase tracking-wider sticky top-0 z-50 flex items-center justify-center gap-2">
        <AlertCircle size={16} />
        ¡ESPERE! NO CIERRE ESTA PÁGINA. SU PEDIDO PODRÍA PERDERSE.
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <p className="text-orange-500 font-bold uppercase tracking-[0.2em] text-sm">
            Oportunidad de Última Hora
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter">
            ENTIENDO... TAL VEZ SOLO QUIERAS <span className="text-orange-500">LO ESENCIAL</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Si los bonos y materiales extras no son lo que buscas ahora, tengo una propuesta irresistible para que no te quedes fuera.
          </p>
        </motion.div>

        {/* Pricing Section */}
        <div className="mt-16 text-center space-y-8">
          <div className="space-y-2">
            <p className="text-zinc-500 line-through text-2xl">$ 14.90</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-5xl md:text-8xl font-black text-white">$</span>
              <span className="text-6xl md:text-9xl font-black text-orange-500 leading-none">9.90</span>
            </div>
            <p className="text-orange-500 font-bold tracking-widest animate-pulse uppercase">¡OFERTA ÚNICA Y EXCLUSIVA!</p>
          </div>

          {/* Hotmart Widget Container */}
          <div className="mt-8 min-h-[200px] flex justify-center">
            <div id="hotmart-sales-funnel" className="w-full max-w-lg"></div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <span>Últimos cupos disponibles</span>
              <span className="text-orange-500">83% Completado</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '83%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
              />
            </div>
          </div>

          {/* Countdown & Stats */}
          <div className="flex justify-center gap-8 md:gap-16 py-6 border-y border-zinc-800/50">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-orange-500 mb-1">
                <Clock size={18} />
                <span className="text-xl font-mono font-bold">{formatTime(timeLeft)}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Tiempo Restante</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-orange-500 mb-1">
                <Zap size={18} />
                <span className="text-xl font-bold">02</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Cupos Libres</p>
            </div>
          </div>
        </div>

        {/* Comparison Section (What you get vs what you don't) */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          {/* What's Included */}
          <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="text-green-500" />
              LO QUE RECIBES:
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-300">
                <Zap size={18} className="text-orange-500 shrink-0 mt-1" />
                <span>Acceso vitalicio al entrenamiento en video completo</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-300">
                <Zap size={18} className="text-orange-500 shrink-0 mt-1" />
                <span>Metodología passo a passo para dominar el teclado</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-300">
                <Zap size={18} className="text-orange-500 shrink-0 mt-1" />
                <span>Soporte técnico para acceso a la plataforma</span>
              </li>
            </ul>
          </div>

          {/* What's NOT Included */}
          <div className="bg-red-500/5 p-8 rounded-3xl border border-red-500/20">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-red-500">
              <Ban />
              LO QUE <span className="underline">NO</span> RECIBES:
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-500 line-through">
                <FileText size={18} className="shrink-0 mt-1" />
                <span>PDF con patrones de arpegios listos</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-500 line-through">
                <Music size={18} className="shrink-0 mt-1" />
                <span>Guía rápida por tonalidad</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-500 line-through">
                <Lock size={18} className="shrink-0 mt-1" />
                <span>Acesso a materiales de apoyo exclusivos</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="mt-24 p-8 md:p-12 bg-zinc-900/30 rounded-[40px] border border-zinc-800 flex flex-col md:flex-row items-center gap-12">
          <div className="relative shrink-0">
            <div className="w-48 h-48 rounded-full border-4 border-orange-500/20 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border-4 border-orange-500 flex flex-col items-center justify-center text-center p-4">
                <span className="text-4xl font-black leading-none">30</span>
                <span className="text-xs font-bold uppercase tracking-widest">Días</span>
                <div className="w-full h-px bg-orange-500/30 my-2" />
                <span className="text-[8px] font-bold uppercase tracking-tighter">Garantía Total</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-orange-500 p-3 rounded-2xl shadow-lg">
              <ShieldCheck size={24} />
            </div>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black italic tracking-tight">
              Garantía 100% <br />
              <span className="text-orange-500">Libre de Riesgo</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Prueba el entrenamiento completo por 30 días. Si por alguna razón sientes que no es para ti, te devolveremos el 100% de tu inversión. Sin preguntas, sin letras pequeñas.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-[10px] uppercase tracking-widest">
          © 2026 Eliah Campos Teclas. Todos los derechos reservados.
        </footer>
      </main>
    </div>
  );
}
