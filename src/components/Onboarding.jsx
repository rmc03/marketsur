import { useState, useEffect } from 'react';

const SEEN_KEY = 'marketsur-onboarding-done';

const SLIDES = [
  {
    emoji: '🛒',
    title: '¡Bienvenido a Market Sur!',
    desc: 'El mercadillo digital de Cienfuegos. Encuentra productos locales a precios increíbles.',
    bg: 'from-[#1877F2] to-[#0e58c8]',
  },
  {
    emoji: '🔍',
    title: 'Explora y descubre',
    desc: 'Navega por categorías, busca lo que necesitas y filtra por tipo de producto.',
    bg: 'from-[#6D28D9] to-[#1877F2]',
  },
  {
    emoji: '💬',
    title: 'Pide por WhatsApp',
    desc: 'Añade productos al carrito y envía tu pedido directamente al vendedor por WhatsApp.',
    bg: 'from-[#047857] to-[#0e58c8]',
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
    localStorage.setItem(SEEN_KEY, '1');
    setTimeout(onDone, 350);
  };

  const slide = SLIDES[step];

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-300 bg-gradient-to-br ${slide.bg} ${leaving ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Skip */}
      <button
        onClick={finish}
        className="absolute top-6 right-6 text-white/70 hover:text-white text-sm font-semibold transition-colors"
      >
        Omitir
      </button>

      {/* Content */}
      <div className="flex flex-col items-center text-center px-10 animate-fade-in" key={step}>
        <div className="text-8xl mb-8 drop-shadow-lg">{slide.emoji}</div>
        <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight">{slide.title}</h2>
        <p className="text-white/80 text-base leading-relaxed max-w-xs">{slide.desc}</p>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-12 mb-8">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${i === step ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40'}`}
          />
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={next}
        className="px-10 py-3.5 bg-white text-[#1877F2] font-extrabold text-base rounded-full shadow-2xl hover:shadow-white/20 active:scale-95 transition-all"
      >
        {step < SLIDES.length - 1 ? 'Siguiente →' : '¡Empezar a comprar!'}
      </button>
    </div>
  );
}

export function useOnboarding() {
  const [show, setShow] = useState(() => !localStorage.getItem(SEEN_KEY));
  return { show, done: () => setShow(false) };
}
