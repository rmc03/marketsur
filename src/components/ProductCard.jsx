import { Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ProductCard({ producto, onAdd }) {
  const { id, nombre, precio, categoria, imagen_url, disponible } = producto;
  
  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disponible) {
      onAdd(producto);
    }
  };

  return (
    <Link 
      to={`/producto/${id}`}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-[#1877F2]/30 active:scale-[0.98]"
    >
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
        <img 
          src={imagen_url || 'https://placehold.co/400x400/e2e8f0/94a3b8?text=Sin+Imagen'} 
          alt={nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {!disponible && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-white/90 text-slate-800 px-4 py-1.5 font-bold rounded-full text-sm shadow-sm">
              Agotado
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-medium text-[#1877F2] mb-1">{categoria}</span>
        <h3 className="font-semibold text-slate-800 leading-tight mb-2 line-clamp-2 flex-1">
          {nombre}
        </h3>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-bold text-lg text-slate-900">
            ${precio.toLocaleString('es-AR')}
          </span>
          
          <button
            onClick={handleAdd}
            disabled={!disponible}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              disponible 
                ? 'bg-slate-100 text-slate-800 hover:bg-[#1877F2] hover:text-white active:bg-[#166FE5]'
                : 'bg-slate-50 text-slate-300 cursor-not-allowed'
            }`}
            aria-label="Añadir al carrito"
          >
            {disponible ? <Plus className="w-5 h-5 pointer-events-none" /> : <ShoppingBag className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </Link>
  );
}
