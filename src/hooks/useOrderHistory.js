import { useState } from 'react';

const STORAGE_KEY = 'marketsur-orders';

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function useOrderHistory() {
  const [orders, setOrders] = useState(loadOrders);

  const saveOrder = (items, total) => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: items.map(i => ({ ...i })),
      total,
    };
    const updated = [newOrder, ...loadOrders()].slice(0, 50); // keep last 50
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setOrders(updated);
    return newOrder;
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setOrders([]);
  };

  return { orders, saveOrder, clearHistory };
}
