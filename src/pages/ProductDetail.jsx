import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MOCK_PRODUCTS } from '../hooks/useProducts';
import { ArrowLeft, ShoppingBag, Truck, Info, AlertCircle } from 'lucide-react';

export function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDetalle() {
      setCargando(true);
      try {
        const { data, error } = await supabase
          .from('productos')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        setProducto(data);
      } catch (err) {
        console.warn("Supabase fetch failed for detail, using mock data:", err);
        const mockP = window.MockData?.find(p => p.id === id);
        setProducto(mockP || null);
      } finally {
        setCargando(false);
      }
    }
    
    cargarDetalle();
    window.scrollTo(0, 0);
  }, [id]);

  if (cargando) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#1877F2] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Cargando detalles...</p>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-[#E4E6EB] mb-2">Producto no encontrado</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">El producto que buscas no existe o ha sido retirado.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#1877F2] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#166FE5] transition"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 animate-fade-in relative min-h-screen bg-slate-50 dark:bg-[#18191A] transition-colors">
      {/* Header Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/80 dark:bg-[#242526]/80 backdrop-blur-md text-slate-800 dark:text-[#E4E6EB] rounded-full flex items-center justify-center shadow-sm border border-slate-200 dark:border-[#3E4042] hover:bg-white dark:hover:bg-[#3A3B3C] transition-all active:scale-95"
      >
        <ArrowLeft className="w-5 h-5 pointer-events-none" />
      </button>

      {/* Image Gallery */}
      <div className="relative w-full aspect-[4/5] bg-slate-200 dark:bg-[#3A3B3C]">
        <img 
          src={producto.imagen_url || 'https://placehold.co/600x800/e2e8f0/94a3b8?text=Sin+Imagen'} 
          alt={producto.nombre} 
          className="w-full h-full object-cover"
        />
        {!producto.disponible && (
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/95 dark:bg-[#242526]/95 px-6 py-2 rounded-full font-bold text-slate-800 dark:text-[#E4E6EB] shadow-xl tracking-wide uppercase text-sm border-2 border-white/20 dark:border-[#3E4042]/20">
              Agotado
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-[#242526] -mt-6 relative z-10 rounded-t-[32px] px-6 pt-8 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] min-h-[50vh] transition-colors">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {producto.nombre}
          </h1>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm font-medium text-[#1877F2] bg-[#E7F3FF] dark:bg-[#1877F2]/20 px-3 py-1 rounded-full border border-[#1877F2]/20">
            {producto.categoria}
          </span>
          <span className="text-sm font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1">
            <Info className="w-4 h-4" /> Info
          </span>
        </div>

        <div className="text-3xl font-black text-slate-900 dark:text-white mb-8 flex items-end gap-2">
          ${producto.precio.toLocaleString('es-AR')}
          <span className="text-sm font-medium text-slate-400 dark:text-slate-500 mb-1 font-normal">CUP</span>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-[#E4E6EB] mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#1877F2]" />
              Descripción
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
              {producto.descripcion || 'Sin descripción detallada disponible.'}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-[#3A3B3C] rounded-2xl p-4 border border-slate-100 dark:border-[#4E4F50] flex items-start gap-3">
            <div className="bg-white dark:bg-[#242526] rounded-full p-2 shadow-sm border border-slate-100 dark:border-[#3E4042]">
              <Truck className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-[#E4E6EB] text-sm">Envío y entrega</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Coordina el envío directamente al realizar tu pedido por WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#242526]/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-[#3E4042]/50 p-4 pb-safe max-w-lg mx-auto z-40 transition-colors">
        <button
          onClick={() => producto.disponible && onAddToCart(producto)}
          disabled={!producto.disponible}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-[0.98] ${
            producto.disponible
              ? 'bg-[#1877F2] text-white shadow-[#1877F2]/20 hover:bg-[#166FE5]'
              : 'bg-slate-100 dark:bg-[#3A3B3C] text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none border border-slate-200 dark:border-[#3E4042]'
          }`}
        >
          <ShoppingBag className="w-6 h-6" />
          {producto.disponible ? 'Añadir al Carrito' : 'Agotado'}
        </button>
      </div>
    </div>
  );
}
