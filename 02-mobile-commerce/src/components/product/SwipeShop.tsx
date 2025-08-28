'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, ShoppingBag } from 'lucide-react';
import SwipeCard from '@/components/ui/SwipeCard';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types/product';
import { sampleProducts } from '@/data/sampleProducts';
import { useCartStore } from '@/store/cartStore';

const SwipeShop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [passedProducts, setPassedProducts] = useState<Product[]>([]);
  const { addItem } = useCartStore();

  // 초기 상품 로드
  useEffect(() => {
    setProducts(sampleProducts.slice(0, 5)); // 처음 5개만 로드
  }, []);

  const handleSwipeRight = () => {
    if (currentIndex < products.length) {
      const likedProduct = products[currentIndex];
      setLikedProducts(prev => [...prev, likedProduct]);
      nextProduct();
    }
  };

  const handleSwipeLeft = () => {
    if (currentIndex < products.length) {
      const passedProduct = products[currentIndex];
      setPassedProducts(prev => [...prev, passedProduct]);
      nextProduct();
    }
  };

  const handleSwipeUp = () => {
    if (currentIndex < products.length) {
      const product = products[currentIndex];
      addItem(product);
      // 장바구니 추가 피드백
      const event = new CustomEvent('productAddedToCart', { 
        detail: { product } 
      });
      window.dispatchEvent(event);
      nextProduct();
    }
  };

  const nextProduct = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const resetCards = () => {
    setCurrentIndex(0);
    setLikedProducts([]);
    setPassedProducts([]);
    // 새로운 상품들로 셔플
    const shuffled = [...sampleProducts].sort(() => Math.random() - 0.5);
    setProducts(shuffled.slice(0, 5));
  };

  const currentProduct = products[currentIndex];
  const hasMoreProducts = currentIndex < products.length;

  return (
    <div className="relative h-full flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          <div>
            <h2 className="text-lg font-bold">스와이프 쇼핑</h2>
            <p className="text-sm opacity-90">마음에 드는 상품을 찾아보세요!</p>
          </div>
        </div>
        <button
          onClick={resetCards}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* 진행상황 바 */}
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300"
          style={{ width: `${(currentIndex / products.length) * 100}%` }}
        />
      </div>

      {/* 스와이프 카드 영역 */}
      <div className="flex-1 relative p-4 overflow-hidden">
        <AnimatePresence>
          {hasMoreProducts && currentProduct && (
            <motion.div
              key={currentProduct.id}
              className="absolute inset-4"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <SwipeCard
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                onSwipeUp={handleSwipeUp}
                className="h-full"
              >
                <ProductCard 
                  product={currentProduct} 
                  variant="swipe"
                  className="h-full"
                />
              </SwipeCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 완료 화면 */}
        {!hasMoreProducts && (
          <motion.div
            className="absolute inset-4 flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-full p-8 mb-6">
              <ShoppingBag className="w-16 h-16 text-orange-500 mx-auto" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              쇼핑 완료! 🎉
            </h3>
            <p className="text-gray-600 mb-6">
              모든 상품을 확인했습니다
            </p>

            {/* 결과 요약 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-sm mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-500">
                    {likedProducts.length}
                  </div>
                  <div className="text-sm text-gray-600">좋아요</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">
                    {passedProducts.length}
                  </div>
                  <div className="text-sm text-gray-600">패스</div>
                </div>
              </div>
            </div>

            <button
              onClick={resetCards}
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-shadow"
            >
              다시 쇼핑하기
            </button>
          </motion.div>
        )}
      </div>

      {/* 하단 가이드 */}
      {hasMoreProducts && (
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-400 rounded-full"></span>
              <span>← 패스</span>
            </div>
            <div className="flex items-center gap-2">
              <span>↑ 장바구니</span>
              <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
            </div>
            <div className="flex items-center gap-2">
              <span>좋아요 →</span>
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwipeShop;