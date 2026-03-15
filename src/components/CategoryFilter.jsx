import { useRef } from 'react';
import {
  SquaresFour,
  TShirt,
  HamburgerIcon,
  DeviceMobile,
  Armchair,
  Sparkle,
  Wrench,
  GameController,
  Package
} from '@phosphor-icons/react';

// Phosphor doesn't have "Pizza" — using HamburgerIcon alias
// We'll map carefully:
const CATEGORIES = [
  { id: 'Todos',                     label: 'Todos',        Icon: SquaresFour },
  { id: 'Ropa y calzado',            label: 'Ropa',          Icon: TShirt },
  { id: 'Comida y bebida',           label: 'Comida',        Icon: HamburgerIcon },
  { id: 'Electrónica',               label: 'Electrónica',   Icon: DeviceMobile },
  { id: 'Hogar y muebles',           label: 'Hogar',         Icon: Armchair },
  { id: 'Belleza y cuidado personal',label: 'Belleza',       Icon: Sparkle },
  { id: 'Servicios',                 label: 'Servicios',     Icon: Wrench },
  { id: 'Juguetes',                  label: 'Juguetes',      Icon: GameController },
  { id: 'Otros / variado',           label: 'Otros',         Icon: Package },
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
                  ? 'bg-[#1877F2] text-white shadow-md shadow-[#1877F2]/20'
                  : 'bg-white dark:bg-[#3A3B3C] border border-slate-200 dark:border-[#4E4F50] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#4E4F50] hover:border-slate-300 dark:hover:border-[#606770]'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}
                weight={isActive ? 'fill' : 'duotone'}
              />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
