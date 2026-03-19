import { Minus, Plus, Trash } from '@phosphor-icons/react';

export function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { id, nombre, precio, imagen_url, cantidad } = item;

  return (
    <div className="flex items-center gap-3 py-4 border-b border-white/30 dark:border-white/[0.06] last:border-0">
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/50 dark:bg-white/[0.03] flex-shrink-0 border border-white/30 dark:border-white/[0.06]">
        <img
          src={imagen_url || 'https://placehold.co/100x100/e2e8f0/94a3b8?text=Img'}
          alt={nombre}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1 truncate">{nombre}</h4>
        <div className="font-extrabold gradient-text text-[15px]">${precio.toLocaleString('es-AR')} <span className="text-[10px] font-normal text-slate-400">CUP</span></div>
      </div>
      
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <button
          onClick={() => onRemove(id)}
          className="text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors p-1"
          aria-label="Eliminar producto"
        >
          <Trash className="w-4 h-4" weight="duotone" />
        </button>
        
        <div className="flex items-center gap-1.5 bg-white/50 dark:bg-white/[0.04] backdrop-blur-xl rounded-lg p-0.5 ring-1 ring-white/30 dark:ring-white/[0.05]">
          <button
            onClick={() => onUpdateQuantity(id, -1)}
            disabled={cantidad <= 1}
            className="w-7 h-7 flex items-center justify-center rounded-md bg-white dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 shadow-sm disabled:opacity-40 disabled:shadow-none transition-all hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
          >
            <Minus className="w-3 h-3" weight="bold" />
          </button>
          
          <span className="text-sm font-bold w-5 text-center text-slate-800 dark:text-slate-100">{cantidad}</span>
          
          <button
            onClick={() => onUpdateQuantity(id, 1)}
            className="w-7 h-7 flex items-center justify-center rounded-md bg-white dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 shadow-sm transition-all hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
          >
            <Plus className="w-3 h-3" weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
