/* eslint-disable react-hooks/set-state-in-effect */
import { CheckCircle } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

export function Toast({ message, visible }) {
  const [animating, setAnimating] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      setAnimating(false);
      const t = setTimeout(() => setAnimating(true), 1800);
      const u = setTimeout(() => setShow(false), 2150);
      return () => { clearTimeout(t); clearTimeout(u); };
    }
  }, [visible]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-[120] flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl backdrop-blur-xl text-sm font-bold text-white bg-white/10 border border-white/20 ${
        animating ? 'animate-toast-out' : 'animate-toast-in'
      }`}
    >
      {/* Gradient accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl gradient-primary" />
      <CheckCircle className="w-4 h-4 shrink-0 text-white" weight="fill" />
      {message}
    </div>
  );
}
