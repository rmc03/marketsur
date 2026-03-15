import { useRef } from 'react';
import { LayoutGrid, Shirt, Pizza, Smartphone, Sofa, Sparkles, Wrench, Gamepad2, Package } from 'lucide-react';

const CATEGORIES = [
  { id: 'Todos', name: 'Todos los productos', icon: LayoutGrid },
  { id: 'Ropa y calzado', name: 'Ropa y calzado', icon: Shirt },
  { id: 'Comida y bebida', name: 'Comida y bebida', icon: Pizza },
  { id: 'Electrónica', name: 'Electrónica', icon: Smartphone },
  { id: 'Hogar y muebles', name: 'Hogar y muebles', icon: Sofa },
  { id: 'Belleza y cuidado personal', name: 'Belleza y cuidado personal', icon: Sparkles },
  { id: 'Servicios', name: 'Servicios', icon: Wrench },
  { id: 'Juguetes', name: 'Juguetes', icon: Gamepad2 },
  { id: 'Otros / variado', name: 'Otros / variado', icon: Package }
];

export function CategoryFilter({ currentCategory, onSelectCategory }) {
  const scrollRef = useRef(null);

  return (
    <div className="w-full relative py-2">
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-2 px-4 no-scrollbar items-center pb-2 snap-x"
      >
        {CATEGORIES.map(cat => {
          const isActive = (currentCategory || 'Todos') === cat.id;
          const Icon = cat.icon;
          return (
            <button
               key={cat.id}
              onClick={() => onSelectCategory(cat.id === 'Todos' ? null : cat.id)}
              className={`flex-none snap-start flex items-center gap-2 px-4 py-2.5 rounded-full text-[15px] font-semibold transition-all duration-200 ${
                isActive 
                  ? 'bg-[#1877F2] text-white shadow-md shadow-[#1877F2]/20' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              {cat.id !== 'Todos' ? cat.id : 'Todos'}
            </button>
          );
        })}
      </div>
    </div>
  );
}
