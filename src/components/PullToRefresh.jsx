import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

export function PullToRefresh({ onRefresh, children }) {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef(null);
  const y = useMotionValue(0);
  const controls = useAnimation();
  const startY = useRef(0);
  
  const MAX_PULL = 120;
  const THRESHOLD = 80;

  useEffect(() => {
    const handleTouchStart = (e) => {
      if (window.scrollY === 0 && !isRefreshing) {
        startY.current = e.touches[0].clientY;
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e) => {
      if (!isPulling) return;
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY.current;
      
      // Only pull down
      if (diff > 0) {
        // Add resistance
        const pulled = Math.min(diff * 0.4, MAX_PULL);
        y.set(pulled);
      }
    };

    const handleTouchEnd = async () => {
      if (!isPulling) return;
      setIsPulling(false);
      
      if (y.get() > THRESHOLD && !isRefreshing) {
        setIsRefreshing(true);
        // Snap to refresh position
        await controls.start({ y: 60, transition: { type: 'spring', stiffness: 300, damping: 20 } });
        
        if (onRefresh) {
            await onRefresh();
        } else {
            // Fake delay if no callback provided
            await new Promise(r => setTimeout(r, 1500));
        }
        
        // Reset
        setIsRefreshing(false);
        controls.start({ y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
        y.set(0);
      } else {
        // Cancel pull
        controls.start({ y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
        y.set(0);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
      container.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isPulling, isRefreshing, onRefresh, controls, y]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center">
      <motion.div 
        className="absolute top-0 left-0 right-0 flex justify-center z-40 pointer-events-none"
        style={{ y: isPulling ? y : undefined }}
        animate={controls}
      >
        <div 
          className="bg-white dark:bg-[#242526] shadow-lg rounded-full w-10 h-10 flex items-center justify-center -mt-10"
          style={{ opacity: isRefreshing ? 1 : 0.8 }}
        >
          <div className={`w-5 h-5 border-2 border-slate-300 dark:border-slate-600 border-t-[#1877F2] rounded-full ${isRefreshing ? 'animate-spin' : ''}`} 
               style={{ transform: `rotate(${y.get() * 2}deg)` }}
          />
        </div>
      </motion.div>
      {children}
    </div>
  );
}
