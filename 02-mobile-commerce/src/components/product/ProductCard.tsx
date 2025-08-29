'use client';

import { useState } from 'react';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Truck,
} from 'lucide-react';
import { Database } from '@/lib/supabase/database.types';
import { formatPrice, formatDeliveryTime } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

type Product = Database['public']['Tables']['products']['Row'];

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
  const { addToCart, cart } = useCart();
  
  const quantity = cart?.items.find(item => item.product.id === product.id)?.quantity || 0;
  
  const handleAddToCart = async () => {
    await addToCart(product.id);
    onAddToCart?.(product);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(product);
  };

  if (variant === 'list') {
    return (
      <div className={cn("ios-card p-4 mb-3", className)}>
        <div className="flex items-center gap-4">
          {/* 상품 이미지 */}
          <div className="w-16 h-16 rounded-lg bg-[var(--background-secondary)] flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-[var(--text-tertiary)]" />
          </div>
          
          {/* 상품 정보 */}
          <div className="flex-1 min-w-0">
            <h3 className="ios-callout font-medium text-[var(--text-primary)] truncate">
              {product.name}
            </h3>
            <p className="ios-caption text-[var(--text-secondary)] mt-1">
              {product.category}
            </p>
            
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-[var(--ios-yellow)] text-[var(--ios-yellow)]" />
                <span className="ios-caption text-[var(--text-secondary)]">
                  {(product.rating || 0).toFixed(1)}
                </span>
              </div>
              <span className="ios-caption text-[var(--text-tertiary)]">•</span>
              <div className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-[var(--text-tertiary)]" />
                <span className="ios-caption text-[var(--text-tertiary)]">
                  {formatDeliveryTime(product.delivery_time || '30분 내')}
                </span>
              </div>
            </div>
          </div>
          
          {/* 가격 및 액션 */}
          <div className="text-right">
            <div className="ios-callout font-semibold text-[var(--text-primary)]">
              {formatPrice(product.price)}
            </div>
            {product.original_price && product.original_price > product.price && (
              <div className="ios-caption text-[var(--text-tertiary)] line-through">
                {formatPrice(product.original_price)}
              </div>
            )}
            <button 
              onClick={handleAddToCart}
              className="ios-button-primary mt-2 px-3 py-1 text-sm"
            >
              담기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid 버전 (기본)
  return (
    <div className={cn("ios-card p-4 relative", className)}>
      {/* 찜하기 버튼 */}
      <button 
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center"
        style={{ transition: 'var(--transition-fast)' }}
      >
        <Heart 
          className={cn(
            "w-4 h-4 transition-all",
            isFavorite 
              ? "text-[var(--ios-red)] fill-current" 
              : "text-[var(--text-secondary)]"
          )}
          style={{ transition: 'var(--transition-fast)' }}
        />
      </button>

      {/* 상품 이미지 */}
      <div className="aspect-square rounded-lg bg-[var(--background-secondary)] mb-3 flex items-center justify-center">
        <ShoppingCart className="w-12 h-12 text-[var(--text-tertiary)]" />
      </div>

      {/* 브랜드 */}
      {product.brand && (
        <div className="ios-caption text-[var(--text-secondary)] mb-1">
          {product.brand}
        </div>
      )}

      {/* 상품명 */}
      <h3 className="ios-subhead font-medium text-[var(--text-primary)] line-clamp-2 mb-2">
        {product.name}
      </h3>

      {/* 평점 & 리뷰 */}
      <div className="flex items-center gap-1 mb-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              className={cn(
                "w-3 h-3",
                i < Math.floor(product.rating || 0) 
                  ? "text-[var(--ios-yellow)] fill-current" 
                  : "text-[var(--ios-gray4)]"
              )}
            />
          ))}
        </div>
        <span className="ios-caption text-[var(--text-secondary)] ml-1">
          {(product.rating || 0).toFixed(1)} ({product.reviews_count || 0})
        </span>
      </div>

      {/* 가격 */}
      <div className="mb-3">
        <div className="flex items-end gap-2">
          <span className="ios-callout font-semibold text-[var(--text-primary)]">
            {formatPrice(product.price)}
          </span>
          {product.original_price && product.original_price > product.price && (
            <span className="ios-caption text-[var(--text-tertiary)] line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>
        
        {/* 할인율 */}
        {product.original_price && product.original_price > product.price && (
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-block px-2 py-1 bg-[var(--ios-red)] text-white rounded text-xs font-semibold">
              {Math.round((1 - product.price / product.original_price) * 100)}% OFF
            </span>
          </div>
        )}
      </div>

      {/* 배송 정보 */}
      <div className="flex items-center gap-1 mb-3">
        <Truck className="w-3 h-3 text-[var(--text-secondary)]" />
        <span className="ios-caption text-[var(--text-secondary)]">
          {formatDeliveryTime(product.delivery_time || '30분 내')}
        </span>
        {product.delivery_time && parseInt(product.delivery_time) <= 30 && (
          <span className="ios-caption text-[var(--ios-green)] font-medium ml-1">
            무료배송
          </span>
        )}
      </div>

      {/* 장바구니 버튼 */}
      <button 
        onClick={handleAddToCart}
        className="ios-button-primary w-full flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" />
        <span>장바구니 담기</span>
        {quantity > 0 && (
          <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
            {quantity}
          </span>
        )}
      </button>
    </div>
  );
};

export default ProductCard;