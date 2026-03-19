/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getProductImages } from '../lib/images';
import { ArrowLeft, ShoppingBag, Truck, Info, WarningCircle, ShareNetwork, CheckCircle } from '@phosphor-icons/react';
import { RippleButton } from '../components/RippleButton';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [shared, setShared] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    setCurrentImageIndex(0); // Reset image index when product changes
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

  // Get images array - support both single imagen_url and multiple imagenes
  const images = getProductImages(producto);
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };


  if (cargando) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 dark:text-slate-400 font-semibold animate-pulse">Cargando detalles...</p>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <WarningCircle className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" weight="duotone" />
        <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">Producto no encontrado</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">El producto que buscas no existe o ha sido retirado.</p>
        <Link to="/" className="gradient-primary text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-indigo-500/20">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-28 animate-fade-in relative min-h-screen bg-slate-100/50 dark:bg-[#0F0F1A]/50 transition-colors">
      {/* Top action bar */}
      <div className="absolute top-4 right-4 z-[120]">
        <button
          onClick={handleShare}
          className={`w-10 h-10 backdrop-blur-xl rounded-full flex items-center justify-center shadow-sm border transition-all active:scale-95 ${
            shared
              ? 'gradient-primary border-transparent text-white'
              : 'bg-white/60 dark:bg-white/[0.06] border-white/40 dark:border-white/[0.1] text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-white/[0.1]'
          }`}
          aria-label="Compartir producto"
        >
          {shared
            ? <CheckCircle className="w-5 h-5" weight="fill" />
            : <ShareNetwork className="w-5 h-5" weight="duotone" />}
        </button>
      </div>

      {/* Image Gallery */}
      <div className="relative w-full aspect-[4/5] bg-slate-200/50 dark:bg-white/[0.03] overflow-hidden touch-pan-y">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`${producto.nombre} - Imagen ${currentImageIndex + 1}`}
            className="w-full h-full object-cover select-none"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            drag={hasMultipleImages ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragDirectionLock
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -500) {
                nextImage();
              } else if (swipe > 500) {
                prevImage();
              }
            }}
          />
        </AnimatePresence>

        {/* Navigation arrows for multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/70 dark:bg-white/[0.08] backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg border border-white/30 dark:border-white/[0.1] hover:bg-white/90 dark:hover:bg-white/[0.15] transition-all active:scale-95 z-10"
              aria-label="Imagen anterior"
            >
              <ArrowLeft className="w-4 h-4" weight="bold" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/70 dark:bg-white/[0.08] backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg border border-white/30 dark:border-white/[0.1] hover:bg-white/90 dark:hover:bg-white/[0.15] transition-all active:scale-95 z-10"
              aria-label="Imagen siguiente"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" weight="bold" />
            </button>
          </>
        )}

        {/* Image indicators */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`transition-all ${
                  index === currentImageIndex
                    ? 'w-6 h-2 gradient-primary'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70 rounded-full'
                } rounded-full`}
                aria-label={`Ver imagen ${index + 1}`}
              />
            ))}
          </div>
        )}

        {!producto.disponible && (
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="bg-white/80 dark:bg-white/[0.1] backdrop-blur-md px-6 py-2 rounded-full font-bold text-slate-800 dark:text-white shadow-xl tracking-wide uppercase text-sm">
              Agotado
            </div>
          </div>
        )}
      </div>

      {/* Content — Glass card rising */}
      <div className="glass-card -mt-6 relative z-10 rounded-t-[32px] px-6 pt-8 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] min-h-[50vh] transition-colors">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">{producto.nombre}</h1>
        
        <div className="flex items-center gap-2 mb-5">
          <span className="text-sm font-semibold gradient-text bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500 px-3 py-1 rounded-full">
            {producto.categoria}
          </span>
        </div>

        <div className="text-3xl font-black text-slate-900 dark:text-white mb-7 flex items-end gap-2 gradient-text">
          ${producto.precio.toLocaleString('es-AR')}
          <span className="text-sm font-normal text-slate-400 dark:text-slate-500 mb-1">CUP</span>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 gradient-text" weight="duotone" />
              Descripción
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
              {producto.descripcion || 'Sin descripción detallada disponible.'}
            </p>
          </div>

          <div className="glass-surface rounded-2xl p-4 flex items-start gap-3">
            <div className="bg-white/60 dark:bg-white/[0.06] backdrop-blur-xl rounded-full p-2 shadow-sm ring-1 ring-white/30 dark:ring-white/[0.05]">
              <Truck className="w-5 h-5 text-indigo-500" weight="duotone" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Envío y entrega</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Coordina el envío directamente al realizar tu pedido por WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed CTA — Glass bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/70 dark:bg-[#0F0F1A]/70 backdrop-blur-2xl border-t border-white/30 dark:border-white/[0.06] p-4 max-w-lg mx-auto z-40 transition-colors">
        {producto.disponible ? (
          <RippleButton
            onClick={() => onAddToCart(producto)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-transform active:scale-[0.98] gradient-primary text-white shadow-lg shadow-indigo-500/20 hover:opacity-90"
          >
            <ShoppingBag className="w-6 h-6 pointer-events-none" weight="duotone" />
            Añadir al Carrito
          </RippleButton>
        ) : (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg bg-slate-100/80 dark:bg-white/[0.06] text-slate-400 dark:text-slate-500 cursor-not-allowed border border-white/40 dark:border-white/[0.06]"
          >
            <ShoppingBag className="w-6 h-6" weight="duotone" />
            Agotado
          </button>
        )}
      </div>
    </div>
  );
}
