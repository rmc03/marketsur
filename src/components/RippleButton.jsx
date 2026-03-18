/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function RippleButton({ children, onClick, className = '', ...props }) {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    let timeout;
    if (ripples.length > 0) {
      timeout = setTimeout(() => {
        setRipples([]);
      }, 600);
    }
    return () => clearTimeout(timeout);
  }, [ripples]);

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = { x, y, size, key: Date.now() };
    setRipples([...ripples, newRipple]);
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={addRipple}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.key}
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute rounded-full bg-white/40 pointer-events-none"
            style={{
              width: ripple.size,
              height: ripple.size,
              left: ripple.x,
              top: ripple.y,
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}
