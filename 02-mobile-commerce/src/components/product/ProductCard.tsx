'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Clock, 
  Truck,
  Zap,
  Plus,
  Minus
} from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice, formatDeliveryTime, formatDiscount } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  variant?: 'swipe' | 'grid' | 'list';
  className?: string;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
}

const ProductCard = ({ 
  product, 
  variant = 'grid',
  className,
  onAddToCart,
  onToggleFavorite 
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addItem, getItemQuantity } = useCartStore();
  
  const quantity = getItemQuantity(product.id);
  
  const handleAddToCart = () => {
    addItem(product);
    onAddToCart?.(product);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(product);
  };

  const isSwipeVariant = variant === 'swipe';
  const isListVariant = variant === 'list';

  return (
    <motion.div
      className={cn(
        'bg-white rounded-3xl shadow-lg overflow-hidden',
        isSwipeVariant && 'w-full max-w-sm mx-auto h-[600px]',
        isListVariant && 'flex',
        !isSwipeVariant && !isListVariant && 'h-full',
        className
      )}
      whileHover={{ y: isSwipeVariant ? 0 : -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* 이미지 섹션 */}
      <div className={cn(
        'relative overflow-hidden',
        isSwipeVariant && 'h-80',
        isListVariant && 'w-32 h-32',
        !isSwipeVariant && !isListVariant && 'h-48'
      )}>
        {/* 플레이스홀더 이미지 */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
          <ShoppingCart className="w-12 h-12 text-gray-400" />
        </div>
        
        {/* 할인 배지 */}
        {product.discount && (
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{product.discount}%
            </div>
          </div>
        )}

        {/* 빠른 배송 배지 */}
        {product.deliveryTime <= 30 && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Zap className="w-3 h-3" />
              빠른배송
            </div>
          </div>
        )}

        {/* 찜하기 버튼 */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md z-10"
        >
          <Heart 
            className={cn(
              'w-4 h-4 transition-colors',
              isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
            )}
          />
        </button>
      </div>

      {/* 컨텐츠 섹션 */}
      <div className={cn(
        'p-4 flex-1',
        isSwipeVariant && 'flex flex-col justify-between'
      )}>
        <div className="space-y-2">
          {/* 브랜드 */}
          <p className="text-xs text-gray-500 font-medium uppercase">
            {product.brand}
          </p>

          {/* 상품명 */}
          <h3 className={cn(
            'font-bold text-gray-900 line-clamp-2',
            isSwipeVariant ? 'text-xl' : 'text-sm'
          )}>
            {product.name}
          </h3>

          {/* 설명 */}
          {isSwipeVariant && (
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* 평점 및 리뷰 */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* 특징 태그 */}
          {isSwipeVariant && (
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 가격 및 액션 */}
        <div className="space-y-3 mt-4">
          {/* 가격 */}
          <div className="flex items-end gap-2">
            <span className={cn(
              'font-bold text-orange-600',
              isSwipeVariant ? 'text-2xl' : 'text-lg'
            )}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* 배송 정보 */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Truck className="w-4 h-4" />
            <span>{formatDeliveryTime(product.deliveryTime)}</span>
            {product.deliveryFee === 0 ? (
              <span className="text-green-600 font-medium">무료배송</span>
            ) : (
              <span>배송비 {formatPrice(product.deliveryFee)}</span>
            )}
          </div>

          {/* 장바구니 버튼 */}
          {quantity > 0 ? (
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => useCartStore.getState().updateQuantity(
                  useCartStore.getState().items.find(item => item.product.id === product.id)?.id || '',
                  quantity - 1
                )}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-lg min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                onClick={handleAddToCart}
                className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className={cn(
                'w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl font-semibold transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2',
                isSwipeVariant ? 'py-4 text-lg' : 'py-3'
              )}
            >
              <ShoppingCart className="w-5 h-5" />
              장바구니 담기
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;