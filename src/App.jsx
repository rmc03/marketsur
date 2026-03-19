import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from './hooks/useCart';
import { useDarkMode } from './hooks/useDarkMode';
import { useOrderHistory } from './hooks/useOrderHistory';
import { useOnboarding } from './hooks/useOnboarding';
import { Onboarding } from './components/Onboarding';
import { PullToRefresh } from './components/PullToRefresh';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Cart } from './components/Cart';
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
      className="w-full h-full"
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
    // Haptic feedback on mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    setToastKey(k => k + 1);
    setToastVisible(true);
  }, [agregar]);

  const handleOrder = useCallback((items, total) => {
    saveOrder(items, total);
  }, [saveOrder]);

  return (
    <div className="min-h-screen bg-[#EEF2FF] dark:bg-[#0F0F1A] flex justify-center transition-colors duration-400 relative overflow-hidden">
      {/* Decorative gradient orbs — simplified for performance */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-400/10 to-blue-500/5 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/8 to-cyan-400/5 blur-3xl" />
        {/* Dark mode orbs */}
        <div className="hidden dark:block absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-600/5 to-blue-700/3 blur-3xl" />
        <div className="hidden dark:block absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-blue-600/4 to-cyan-600/2 blur-3xl" />
      </div>

      {/* Onboarding overlay */}
      {showOnboarding && <Onboarding onDone={doneOnboarding} />}

      <main 
        className="w-full max-w-lg bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm min-h-screen flex flex-col relative z-10 shadow-2xl shadow-indigo-500/[0.05] ring-1 ring-white/30 dark:ring-white/[0.05] transition-colors duration-400"
      >
        
        <Navbar 
          cartCount={cantidad} 
          onOpenCart={() => setIsCartOpen(true)}
          dark={dark}
          onToggleDark={toggleDark}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          isHome={location.pathname === '/'}
        />

        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        <div className="flex-1 relative overflow-x-clip w-full">
          <PullToRefresh onRefresh={async () => {
            // Wait a bit for the animation to complete before reloading
            await new Promise(resolve => setTimeout(resolve, 300));
            window.location.reload();
          }}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<AnimatedPage><Home onAddToCart={handleAddToCart} /></AnimatedPage>} />
                <Route path="/producto/:id" element={<AnimatedPage><ProductDetail onAddToCart={handleAddToCart} /></AnimatedPage>} />
                <Route path="/nosotros" element={<AnimatedPage><About /></AnimatedPage>} />
                <Route path="/historial" element={<AnimatedPage><OrderHistory /></AnimatedPage>} />
              </Routes>
            </AnimatePresence>
          </PullToRefresh>
        </div>

        <Toast key={toastKey} message="¡Añadido al carrito! 🛒" visible={toastVisible} />

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
