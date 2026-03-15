import { ShoppingCart } from 'lucide-react';

export function FloatingCartButton({ cartCount, total, onOpenCart }) {
  if (cartCount === 0) return null;

  return (
    <button
      onClick={onOpenCart}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1877F2] hover:bg-[#166FE5] active:bg-[#145DBF] text-white pl-4 pr-5 py-3.5 rounded-full shadow-xl shadow-[#1877F2]/30 hover:shadow-2xl hover:shadow-[#1877F2]/40 transition-all duration-300 active:scale-95 animate-pop-in group max-w-lg"
      aria-label="Ver carrito"
    >
      {/* Icon with pulse ring */}
      <div className="relative">
        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-60" style={{ animationDuration: '2s' }} />
        <div className="relative bg-white/20 rounded-full p-2">
          <ShoppingCart className="w-5 h-5" />
        </div>
        {/* Badge */}
        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#E41E3F] text-[9px] font-bold text-white ring-2 ring-[#1877F2]">
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      </div>

      {/* Text + Total */}
      <div className="flex flex-col items-start leading-tight">
        <span className="text-[13px] font-bold tracking-wide">Ver Carrito</span>
        <span className="text-[11px] text-blue-100 font-medium">${total.toLocaleString('es-AR')} CUP</span>
      </div>
    </button>
  );
}
