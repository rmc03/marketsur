import { X, ShoppingBag, WhatsappLogo } from '@phosphor-icons/react';
import { CartItem } from './CartItem';
import { generarMensajeWhatsApp } from '../lib/whatsapp';
import { RippleButton } from './RippleButton';

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove, total, onOrder }) {
  const handleOrder = () => {
    if (items.length === 0) return;
    if (onOrder) onOrder(items, total);
    window.open(generarMensajeWhatsApp(items), '_blank');
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md glass-panel shadow-2xl z-[100] flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Gradient accent top border */}
        <div className="h-1 gradient-primary" />
        
        <div className="flex items-center justify-between p-4 border-b border-white/20 dark:border-white/[0.08]">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 gradient-text" weight="duotone" />
            Tu Carrito
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-white/[0.06] rounded-full transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-6 h-6" weight="bold" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" weight="duotone" />
              <p className="text-center font-medium">Tu carrito está vacío.<br />¡Añade algunos productos!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {items.map(item => (
                <CartItem key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} onRemove={onRemove} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 glass-surface border-t border-white/20 dark:border-white/[0.08] transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-600 dark:text-slate-400 font-semibold">Total:</span>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                ${total.toLocaleString('es-AR')} <span className="text-sm font-normal text-slate-400">CUP</span>
              </span>
            </div>
            
            <RippleButton
              onClick={handleOrder}
              className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#22c55e] active:bg-[#1ea855] text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-green-500/20 transition-all active:scale-[0.98] ring-1 ring-white/20"
            >
              <WhatsappLogo className="w-6 h-6" weight="fill" />
              Pedir por WhatsApp
            </RippleButton>
            <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-3">
              Serás redirigido a WhatsApp para confirmar
            </p>
          </div>
        )}
      </div>
    </>
  );
}
