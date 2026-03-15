import { Minus, Plus, Trash2 } from 'lucide-react';

export function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { id, nombre, precio, imagen_url, cantidad } = item;

  return (
    <div className="flex items-center gap-3 py-4 border-b border-slate-100 dark:border-[#3E4042] last:border-0">
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 dark:bg-[#3A3B3C] flex-shrink-0 border border-slate-100 dark:border-[#3E4042]">
        <img 
          src={imagen_url || 'https://placehold.co/100x100/e2e8f0/94a3b8?text=Img'} 
          alt={nombre}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-slate-800 dark:text-[#E4E6EB] text-sm mb-1 truncate">{nombre}</h4>
        <div className="font-bold text-[#1877F2]">${precio.toLocaleString('es-AR')}</div>
      </div>
      
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <button 
          onClick={() => onRemove(id)}
          className="text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors p-1"
          aria-label="Eliminar producto"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#3A3B3C] rounded-lg p-0.5">
          <button 
            onClick={() => onUpdateQuantity(id, -1)}
            disabled={cantidad <= 1}
            className="w-6 h-6 flex items-center justify-center rounded-md bg-white dark:bg-[#242526] text-slate-600 dark:text-slate-300 shadow-sm disabled:opacity-50 disabled:shadow-none"
          >
            <Minus className="w-3 h-3" />
          </button>
          
          <span className="text-sm font-medium w-4 text-center text-slate-800 dark:text-[#E4E6EB]">{cantidad}</span>
          
          <button 
            onClick={() => onUpdateQuantity(id, 1)}
            className="w-6 h-6 flex items-center justify-center rounded-md bg-white dark:bg-[#242526] text-slate-600 dark:text-slate-300 shadow-sm"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
