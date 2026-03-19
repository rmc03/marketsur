/* eslint-disable no-unused-vars */
import { useRef } from 'react';
import {
  LayoutGrid,
  Shirt,
  Utensils,
  Smartphone,
  Armchair,
  Sparkles,
  Wrench,
  Gamepad2,
  Package
} from 'lucide-react';

const CATEGORIES = [
  { id: 'Todos',                     label: 'Todos',        Icon: LayoutGrid },
  { id: 'Ropa y calzado',            label: 'Ropa',          Icon: Shirt },
  { id: 'Comida y bebida',           label: 'Comida',        Icon: Utensils },
  { id: 'Electrónica',               label: 'Electrónica',   Icon: Smartphone },
  { id: 'Hogar y muebles',           label: 'Hogar',         Icon: Armchair },
  { id: 'Belleza y cuidado personal',label: 'Belleza',       Icon: Sparkles },
  { id: 'Servicios',                 label: 'Servicios',     Icon: Wrench },
  { id: 'Juguetes',                  label: 'Juguetes',      Icon: Gamepad2 },
  { id: 'Otros / variados',           label: 'Otros',         Icon: Package },
];

export function CategoryFilter({ currentCategory, onSelectCategory }) {
  const scrollRef = useRef(null);

  return (
    <div className="w-full relative py-2">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-2 px-4 no-scrollbar items-center pb-2 snap-x"
      >
        {CATEGORIES.map(({ id, label, Icon }) => {
          const isActive = (currentCategory || 'Todos') === id;
          return (
            <button
              key={id}
              onClick={() => onSelectCategory(id === 'Todos' ? null : id)}
              className={`flex-none snap-start flex items-center gap-2 px-4 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-200 ${
                isActive
                  ? 'gradient-primary text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/20'
                  : 'bg-white/50 dark:bg-white/[0.06] backdrop-blur-xl border border-white/40 dark:border-white/[0.1] text-slate-600 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-white/[0.1] hover:border-white/60 dark:hover:border-white/[0.15]'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}
              />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
