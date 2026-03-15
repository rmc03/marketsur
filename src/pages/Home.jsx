import { useState, useCallback } from 'react';
import { useProducts } from '../hooks/useProducts';
import { CategoryFilter } from '../components/CategoryFilter';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { PromoBanner } from '../components/PromoBanner';
import { Store } from '@phosphor-icons/react';

// Shimmer skeleton card
function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-[#3E4042] bg-white dark:bg-[#242526]">
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
    </div>
  );
}

export function Home({ onAddToCart }) {
  const [categoria, setCategoria] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  
  const { productos, cargando, error } = useProducts(categoria, busqueda);

  // Separate featured from rest (only when not filtering/searching)
  const destacados = (!busqueda && !categoria) ? productos.filter(p => p.destacado) : [];
  const resto      = (!busqueda && !categoria) ? productos.filter(p => !p.destacado) : productos;

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero ── */}
      <section className="hero-gradient text-white pt-8 pb-14 px-6 rounded-b-[48px] mb-6 w-full max-w-lg mx-auto overflow-hidden relative shadow-lg shadow-[#1877F2]/20">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col items-center text-center mt-2">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 shadow-lg">
            <Store className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold mb-1.5 tracking-tight">Market Sur</h1>
          <p className="text-blue-100 text-sm max-w-[260px] text-balance leading-relaxed">
            El mercadillo digital de Cienfuegos.<br />Lo que buscas, a un toque de distancia.
          </p>
        </div>
      </section>

      {/* ── Promo Banner ── */}
      <PromoBanner />

      {/* ── Search & Filter (sticky) ── */}
      <div className="sticky top-[60px] z-30 bg-white/95 dark:bg-[#242526]/95 backdrop-blur-xl border-b border-slate-100 dark:border-[#3E4042] pb-2 shadow-sm rounded-b-2xl transition-colors duration-300">
        <SearchBar onSearch={setBusqueda} />
        <CategoryFilter currentCategory={categoria} onSelectCategory={setCategoria} />
      </div>

      {/* ── Content ── */}
      <div className="flex-1 px-4 py-6 mb-28">

        {/* Error banner */}
        {error && (
          <div className="mb-5 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700/30 flex items-center gap-2">
            <span className="w-2 h-2 flex-shrink-0 rounded-full bg-amber-500 animate-pulse" />
            <p className="text-xs text-amber-800 dark:text-amber-300 font-medium leading-snug">{error}</p>
          </div>
        )}

        {/* Skeleton */}
        {cargando ? (
          <div className="grid grid-cols-2 gap-4 card-stagger">
            {[1,2,3,4].map(n => <SkeletonCard key={n} />)}
          </div>
        ) : productos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-[#3A3B3C] flex items-center justify-center mb-4">
              <Store className="w-8 h-8 opacity-30" />
            </div>
            <p className="text-center font-medium">No encontramos productos<br />con esos filtros.</p>
            <button 
              onClick={() => { setCategoria(null); setBusqueda(''); }}
              className="mt-5 px-6 py-2.5 bg-[#1877F2] text-white rounded-full font-semibold text-sm hover:bg-[#166FE5] transition-colors shadow-md shadow-[#1877F2]/20"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <>
            {/* Destacados section */}
            {destacados.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <span className="text-base font-bold text-slate-800 dark:text-[#E4E6EB]">⭐ Destacados</span>
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-[#3A3B3C] px-2 py-0.5 rounded-full">
                    {destacados.length}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-5 card-stagger">
                  {destacados.map(p => (
                    <ProductCard key={p.id} producto={p} onAdd={onAddToCart} />
                  ))}
                </div>
              </div>
            )}

            {/* Rest of products */}
            {resto.length > 0 && (
              <div>
                {destacados.length > 0 && (
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <span className="text-base font-bold text-slate-800 dark:text-[#E4E6EB]">Todos los productos</span>
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-[#3A3B3C] px-2 py-0.5 rounded-full">
                      {resto.length}
                    </span>
                  </div>
                )}
                {/* When filtering show title normally */}
                {(busqueda || categoria) && (
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <span className="text-base font-bold text-slate-800 dark:text-[#E4E6EB]">
                      {busqueda ? 'Resultados' : categoria}
                    </span>
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-[#3A3B3C] px-2 py-0.5 rounded-full">
                      {resto.length}
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-x-4 gap-y-5 card-stagger">
                  {resto.map(p => (
                    <ProductCard key={p.id} producto={p} onAdd={onAddToCart} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
