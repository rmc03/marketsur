/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react';
import { useAnimation, useMotionValue, useMotionValueEvent } from 'framer-motion';

export function PullToRefresh({ onRefresh, children }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const y = useMotionValue(0);
  const controls = useAnimation();
  
  const MAX_PULL = 120;
  const THRESHOLD = 80;

  // Update spinner position based on pull gesture
  useMotionValueEvent(y, "change", (latest) => {
    if (!isRefreshing) {
      controls.set({ y: latest - 100 });
    }
  });

  return (
    <div className="relative w-full h-full">
      {/* Invisible drag layer at the top to catch gestures natively via Framer Motion */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-32 z-[100] touch-none"
        drag="y"
        dragConstraints={{ top: 0, bottom: MAX_PULL }}
        dragElastic={0.4}
        dragDirectionLock
        onDrag={(e, info) => {
          if (window.scrollY === 0 && !isRefreshing) {
            y.set(info.offset.y);
          }
        }}
        onDragEnd={async (e, info) => {
          if (isRefreshing || window.scrollY > 0) return;
          
          if (info.offset.y > THRESHOLD) {
            setIsRefreshing(true);
            // Snap to refresh target position
            await controls.start({ y: 80, transition: { type: 'spring', stiffness: 300, damping: 20 } });
            
            try {
              if (onRefresh) {
                // Execute the refresh
                await onRefresh();
              } else {
                await new Promise(r => setTimeout(r, 1500));
              }
            } catch (error) {
              console.error("PullToRefresh error:", error);
            }
            
            // Guaranteed Unmount animation
            setIsRefreshing(false);
            await controls.start({ y: -100, transition: { type: 'spring', stiffness: 300, damping: 20 } });
            y.set(0);
          } else {
            // Cancel and spring back up out of view
            controls.start({ y: -100, transition: { type: 'spring', stiffness: 300, damping: 20 } });
            y.set(0);
          }
        }}
      />

      {/* The Visual Spinner entirely detached from page flow */}
      <motion.div 
        className="fixed top-0 left-0 right-0 flex justify-center z-[115] pointer-events-none"
        initial={{ y: -100 }}
        animate={controls}
      >
        <div 
          className="bg-white dark:bg-[#242526] shadow-xl ring-1 ring-slate-200/50 dark:ring-[#3E4042]/50 rounded-full w-10 h-10 flex items-center justify-center mt-4"
          style={{ opacity: isRefreshing ? 1 : 0.8 }}
        >
          <div className={`w-5 h-5 border-2 border-slate-300 dark:border-slate-600 border-t-[#1877F2] rounded-full ${isRefreshing ? 'animate-spin' : ''}`} 
               style={{ transform: `rotate(${y.get() * 2}deg)` }}
          />
        </div>
      </motion.div>

      {/* App Content */}
      <div className="w-full h-full relative z-0">
        {children}
      </div>
    </div>
  );
}
