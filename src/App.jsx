import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from './hooks/useCart';

import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { 
    items, 
    agregar, 
    quitar, 
    actualizarCantidad, 
    total, 
    cantidad 
  } = useCart();

  const handleAddToCart = (producto) => {
    agregar(producto);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center selection:bg-emerald-500/30">
      {/* Mobile container constraint centered on desktop */}
      <main className="w-full max-w-lg bg-white min-h-screen flex flex-col relative shadow-2xl overflow-hidden ring-1 ring-slate-200/50">
        
        <Navbar 
          cartCount={cantidad} 
          onOpenCart={() => setIsCartOpen(true)} 
        />
        
        <div className="flex-1 relative">
          <Routes>
            <Route 
              path="/" 
              element={<Home onAddToCart={handleAddToCart} />} 
            />
            <Route 
              path="/producto/:id" 
              element={<ProductDetail onAddToCart={handleAddToCart} />} 
            />
          </Routes>
        </div>

        <Footer />

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
