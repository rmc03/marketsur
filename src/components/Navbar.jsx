import { ShoppingCart, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar({ onOpenCart, cartCount }) {
  return (
    <nav className="glass-header px-4 py-3 flex items-center justify-between sticky top-0 z-40 transition-all duration-300">
      <Link to="/" className="flex items-center gap-2 text-[#1877F2] hover:text-[#166FE5] transition-colors">
        <Store className="w-6 h-6" />
        <span className="font-bold text-xl tracking-tight">Market Sur</span>
      </Link>
      
      <button 
        onClick={onOpenCart}
        className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors active:scale-95"
        aria-label="Ver carrito"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#E41E3F] text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-pop-in">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </button>
    </nav>
  );
}
