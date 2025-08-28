'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SwipeCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  className?: string;
  swipeThreshold?: number;
}

const SwipeCard = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  onSwipeUp,
  className,
  swipeThreshold = 100
}: SwipeCardProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // 스와이프에 따른 회전 및 투명도 효과
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    
    // 빠른 스와이프 또는 충분한 거리 이동 시 액션 실행
    const swipeDistance = Math.abs(offset.x);
    const swipeVelocity = Math.abs(velocity.x);
    
    if (swipeDistance > swipeThreshold || swipeVelocity > 500) {
      setIsExiting(true);
      
      if (offset.x > 0) {
        // 오른쪽 스와이프
        onSwipeRight?.();
      } else {
        // 왼쪽 스와이프
        onSwipeLeft?.();
      }
    } else if (offset.y < -swipeThreshold) {
      // 위쪽 스와이프
      setIsExiting(true);
      onSwipeUp?.();
    }
  };

  return (
    <motion.div
      className={cn('relative cursor-grab active:cursor-grabbing', className)}
      style={{ x, y, rotate, opacity }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={isExiting ? { 
        x: x.get() > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.8
      } : { 
        x: 0, 
        y: 0, 
        opacity: 1,
        scale: 1
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      
      {/* 스와이프 힌트 오버레이 */}
      <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
        <motion.div
          className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium"
          style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
        >
          👈 Pass
        </motion.div>
        <motion.div
          className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium"
          style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
        >
          Like 👉
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium pointer-events-none"
        style={{ opacity: useTransform(y, [-50, 0], [1, 0]) }}
      >
        🛒 Add to Cart
      </motion.div>
    </motion.div>
  );
};

export default SwipeCard;