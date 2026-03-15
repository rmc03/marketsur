import { Routes, Route } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { useCart } from './hooks/useCart';
import { useDarkMode } from './hooks/useDarkMode';
import { useOrderHistory } from './hooks/useOrderHistory';
import { useOnboarding, Onboarding } from './components/Onboarding';

import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import { FloatingCartButton } from './components/FloatingCartButton';
import { Toast } from './components/Toast';
import { BottomNav } from './components/BottomNav';

import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { OrderHistory } from './pages/OrderHistory';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastKey, setToastKey] = useState(0);
  const { dark, toggle: toggleDark } = useDarkMode();
  const { saveOrder } = useOrderHistory();
  const { show: showOnboarding, done: doneOnboarding } = useOnboarding();
  
  const { items, agregar, quitar, actualizarCantidad, total, cantidad } = useCart();

  const handleAddToCart = useCallback((producto) => {
    agregar(producto);
    setToastKey(k => k + 1);
    setToastVisible(true);
  }, [agregar]);

  const handleOrder = useCallback((items, total) => {
    saveOrder(items, total);
  }, [saveOrder]);

  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#18191A] flex justify-center transition-colors duration-300">
      {/* Onboarding overlay — shown once on first visit */}
      {showOnboarding && <Onboarding onDone={doneOnboarding} />}

      {/* Centered mobile container */}
      <main className="w-full max-w-lg bg-white dark:bg-[#242526] min-h-screen flex flex-col relative shadow-2xl overflow-hidden ring-1 ring-slate-200/50 dark:ring-[#3E4042]/50 transition-colors duration-300">
        
        <Navbar 
          cartCount={cantidad} 
          onOpenCart={() => setIsCartOpen(true)}
          dark={dark}
          onToggleDark={toggleDark}
        />
        
        <div className="flex-1 relative">
          <Routes>
            <Route path="/"            element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/producto/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
            <Route path="/nosotros"    element={<About />} />
            <Route path="/historial"   element={<OrderHistory />} />
          </Routes>
        </div>

        {/* Toast notification */}
        <Toast key={toastKey} message="¡Añadido al carrito! 🛒" visible={toastVisible} />

        {/* Floating cart button (only on home + product pages, not when nav tabs needed) */}
        <FloatingCartButton 
          cartCount={cantidad}
          total={total}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Bottom Navigation */}
        <BottomNav />

        {/* Cart drawer */}
        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          items={items}
          onUpdateQuantity={actualizarCantidad}
          onRemove={quitar}
          total={total}
          onOrder={handleOrder}
        />
        
      </main>
    </div>
  );
}

export default App;
