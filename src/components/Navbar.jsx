import { ShoppingCart, Storefront, Sun, Moon, List } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

export function Navbar({ onOpenCart, cartCount, dark, onToggleDark, onOpenSidebar }) {
  return (
    <nav className="glass-header px-4 py-3 flex items-center justify-between sticky top-0 z-40 transition-all duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-1 -ml-1 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#3A3B3C] rounded-xl transition-colors active:scale-95"
          aria-label="Abrir menú"
        >
          <List className="w-7 h-7" weight="bold" />
        </button>
        <Link to="/" className="flex items-center gap-2 text-[#1877F2] hover:text-[#166FE5] transition-colors -ml-1">
          <Storefront className="w-6 h-6" weight="duotone" />
          <span className="font-extrabold text-xl tracking-tight leading-none">Market Sur</span>
        </Link>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleDark}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors"
          aria-label="Cambiar tema"
        >
          {dark
            ? <Sun className="w-5 h-5" weight="duotone" />
            : <Moon className="w-5 h-5" weight="duotone" />}
        </button>

        <button 
          onClick={onOpenCart}
          className="relative p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors active:scale-95"
          aria-label="Ver carrito"
        >
          <ShoppingCart className="w-6 h-6" weight="duotone" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#E41E3F] text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-[#242526] animate-pop-in">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
