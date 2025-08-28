'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Search, 
  Heart, 
  ShoppingCart, 
  User,
  Sparkles 
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { totalItems } = useCartStore();

  const tabs = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'search', label: '검색', icon: Search },
    { id: 'swipe', label: '스와이프', icon: Sparkles },
    { id: 'cart', label: '장바구니', icon: ShoppingCart },
    { id: 'profile', label: '내정보', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb z-50">
      <div className="flex items-center justify-around px-2 py-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center p-3 min-w-[4rem]"
            >
              {/* 활성 상태 배경 */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              
              {/* 아이콘 */}
              <div className="relative">
                <tab.icon 
                  className={cn(
                    'w-6 h-6 transition-colors duration-200',
                    isActive 
                      ? 'text-orange-600' 
                      : 'text-gray-400'
                  )}
                />
                
                {/* 장바구니 뱃지 */}
                {tab.id === 'cart' && totalItems > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </motion.div>
                )}
              </div>
              
              {/* 라벨 */}
              <span 
                className={cn(
                  'text-xs mt-1 font-medium transition-colors duration-200',
                  isActive 
                    ? 'text-orange-600' 
                    : 'text-gray-400'
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;