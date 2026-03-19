/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { CategoryFilter } from '../components/CategoryFilter';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { Storefront, SortAscending, MagnifyingGlass, Ghost } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const SORT_OPTIONS = [
  { value: 'default',    label: 'Por defecto' },
  { value: 'precio_asc', label: 'Precio: menor a mayor' },
  { value: 'precio_desc',label: 'Precio: mayor a menor' },
  { value: 'destacado',  label: 'Destacados primero' },
];

function applySort(productos, sort) {
  const arr = [...productos];
  switch (sort) {
    case 'precio_asc':  return arr.sort((a, b) => a.precio - b.precio);
    case 'precio_desc': return arr.sort((a, b) => b.precio - a.precio);
    case 'destacado':   return arr.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
    default:            return arr;
  }
}

function SkeletonCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl overflow-hidden glass-card"
    >
      <div className="aspect-square w-full skeleton-shimmer" />
      <div className="p-4 space-y-2">
        <div className="h-2.5 w-16 rounded-full skeleton-shimmer" />
        <div className="h-3.5 w-full rounded-full skeleton-shimmer" />
        <div className="h-3.5 w-3/4 rounded-full skeleton-shimmer" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-5 w-16 rounded-full skeleton-shimmer" />
          <div className="w-9 h-9 rounded-full skeleton-shimmer" />
        </div>
      </div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function Home({ onAddToCart }) {
  const [categoria, setCategoria] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [sort, setSort] = useState('default');
  const [showSort, setShowSort] = useState(false);

  const { productos: rawProductos, cargando, error } = useProducts(categoria, busqueda);
  const productos = applySort(rawProductos, sort);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    if (!showSort) return;
    const handleClick = () => setShowSort(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showSort]);

  const hasFilters = busqueda || categoria;
  const destacados = !hasFilters ? productos.filter(p => p.destacado) : [];
  const resto      = !hasFilters ? productos.filter(p => !p.destacado) : productos;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero — Glassmorphism + Gradient */}
      <section className="hero-gradient text-white pt-10 pb-16 px-6 rounded-b-[48px] mb-6 w-full max-w-lg mx-auto overflow-hidden relative shadow-xl shadow-indigo-500/20">
        {/* Decorative glass orbs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-xl animate-orb-float" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 blur-xl animate-orb-float-2" />
        <div className="absolute top-6 right-10 w-20 h-20 rounded-full bg-white/[0.15] backdrop-blur-sm animate-orb-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-10 right-1/4 w-14 h-14 rounded-full bg-white/[0.08] backdrop-blur-sm animate-orb-float-2" style={{ animationDelay: '3s' }} />
        
        <div className="relative z-10 flex flex-col items-center text-center mt-2">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-white/10 ring-1 ring-white/30">
            <Storefront className="w-7 h-7 text-white" weight="duotone" />
          </div>
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight drop-shadow-sm">Market Sur</h1>
          <p className="text-white/80 text-sm max-w-[260px] text-balance leading-relaxed">
            El mercadillo digital de Cienfuegos.<br />Lo que buscas, a un toque de distancia.
          </p>
        </div>
      </section>

      {/* Sticky: Search + Filter + Sort — Glass */}
      <div className="sticky top-[52px] z-50 transform-gpu bg-white/60 dark:bg-[#0F0F1A]/60 backdrop-blur-2xl saturate-150 pb-3 shadow-sm shadow-indigo-500/[0.03] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)] rounded-b-3xl transition-colors duration-400 border-b border-white/20 dark:border-white/[0.05]">
        <SearchBar onSearch={setBusqueda} />
        <div className="flex items-center gap-2 px-4 pb-1">
          <div className="flex-1 overflow-x-auto">
            <CategoryFilter currentCategory={categoria} onSelectCategory={setCategoria} />
          </div>
          {/* Sort button */}
          <div className="relative flex-shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); setShowSort(s => !s); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm font-semibold transition-all ${
                sort !== 'default'
                  ? 'gradient-primary text-white border-transparent shadow-md shadow-indigo-500/20'
                  : 'bg-white/50 dark:bg-white/[0.06] backdrop-blur-xl border-white/40 dark:border-white/[0.1] text-slate-600 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-white/[0.1]'
              }`}
              aria-label="Ordenar"
            >
              <SortAscending className="w-4 h-4" weight="bold" />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-2 w-52 glass-panel rounded-2xl z-50 overflow-hidden animate-pop-in">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setShowSort(false); }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                      sort === opt.value
                        ? 'bg-indigo-50/80 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/[0.05] font-medium'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 mb-28">
        {error && (
          <div className="mb-5 p-3 glass-card rounded-xl flex items-center gap-2 border-amber-200/50 dark:border-amber-500/20">
            <span className="w-2 h-2 flex-shrink-0 rounded-full bg-amber-500 animate-pulse" />
            <p className="text-xs text-amber-800 dark:text-amber-300 font-medium leading-snug">{error}</p>
          </div>
        )}

        {cargando ? (
          <div className="grid grid-cols-2 gap-4">
            {[1,2,3,4].map(n => <SkeletonCard key={n} />)}
          </div>
        ) : productos.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500"
          >
            <div className="relative w-24 h-24 mb-6">
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-full h-full rounded-full glass-card flex items-center justify-center"
              >
                {busqueda ? <MagnifyingGlass className="w-10 h-10 text-slate-300 dark:text-slate-600" weight="duotone" /> : <Ghost className="w-10 h-10 text-slate-300 dark:text-slate-600" weight="duotone" />}
              </motion.div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-indigo-200/30 dark:bg-indigo-500/10 rounded-full blur-sm" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">¡Ups! Nada por aquí</h3>
            <p className="text-center font-medium max-w-[250px] text-balance">
              No encontramos productos que coincidan con tu búsqueda.
            </p>
            <button onClick={() => { setCategoria(null); setBusqueda(''); setSort('default'); }}
              className="mt-6 px-8 py-3 gradient-primary text-white rounded-xl font-bold text-[15px] hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
              Ver todo el catálogo
            </button>
          </motion.div>
        ) : (
          <>
            {destacados.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <span className="text-base font-extrabold text-slate-800 dark:text-slate-100">⭐ Destacados</span>
                  <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-500/10 px-2 py-0.5 rounded-full">{destacados.length}</span>
                </div>
                <motion.div 
                  variants={containerVariants} initial="hidden" animate="show"
                  className="grid grid-cols-2 gap-x-4 gap-y-5"
                >
                  {destacados.map(p => <ProductCard key={p.id} producto={p} onAdd={onAddToCart} />)}
                </motion.div>
              </div>
            )}
            {resto.length > 0 && (
              <div>
                {(destacados.length > 0 || hasFilters) && (
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <span className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                      {hasFilters ? (busqueda ? 'Resultados' : categoria) : 'Todos los productos'}
                    </span>
                    <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-500/10 px-2 py-0.5 rounded-full">{resto.length}</span>
                  </div>
                )}
                <motion.div 
                  variants={containerVariants} initial="hidden" animate="show"
                  className="grid grid-cols-2 gap-x-4 gap-y-5"
                >
                  {resto.map(p => <ProductCard key={p.id} producto={p} onAdd={onAddToCart} />)}
                </motion.div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
