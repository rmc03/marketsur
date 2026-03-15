import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { CategoryFilter } from '../components/CategoryFilter';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { RefreshCw } from 'lucide-react';

export function Home({ onAddToCart }) {
  const [categoria, setCategoria] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  
  const { productos, cargando, error } = useProducts(categoria, busqueda);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#1877F2] text-white pt-8 pb-12 px-6 rounded-b-[40px] shadow-sm mb-6 w-full max-w-lg mx-auto overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10 flex flex-col items-center text-center mt-4">
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight">
            Descubre Market Sur
          </h1>
          <p className="text-blue-100 text-sm max-w-[280px] text-balance">
            El mercadillo digital de Cienfuegos. Lo que buscas, a un toque de distancia.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <div className="sticky top-[60px] z-30 bg-white/95 dark:bg-[#242526]/95 backdrop-blur-xl border-b border-slate-100 dark:border-[#3E4042] pb-2 shadow-sm rounded-b-2xl transition-colors duration-300">
        <SearchBar onSearch={setBusqueda} />
        <CategoryFilter 
          currentCategory={categoria} 
          onSelectCategory={setCategoria} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 mb-20">
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-lg font-bold text-slate-800 dark:text-[#E4E6EB]">
            {busqueda ? 'Resultados de búsqueda' : (categoria || 'Destacados')}
          </h2>
          <span className="text-sm font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-[#3A3B3C] px-2 py-0.5 rounded-full">
            {productos.length} items
          </span>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700/30">
            <p className="text-sm text-amber-800 dark:text-amber-300 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              {error}
            </p>
          </div>
        )}

        {cargando ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="bg-slate-100 dark:bg-[#3A3B3C] animate-pulse rounded-2xl aspect-[3/4] w-full" />
            ))}
          </div>
        ) : productos.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {productos.map(producto => (
              <ProductCard 
                key={producto.id} 
                producto={producto} 
                onAdd={onAddToCart} 
              />
            ))}
          </div>
        ) : (
           <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500">
            <RefreshCw className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-center font-medium">No encontramos productos<br/>con esos filtros.</p>
            <button 
              onClick={() => { setCategoria(null); setBusqueda(''); }}
              className="mt-6 px-6 py-2 bg-slate-100 dark:bg-[#3A3B3C] text-slate-600 dark:text-slate-300 rounded-full font-medium hover:bg-slate-200 dark:hover:bg-[#4E4F50] transition-colors"
            >
              Ver todo el catálogo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
