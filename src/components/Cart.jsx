import { X, ShoppingBag, WhatsappLogo } from '@phosphor-icons/react';
import { CartItem } from './CartItem';
import { generarMensajeWhatsApp } from '../lib/whatsapp';

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove, total }) {
  if (!isOpen) return null;

  const handleOrder = () => {
    if (items.length === 0) return;
    window.open(generarMensajeWhatsApp(items), '_blank');
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-[#242526] shadow-2xl z-50 flex flex-col animate-slide-in-right transition-colors">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-[#3E4042]">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-[#E4E6EB] flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#1877F2]" weight="duotone" />
            Tu Carrito
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors"
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
          <div className="p-4 bg-white dark:bg-[#242526] border-t border-slate-100 dark:border-[#3E4042] transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-600 dark:text-slate-400 font-semibold">Total:</span>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">${total.toLocaleString('es-AR')} <span className="text-sm font-normal text-slate-400">CUP</span></span>
            </div>
            
            <button
              onClick={handleOrder}
              className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebd5a] active:bg-[#189b4a] text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-[#25D366]/20 transition-all active:scale-[0.98]"
            >
              <WhatsappLogo className="w-6 h-6" weight="fill" />
              Pedir por WhatsApp
            </button>
            <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-3">
              Serás redirigido a WhatsApp para confirmar
            </p>
          </div>
        )}
      </div>
    </>
  );
}
