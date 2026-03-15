import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from './hooks/useCart';
import { useDarkMode } from './hooks/useDarkMode';
import { useOrderHistory } from './hooks/useOrderHistory';
import { useOnboarding } from './hooks/useOnboarding';
import { Onboarding } from './components/Onboarding';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Cart } from './components/Cart';
import { FloatingCartButton } from './components/FloatingCartButton';
import { Toast } from './components/Toast';

import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { OrderHistory } from './pages/OrderHistory';

const pageVariants = {
  initial: { opacity: 0, scale: 0.98, y: 10 },
  in: { opacity: 1, scale: 1, y: 0 },
  out: { opacity: 0, scale: 0.98, y: -10 }
};

const pageTransition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.3
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="absolute inset-0 w-full"
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      {/* Onboarding overlay */}
      {showOnboarding && <Onboarding onDone={doneOnboarding} />}

      <motion.main 
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.1, bottom: 0 }}
        className="w-full max-w-lg bg-white dark:bg-[#242526] min-h-screen flex flex-col relative shadow-2xl overflow-hidden ring-1 ring-slate-200/50 dark:ring-[#3E4042]/50 transition-colors duration-300"
      >
        
        {/* Pull to refresh visual hint behind navbar */}
        <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-center -z-10 pointer-events-none opacity-50">
          <div className="w-6 h-6 border-2 border-slate-300 dark:border-slate-600 border-t-[#1877F2] rounded-full animate-spin" />
        </div>
        
        <Navbar 
          cartCount={cantidad} 
          onOpenCart={() => setIsCartOpen(true)}
          dark={dark}
          onToggleDark={toggleDark}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        <div className="flex-1 relative overflow-x-hidden">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<AnimatedPage><Home onAddToCart={handleAddToCart} /></AnimatedPage>} />
              <Route path="/producto/:id" element={<AnimatedPage><ProductDetail onAddToCart={handleAddToCart} /></AnimatedPage>} />
              <Route path="/nosotros" element={<AnimatedPage><About /></AnimatedPage>} />
              <Route path="/historial" element={<AnimatedPage><OrderHistory /></AnimatedPage>} />
            </Routes>
          </AnimatePresence>
        </div>

        <Toast key={toastKey} message="¡Añadido al carrito! 🛒" visible={toastVisible} />

        <FloatingCartButton 
          cartCount={cantidad}
          total={total}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          items={items}
          onUpdateQuantity={actualizarCantidad}
          onRemove={quitar}
          total={total}
          onOrder={handleOrder}
        />
        
      </motion.main>
    </div>
  );
}

export default App;
