import { useOrderHistory } from '../hooks/useOrderHistory';
import { Clock, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

export function OrderHistory() {
  const { orders, clearHistory } = useOrderHistory();

  const reorder = (order) => {
    // Rebuild WhatsApp message from saved order
    const phone = '5353770707';
    let msg = 'Hola, quiero repetir este pedido:%0A%0A';
    order.items.forEach(i => {
      msg += `• ${i.nombre} x${i.cantidad} — $${i.precio * i.cantidad}%0A`;
    });
    msg += `%0A*Total: $${order.total}*%0A%0A¿Está disponible?`;
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="pb-28 animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-6 h-6 gradient-text" />
          <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">Historial de Pedidos</h1>
        </div>
        {orders.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-3 py-1.5 rounded-full transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Limpiar
          </button>
        )}
      </div>

      {/* Empty state */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
          <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center mb-5">
            <ShoppingBag className="w-10 h-10 text-slate-300 dark:text-slate-600" />
          </div>
          <h2 className="text-lg font-extrabold text-slate-700 dark:text-slate-200 mb-2">Sin pedidos aún</h2>
          <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed max-w-[240px]">
            Cuando envíes un pedido por WhatsApp, aparecerá aquí para que lo puedas repetir fácilmente.
          </p>
        </div>
      ) : (
        <div className="px-4 space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="glass-card rounded-2xl overflow-hidden"
            >
              {/* Order header */}
              <div className="px-4 py-3 border-b border-white/30 dark:border-white/[0.06] flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{formatDate(order.date)}</p>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                    Total: <span className="gradient-text">${order.total.toLocaleString('es-AR')} CUP</span>
                  </p>
                </div>
                <span className="text-xs gradient-text bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500 font-bold px-2.5 py-1 rounded-full bg-indigo-50/80 dark:bg-indigo-500/10">
                  {order.items.reduce((s, i) => s + i.cantidad, 0)} productos
                </span>
              </div>

              {/* Items list */}
              <div className="px-4 py-3 space-y-1.5">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-slate-700 dark:text-slate-300 truncate max-w-[180px]">
                      {item.nombre} <span className="text-slate-400">×{item.cantidad}</span>
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-100 flex-shrink-0">
                      ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Reorder button */}
              <div className="px-4 pb-4">
                <button
                  onClick={() => reorder(order)}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold text-sm py-2.5 rounded-xl shadow-lg shadow-green-500/20 transition-all active:scale-[0.98] ring-1 ring-white/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  Repetir pedido
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
