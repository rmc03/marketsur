import { Plus, ShoppingBag } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { RippleButton } from './RippleButton';
import { motion } from 'framer-motion';

export function ProductCard({ producto, onAdd }) {
  const { id, nombre, precio, categoria, imagen_url, disponible, destacado } = producto;
  
  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disponible) onAdd(producto);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Link 
        to={`/producto/${id}`}
        className="group bg-white dark:bg-[#242526] rounded-2xl border border-slate-100 dark:border-[#3E4042] shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-[#1877F2]/8 hover:-translate-y-0.5 hover:border-[#1877F2]/30 active:scale-[0.98] h-full"
      >
        {/* ── Image area ── */}
        <div className="relative aspect-square w-full bg-slate-50 dark:bg-[#3A3B3C] overflow-hidden">
          <img 
            src={imagen_url || 'https://placehold.co/400x400/e2e8f0/94a3b8?text=Sin+Imagen'} 
            alt={nombre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            loading="lazy"
          />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Agotado overlay */}
        {!disponible && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-white/90 dark:bg-[#242526]/90 text-slate-800 dark:text-[#E4E6EB] px-4 py-1.5 font-bold rounded-full text-sm shadow-sm">
              Agotado
            </span>
          </div>
        )}

        {/* Badges top-left */}
        {destacado && (
          <div className="absolute top-2 left-2 z-10">
            <span className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md shadow-orange-400/30">
              ⭐ Destacado
            </span>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[11px] font-semibold text-[#1877F2] uppercase tracking-wide mb-1">{categoria}</span>
        <h3 className="font-semibold text-slate-800 dark:text-[#E4E6EB] leading-tight mb-3 line-clamp-2 flex-1 text-[14px]">
          {nombre}
        </h3>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="font-extrabold text-xl text-slate-900 dark:text-white leading-none">
              ${precio.toLocaleString('es-AR')}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">CUP</span>
          </div>
          
          {disponible ? (
            <RippleButton
              onClick={handleAdd}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1877F2] text-white hover:bg-[#166FE5] shadow-md shadow-[#1877F2]/30 active:scale-90 transition-transform"
              aria-label="Añadir al carrito"
            >
              <Plus className="w-4 h-4 pointer-events-none" weight="bold" />
            </RippleButton>
          ) : (
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-[#3A3B3C] text-slate-300 dark:text-slate-600 cursor-not-allowed">
              <ShoppingBag className="w-4 h-4" weight="duotone" />
            </div>
          )}
        </div>
      </div>
      </Link>
    </motion.div>
  );
}
