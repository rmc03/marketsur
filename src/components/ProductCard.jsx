/* eslint-disable no-unused-vars */
import { Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RippleButton } from './RippleButton';
import { motion } from 'framer-motion';
import { getProductMainImage } from '../lib/images';

export function ProductCard({ producto, onAdd }) {
  const { id, nombre, precio, categoria, disponible, destacado } = producto;
  
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
        className="group glass-card rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1 active:scale-[0.98] h-full"
      >
        {/* ── Image area ── */}
        <div className="relative aspect-square w-full bg-slate-100/50 dark:bg-white/[0.03] overflow-hidden">
          <img 
            src={getProductMainImage(producto)} 
            alt={nombre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            loading="lazy"
          />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100" />

        {/* Agotado overlay */}
        {!disponible && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[3px] flex items-center justify-center z-10">
            <span className="bg-white/90 dark:bg-white/10 backdrop-blur-md text-slate-800 dark:text-white px-4 py-1.5 font-bold rounded-full text-sm shadow-sm ring-1 ring-white/30">
              Agotado
            </span>
          </div>
        )}

        {/* Badges top-left */}
        {destacado && (
          <div className="absolute top-2 left-2 z-10">
            <span className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md shadow-orange-400/30 ring-1 ring-white/20">
              ⭐ Destacado
            </span>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[11px] font-semibold gradient-text uppercase tracking-wider mb-1">{categoria}</span>
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 leading-tight mb-3 line-clamp-2 flex-1 text-[14px]">
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
              className="flex items-center justify-center w-9 h-9 rounded-full gradient-primary text-white shadow-md shadow-indigo-500/25 active:scale-90 transition-transform ring-1 ring-white/20"
              aria-label="Añadir al carrito"
            >
              <Plus className="w-4 h-4 pointer-events-none" />
            </RippleButton>
          ) : (
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100/80 dark:bg-white/[0.06] text-slate-300 dark:text-slate-600 cursor-not-allowed">
              <ShoppingBag className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
      </Link>
    </motion.div>
  );
}
