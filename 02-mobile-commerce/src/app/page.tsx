'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Bell, 
  MapPin,
  Star,
  Clock,
  Zap,
  Grid3X3,
  List
} from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import ProductCard from '@/components/product/ProductCard';
import SwipeShop from '@/components/product/SwipeShop';
import { categories, sampleProducts, popularProducts, dailyDeals } from '@/data/sampleProducts';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types/product';
import PaymentModal from '@/components/payment/PaymentModal';
import DeliveryTracker from '@/components/delivery/DeliveryTracker';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [hasActiveOrder, setHasActiveOrder] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string>('');
  const { totalItems, totalPrice } = useCartStore();

  // 필터된 상품들
  const filteredProducts = sampleProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent />;
      case 'search':
        return <SearchContent />;
      case 'swipe':
        return <SwipeShop />;
      case 'cart':
        return <CartContent />;
      case 'profile':
        return <ProfileContent />;
      default:
        return <HomeContent />;
    }
  };

  // 홈 컨텐츠
  const HomeContent = () => (
    <div className="pb-20 min-h-screen">
      {/* iOS 스타일 헤더 */}
      <div className="ios-nav-bar ios-safe-area-top px-4">
        <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
          {/* 로고 & 타이틀 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: 'var(--ios-blue)' }}>
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="ios-title-2 text-[var(--text-primary)]">퀵마트</h1>
            </div>
          </div>
          
          {/* 우측 액션 버튼들 */}
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ transition: 'var(--transition-fast)' }}>
              <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ transition: 'var(--transition-fast)' }}>
              <MapPin className="w-5 h-5 text-[var(--text-secondary)]" />
            </button>
          </div>
        </div>
      </div>

      {/* 검색창 */}
      <div className="px-4 py-3">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <Search className="w-5 h-5 text-[var(--text-secondary)]" />
          </div>
          <input
            type="text"
            placeholder="30분 내 배송 가능한 상품 검색"
            className="ios-input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* iOS 스타일 카테고리 섹션 */}
      <div className="px-4 mb-6">
        <div className="ios-card p-4">
          <h2 className="ios-headline mb-4 text-[var(--text-primary)]">카테고리</h2>
          <div className="grid grid-cols-5 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                  selectedCategory === category.name
                    ? 'bg-[var(--ios-blue)] shadow-md'
                    : 'bg-[var(--background-secondary)]'
                }`}
                style={{ transition: 'var(--transition-fast)' }}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className={`text-xs font-medium ${
                  selectedCategory === category.name
                    ? 'text-white'
                    : 'text-[var(--text-secondary)]'
                }`}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 프리미엄 배송 추적 */}
      {hasActiveOrder && (
        <div className="px-4 mb-8">
          <div className="glass rounded-3xl p-1">
            <DeliveryTracker orderId={currentOrderId} />
          </div>
        </div>
      )}

      {/* iOS 스타일 배송 프로모션 배너 */}
      {!hasActiveOrder && (
        <div className="px-4 mb-6">
          <div className="ios-card p-4" style={{ backgroundColor: 'var(--ios-green)', color: 'white' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="ios-headline text-white mb-1">지금 주문하면</h3>
                <p className="ios-subhead text-white/80">오후 3시 30분까지 무료 배송!</p>
              </div>
              <div className="text-right">
                <div className="ios-title-2 text-white font-bold">FREE</div>
                <div className="ios-caption text-white/70">배송비</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* iOS 스타일 인기 상품 */}
      <div className="px-4 mb-6">
        <div className="ios-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="ios-headline text-[var(--text-primary)]">인기 상품</h2>
              <p className="ios-subhead">실시간 베스트셀러</p>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mr-4 pr-4">
            {popularProducts.map((product) => (
              <div 
                key={product.id} 
                className="flex-shrink-0 w-56"
              >
                <div className="bg-[var(--background-secondary)] rounded-xl overflow-hidden">
                  <ProductCard 
                    product={product} 
                    variant="grid"
                    className="h-full border-0 shadow-none bg-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* iOS 스타일 오늘의 특가 */}
      <div className="px-4 mb-6">
        <div className="ios-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="ios-headline text-[var(--text-primary)]">오늘의 특가</h2>
              <p className="ios-subhead">한정 수량 - 놓치면 안 돼요!</p>
            </div>
            <div className="text-right">
              <div className="bg-[var(--ios-red)] px-3 py-2 rounded-lg">
                <div className="ios-caption text-white">남은 시간</div>
                <div className="ios-subhead text-white font-semibold">
                  2:45
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {dailyDeals.slice(0, 4).map((product) => (
              <div key={product.id}>
                <div className="bg-[var(--background-secondary)] rounded-xl overflow-hidden">
                  <ProductCard 
                    product={product} 
                    variant="grid"
                    className="border-0 shadow-none bg-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 검색 컨텐츠
  const SearchContent = () => (
    <div className="flex flex-col h-full">
      {/* 검색 헤더 */}
      <div className="p-4 bg-white border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="상품 검색..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
        
        {/* 뷰 모드 토글 */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-600">
            {filteredProducts.length}개 상품
          </span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="flex-1 p-4 pb-20 overflow-y-auto">
        <div className={`gap-4 ${
          viewMode === 'grid' ? 'grid grid-cols-2' : 'flex flex-col'
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product} 
              variant={viewMode === 'grid' ? 'grid' : 'list'}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // 장바구니 컨텐츠
  const CartContent = () => {
    const { items, removeItem, updateQuantity, clearCart } = useCartStore();

    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            장바구니가 비었습니다
          </h3>
          <p className="text-gray-600 mb-6">
            마음에 드는 상품을 담아보세요!
          </p>
          <button
            onClick={() => setActiveTab('home')}
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold"
          >
            쇼핑하러 가기
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        {/* 헤더 */}
        <div className="p-4 bg-white border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">장바구니</h2>
            <button 
              onClick={clearCart}
              className="text-red-600 text-sm font-medium"
            >
              전체 삭제
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {totalItems}개 상품 • {formatPrice(totalPrice)}
          </p>
        </div>

        {/* 상품 목록 */}
        <div className="flex-1 overflow-y-auto p-4 pb-32">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 p-4 bg-white rounded-2xl shadow-sm mb-3">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                  {item.product.name}
                </h3>
                <p className="text-orange-600 font-bold">
                  {formatPrice(item.product.price)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-semibold min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 p-2"
              >
                삭제
              </button>
            </div>
          ))}
        </div>

        {/* 주문 요약 */}
        <div className="p-4 bg-white border-t">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>상품 금액</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>배송비</span>
              <span className="text-green-600">무료</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>총 결제금액</span>
              <span className="text-orange-600">{formatPrice(totalPrice)}</span>
            </div>
          </div>
          <button 
            onClick={() => setIsPaymentModalOpen(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-shadow"
          >
            {formatPrice(totalPrice)} 주문하기
          </button>
        </div>
      </div>
    );
  };

  // 프로필 컨텐츠
  const ProfileContent = () => (
    <div className="p-6 pb-20">
      <h2 className="text-2xl font-bold mb-6">내 정보</h2>
      <div className="text-center text-gray-500">
        프로필 기능 구현 예정
      </div>
    </div>
  );

  return (
    <div className="h-screen relative overflow-hidden bg-[var(--background-grouped)]">
      <div className="h-full overflow-y-auto">
        {renderContent()}
      </div>

      {/* 프리미엄 하단 네비게이션 */}
      <div className="absolute bottom-0 left-0 right-0 z-50">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      {/* 결제 모달 */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={totalPrice}
        onPaymentSuccess={() => {
          useCartStore.getState().clearCart();
          setHasActiveOrder(true);
          setCurrentOrderId(`QM${Date.now()}`);
          setActiveTab('home');
        }}
      />
    </div>
  );
}
