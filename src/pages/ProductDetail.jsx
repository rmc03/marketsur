import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, ShoppingBag, Truck, Info, WarningCircle, ShareNetwork, CheckCircle } from '@phosphor-icons/react';

export function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    async function cargarDetalle() {
      setCargando(true);
      try {
        const { data, error } = await supabase.from('productos').select('*').eq('id', id).single();
        if (error) throw error;
        setProducto(data);
      } catch (err) {
        console.warn("Supabase fetch failed, using mock:", err);
        const mockP = window.MockData?.find(p => p.id === id);
        setProducto(mockP || null);
      } finally {
        setCargando(false);
      }
    }
    cargarDetalle();
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = async () => {
    const shareData = {
      title: producto?.nombre || 'Producto en Market Sur',
      text: `¡Mira este producto en Market Sur! ${producto?.nombre} — $${producto?.precio?.toLocaleString('es-AR')} CUP`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#1877F2] border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 dark:text-slate-400 font-semibold animate-pulse">Cargando detalles...</p>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <WarningCircle className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" weight="duotone" />
        <h2 className="text-xl font-extrabold text-slate-800 dark:text-[#E4E6EB] mb-2">Producto no encontrado</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">El producto que buscas no existe o ha sido retirado.</p>
        <button onClick={() => navigate('/')} className="bg-[#1877F2] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#166FE5] transition shadow-md shadow-[#1877F2]/20">
          Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="pb-28 animate-fade-in relative min-h-screen bg-slate-50 dark:bg-[#18191A] transition-colors">
      {/* Top action bar */}
      <div className="absolute top-4 left-0 right-0 px-4 flex justify-between z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/80 dark:bg-[#242526]/80 backdrop-blur-md text-slate-800 dark:text-[#E4E6EB] rounded-full flex items-center justify-center shadow-sm border border-slate-200 dark:border-[#3E4042] hover:bg-white dark:hover:bg-[#3A3B3C] transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" weight="bold" />
        </button>

        <button
          onClick={handleShare}
          className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border transition-all active:scale-95 ${
            shared
              ? 'bg-[#1877F2] border-[#1877F2] text-white'
              : 'bg-white/80 dark:bg-[#242526]/80 border-slate-200 dark:border-[#3E4042] text-slate-700 dark:text-[#E4E6EB] hover:bg-white dark:hover:bg-[#3A3B3C]'
          }`}
          aria-label="Compartir producto"
        >
          {shared
            ? <CheckCircle className="w-5 h-5" weight="fill" />
            : <ShareNetwork className="w-5 h-5" weight="duotone" />}
        </button>
      </div>

      {/* Image */}
      <div className="relative w-full aspect-[4/5] bg-slate-200 dark:bg-[#3A3B3C]">
        <img
          src={producto.imagen_url || 'https://placehold.co/600x800/e2e8f0/94a3b8?text=Sin+Imagen'}
          alt={producto.nombre}
          className="w-full h-full object-cover"
        />
        {!producto.disponible && (
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/95 dark:bg-[#242526]/95 px-6 py-2 rounded-full font-bold text-slate-800 dark:text-[#E4E6EB] shadow-xl tracking-wide uppercase text-sm">
              Agotado
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-[#242526] -mt-6 relative z-10 rounded-t-[32px] px-6 pt-8 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] min-h-[50vh] transition-colors">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">{producto.nombre}</h1>
        
        <div className="flex items-center gap-2 mb-5">
          <span className="text-sm font-semibold text-[#1877F2] bg-[#E7F3FF] dark:bg-[#1877F2]/20 px-3 py-1 rounded-full border border-[#1877F2]/20">
            {producto.categoria}
          </span>
        </div>

        <div className="text-3xl font-black text-slate-900 dark:text-white mb-7 flex items-end gap-2">
          ${producto.precio.toLocaleString('es-AR')}
          <span className="text-sm font-normal text-slate-400 dark:text-slate-500 mb-1">CUP</span>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-[#E4E6EB] mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#1877F2]" weight="duotone" />
              Descripción
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
              {producto.descripcion || 'Sin descripción detallada disponible.'}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-[#3A3B3C] rounded-2xl p-4 border border-slate-100 dark:border-[#4E4F50] flex items-start gap-3">
            <div className="bg-white dark:bg-[#242526] rounded-full p-2 shadow-sm border border-slate-100 dark:border-[#3E4042]">
              <Truck className="w-5 h-5 text-slate-600 dark:text-slate-400" weight="duotone" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-[#E4E6EB] text-sm">Envío y entrega</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Coordina el envío directamente al realizar tu pedido por WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#242526]/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-[#3E4042]/50 p-4 max-w-lg mx-auto z-40 transition-colors">
        <button
          onClick={() => producto.disponible && onAddToCart(producto)}
          disabled={!producto.disponible}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] ${
            producto.disponible
              ? 'bg-[#1877F2] text-white shadow-lg shadow-[#1877F2]/20 hover:bg-[#166FE5]'
              : 'bg-slate-100 dark:bg-[#3A3B3C] text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-[#3E4042]'
          }`}
        >
          <ShoppingBag className="w-6 h-6" weight="duotone" />
          {producto.disponible ? 'Añadir al Carrito' : 'Agotado'}
        </button>
      </div>
    </div>
  );
}
