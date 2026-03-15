import { useState, useEffect } from 'react';

export function useCart() {
  // Initialize from localStorage if available
  const [items, setItems] = useState(() => {
    try {
      const localData = localStorage.getItem('marketsur_cart');
      return localData ? JSON.parse(localData) : [];
    } catch (e) {
      console.error("Could not parse cart from localStorage", e);
      return [];
    }
  });

  // Sync to localStorage on items change
  useEffect(() => {
    localStorage.setItem('marketsur_cart', JSON.stringify(items));
  }, [items]);

  const agregar = (producto) => {
    setItems(prev => {
      const existe = prev.find(i => i.id === producto.id);
      if (existe) {
        return prev.map(i =>
          i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitar = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };
  
  const actualizarCantidad = (id, delta) => {
    setItems(prev => prev.map(i => {
      if (i.id === id) {
        const nuevaCantidad = i.cantidad + delta;
        return { ...i, cantidad: nuevaCantidad > 0 ? nuevaCantidad : 1 };
      }
      return i;
    }));
  };

  const vaciar = () => setItems([]);

  const total = items.reduce((s, i) => s + (i.precio * i.cantidad), 0);
  const cantidad = items.reduce((s, i) => s + i.cantidad, 0);

  return { items, agregar, quitar, actualizarCantidad, vaciar, total, cantidad };
}
