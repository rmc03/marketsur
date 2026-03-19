import { ShoppingCart, Storefront, Sun, Moon, List } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export function Navbar({ onOpenCart, cartCount, dark, onToggleDark, onOpenSidebar, isHome }) {
  const prevCountRef = useRef(cartCount);

  useEffect(() => {
    // Animate badge when count increases
    if (cartCount > prevCountRef.current) {
      const badge = document.getElementById('cart-badge');
      if (badge) {
        badge.classList.remove('animate-badge-bump');
        void badge.offsetWidth; // Trigger reflow
        badge.classList.add('animate-badge-bump');
      }
    }
    prevCountRef.current = cartCount;
  }, [cartCount]);

  return (
    <nav className={`glass-header px-4 py-3 flex items-center justify-between sticky top-0 z-40 transition-all duration-400 ${isHome ? '!border-transparent !shadow-none !bg-transparent dark:!bg-transparent !backdrop-blur-none' : ''}`}>
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-1.5 -ml-1 text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/[0.08] rounded-xl transition-all active:scale-95 backdrop-blur-sm"
          aria-label="Abrir menú"
        >
          <List className="w-6 h-6" weight="bold" />
        </button>
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity -ml-1">
          <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Storefront className="w-4.5 h-4.5 text-white" weight="fill" />
          </div>
          <span className="font-extrabold text-xl tracking-tight leading-none gradient-text">Market Sur</span>
        </Link>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleDark}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-white/[0.08] rounded-full transition-all"
          aria-label="Cambiar tema"
        >
          {dark
            ? <Sun className="w-5 h-5" weight="duotone" />
            : <Moon className="w-5 h-5" weight="duotone" />}
        </button>

        <button 
          onClick={onOpenCart}
          className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/[0.08] rounded-full transition-all active:scale-95"
          aria-label="Ver carrito"
        >
          <ShoppingCart className="w-6 h-6" weight="duotone" />
          {cartCount > 0 && (
            <span 
              id="cart-badge"
              className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-white shadow-md shadow-indigo-500/30 ring-2 ring-white/80 dark:ring-[#0F0F1A]/80 animate-pop-in"
            >
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
