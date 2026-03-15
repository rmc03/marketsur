import { Routes, Route } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { useCart } from './hooks/useCart';
import { useDarkMode } from './hooks/useDarkMode';

import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import { FloatingCartButton } from './components/FloatingCartButton';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastKey, setToastKey] = useState(0);          // bump key to re-trigger
  const { dark, toggle: toggleDark } = useDarkMode();
  
  const { 
    items, 
    agregar, 
    quitar, 
    actualizarCantidad, 
    total, 
    cantidad 
  } = useCart();

  const handleAddToCart = useCallback((producto) => {
    agregar(producto);
    // Show toast instead of opening cart — less disruptive
    setToastKey(k => k + 1);
    setToastVisible(true);
  }, [agregar]);

  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#18191A] flex justify-center transition-colors duration-300">
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
          </Routes>
        </div>

        <Footer />

        {/* Toast notification */}
        <Toast key={toastKey} message="¡Añadido al carrito! 🛒" visible={toastVisible} />

        {/* Floating cart button */}
        <FloatingCartButton 
          cartCount={cantidad}
          total={total}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Cart drawer */}
        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          items={items}
          onUpdateQuantity={actualizarCantidad}
          onRemove={quitar}
          total={total}
        />
        
      </main>
    </div>
  );
}

export default App;
