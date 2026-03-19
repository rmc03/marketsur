import { useState } from 'react';

const SLIDES = [
  {
    emoji: '🛒',
    title: '¡Bienvenido a Market Sur!',
    desc: 'El mercadillo digital de Cienfuegos. Encuentra productos locales a precios increíbles.',
    bg: 'from-indigo-600 via-blue-600 to-cyan-500',
  },
  {
    emoji: '🔍',
    title: 'Explora y descubre',
    desc: 'Navega por categorías, busca lo que necesitas y filtra por tipo de producto.',
    bg: 'from-violet-600 via-purple-600 to-indigo-500',
  },
  {
    emoji: '💬',
    title: 'Pide por WhatsApp',
    desc: 'Añade productos al carrito y envía tu pedido directamente al vendedor por WhatsApp.',
    bg: 'from-emerald-600 via-teal-600 to-cyan-500',
  },
];

export function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const next = () => {
    if (step < SLIDES.length - 1) {
      setStep(s => s + 1);
    } else {
      finish();
    }
  };

  const finish = () => {
    setLeaving(true);
    localStorage.setItem('marketsur-onboarding-done', '1');
    setTimeout(onDone, 350);
  };

  const slide = SLIDES[step];

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-300 bg-gradient-to-br ${slide.bg} ${leaving ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Static decorative orbs - no animation for performance */}
      <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute top-1/3 right-10 w-32 h-32 rounded-full bg-white/[0.08] blur-2xl" />

      {/* Skip */}
      <button
        onClick={finish}
        className="absolute top-6 right-6 text-white/70 hover:text-white text-sm font-semibold transition-colors"
      >
        Omitir
      </button>

      {/* Glass card content */}
      <div className="relative z-10 flex flex-col items-center text-center px-10 animate-fade-in" key={step}>
        <div className="glass-card p-6 rounded-3xl mb-8 shadow-2xl shadow-black/10">
          <div className="text-7xl drop-shadow-lg">{slide.emoji}</div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight drop-shadow-sm">{slide.title}</h2>
        <p className="text-white/80 text-base leading-relaxed max-w-xs backdrop-blur-sm bg-white/5 rounded-2xl p-4">{slide.desc}</p>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-12 mb-8">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${i === step ? 'w-8 h-2 bg-white shadow-lg shadow-white/30' : 'w-2 h-2 bg-white/40'}`}
          />
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={next}
        className="px-10 py-3.5 glass-card text-indigo-600 dark:text-indigo-400 font-extrabold text-base rounded-full shadow-2xl hover:shadow-white/20 hover:bg-white/90 active:scale-95 transition-all"
      >
        {step < SLIDES.length - 1 ? 'Siguiente →' : '¡Empezar a comprar!'}
      </button>
    </div>
  );
}
