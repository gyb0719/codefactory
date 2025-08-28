'use client';

import { 
  Home, 
  Search, 
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
    { id: 'profile', label: '프로필', icon: User },
  ];

  return (
    <div className="ios-tab-bar fixed bottom-0 left-0 right-0 z-50 ios-safe-area-bottom">
      <div className="flex items-end justify-around px-2 pt-1 pb-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center min-w-[60px] py-1 px-2 relative group"
              style={{ transition: 'all var(--transition-fast)' }}
            >
              {/* 아이콘 컨테이너 */}
              <div className="relative mb-1">
                <tab.icon 
                  className={cn(
                    'w-6 h-6 transition-all',
                    isActive 
                      ? 'text-[var(--ios-blue)]' 
                      : 'text-[var(--text-secondary)]'
                  )}
                  style={{
                    transition: 'var(--transition-fast)'
                  }}
                />
                
                {/* 장바구니 뱃지 - iOS Style */}
                {tab.id === 'cart' && totalItems > 0 && (
                  <div 
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-white text-xs font-semibold"
                    style={{ 
                      background: 'var(--ios-red)',
                      fontSize: '11px'
                    }}
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </div>
                )}
              </div>
              
              {/* 라벨 */}
              <span 
                className={cn(
                  'text-xs font-regular transition-all',
                  isActive 
                    ? 'text-[var(--ios-blue)]' 
                    : 'text-[var(--text-secondary)]'
                )}
                style={{
                  fontSize: '10px',
                  transition: 'var(--transition-fast)'
                }}
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