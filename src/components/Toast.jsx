import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

/**
 * Toast — shown briefly when an item is added to the cart.
 * Usage: <Toast message="Añadido al carrito" visible={bool} />
 */
export function Toast({ message, visible }) {
  const [animating, setAnimating] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      setAnimating(false);
      const t = setTimeout(() => setAnimating(true), 1800); // start exit
      const u = setTimeout(() => setShow(false), 2150);    // remove from DOM
      return () => { clearTimeout(t); clearTimeout(u); };
    }
  }, [visible]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold text-white bg-[#1877F2] dark:bg-[#1877F2] pointer-events-none select-none ${
        animating ? 'animate-toast-out' : 'animate-toast-in'
      }`}
    >
      <CheckCircle2 className="w-4 h-4 shrink-0" />
      {message}
    </div>
  );
}
