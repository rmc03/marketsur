import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, Tag, Truck, Gift } from 'lucide-react';

const SLIDES = [
  {
    icon: Zap,
    title: '¡Ofertas Relámpago!',
    desc: 'Productos con precios especiales por tiempo limitado',
    bg: 'from-[#1877F2] to-[#0e58c8]',
    accent: 'bg-yellow-400/20',
  },
  {
    icon: Truck,
    title: 'Entrega Rápida',
    desc: 'Coordina tu envío por WhatsApp al instante',
    bg: 'from-[#0e58c8] to-[#6D28D9]',
    accent: 'bg-white/10',
  },
  {
    icon: Tag,
    title: 'Los mejores precios',
    desc: 'Encuentra lo que buscas al mejor precio de Cienfuegos',
    bg: 'from-[#6D28D9] to-[#1877F2]',
    accent: 'bg-pink-400/20',
  },
  {
    icon: Gift,
    title: 'Regalos especiales',
    desc: 'Ideas de regalo para cada ocasión, a un toque de distancia',
    bg: 'from-[#047857] to-[#1877F2]',
    accent: 'bg-emerald-400/20',
  },
];

export function PromoBanner() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const goTo = (idx) => setCurrent((idx + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(current + 1), 4000);
    return () => clearInterval(timerRef.current);
  }, [current]);

  const slide = SLIDES[current];
  const Icon = slide.icon;

  return (
    <div className="relative mx-4 mb-4 rounded-2xl overflow-hidden select-none">
      {/* Gradient background */}
      <div className={`bg-gradient-to-r ${slide.bg} transition-all duration-700`}>
        {/* Decorative circle */}
        <div className={`absolute -right-8 -top-8 w-36 h-36 rounded-full ${slide.accent} transition-colors duration-700`} />
        <div className={`absolute -right-4 bottom-0 w-20 h-20 rounded-full ${slide.accent} opacity-60`} />

        <div className="relative flex items-center gap-4 px-5 py-5">
          <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white text-[15px] leading-tight">{slide.title}</p>
            <p className="text-white/80 text-xs mt-0.5 leading-snug line-clamp-2">{slide.desc}</p>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'}`}
          />
        ))}
      </div>

      {/* Prev / Next */}
      <button onClick={() => goTo(current - 1)} className="absolute left-1 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/10 hover:bg-black/20 text-white transition">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button onClick={() => goTo(current + 1)} className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/10 hover:bg-black/20 text-white transition">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
