import { useState } from 'react';
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
      className="rounded-2xl overflow-hidden border border-slate-100 dark:border-[#3E4042] bg-white dark:bg-[#242526]"
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

  const hasFilters = busqueda || categoria;
  const destacados = !hasFilters ? productos.filter(p => p.destacado) : [];
  const resto      = !hasFilters ? productos.filter(p => !p.destacado) : productos;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="hero-gradient text-white pt-8 pb-14 px-6 rounded-b-[48px] mb-6 w-full max-w-lg mx-auto overflow-hidden relative shadow-lg shadow-[#1877F2]/20">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-white/10" />
        <div className="relative z-10 flex flex-col items-center text-center mt-2">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 shadow-lg">
            <Storefront className="w-6 h-6 text-white" weight="duotone" />
          </div>
          <h1 className="text-3xl font-extrabold mb-1.5 tracking-tight">Market Sur</h1>
          <p className="text-blue-100 text-sm max-w-[260px] text-balance leading-relaxed">
            El mercadillo digital de Cienfuegos.<br />Lo que buscas, a un toque de distancia.
          </p>
        </div>
      </section>

      {/* Sticky: Search + Filter + Sort */}
      <div className="sticky top-[52px] z-50 transform-gpu bg-white dark:bg-[#18191A] pb-3 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)] rounded-b-3xl transition-colors duration-300">
        <SearchBar onSearch={setBusqueda} />
        <div className="flex items-center gap-2 px-4 pb-1">
          <div className="flex-1 overflow-x-auto">
            <CategoryFilter currentCategory={categoria} onSelectCategory={setCategoria} />
          </div>
          {/* Sort button */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowSort(s => !s)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm font-semibold transition-all ${
                sort !== 'default'
                  ? 'bg-[#1877F2] text-white border-[#1877F2]'
                  : 'bg-white dark:bg-[#3A3B3C] border-slate-200 dark:border-[#4E4F50] text-slate-600 dark:text-slate-300'
              }`}
              aria-label="Ordenar"
            >
              <SortAscending className="w-4 h-4" weight="bold" />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-[#2D2E2F] rounded-2xl shadow-2xl border border-slate-100 dark:border-[#3E4042] z-50 overflow-hidden animate-pop-in">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setShowSort(false); }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                      sort === opt.value
                        ? 'bg-[#E7F3FF] dark:bg-[#1877F2]/20 text-[#1877F2] font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#3A3B3C] font-medium'
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
          <div className="mb-5 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700/30 flex items-center gap-2">
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
                className="w-full h-full rounded-full bg-slate-100 dark:bg-[#3A3B3C] flex items-center justify-center shadow-inner"
              >
                {busqueda ? <MagnifyingGlass className="w-10 h-10 text-slate-300" weight="duotone" /> : <Ghost className="w-10 h-10 text-slate-300" weight="duotone" />}
              </motion.div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-slate-200 dark:bg-black/20 rounded-full blur-sm" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">¡Ups! Nada por aquí</h3>
            <p className="text-center font-medium max-w-[250px] text-balance">
              No encontramos productos que coincidan con tu búsqueda.
            </p>
            <button onClick={() => { setCategoria(null); setBusqueda(''); setSort('default'); }}
              className="mt-6 px-8 py-3 bg-[#1877F2] text-white rounded-xl font-bold text-[15px] hover:bg-[#166FE5] transition-all shadow-lg shadow-[#1877F2]/20 active:scale-95">
              Ver todo el catálogo
            </button>
          </motion.div>
        ) : (
          <>
            {destacados.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <span className="text-base font-extrabold text-slate-800 dark:text-[#E4E6EB]">⭐ Destacados</span>
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-[#3A3B3C] px-2 py-0.5 rounded-full">{destacados.length}</span>
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
                    <span className="text-base font-extrabold text-slate-800 dark:text-[#E4E6EB]">
                      {hasFilters ? (busqueda ? 'Resultados' : categoria) : 'Todos los productos'}
                    </span>
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-[#3A3B3C] px-2 py-0.5 rounded-full">{resto.length}</span>
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
