import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '@/types/product';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product: Product, quantity = 1) => {
        const existingItemIndex = get().items.findIndex(
          item => item.product.id === product.id
        );

        set(state => {
          let newItems: CartItem[];
          
          if (existingItemIndex >= 0) {
            // 기존 아이템이 있으면 수량 증가
            newItems = state.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            // 새 아이템 추가
            const newItem: CartItem = {
              id: `cart-${product.id}-${Date.now()}`,
              product,
              quantity,
              addedAt: new Date()
            };
            newItems = [...state.items, newItem];
          }

          const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

          return {
            items: newItems,
            totalItems,
            totalPrice
          };
        });
      },

      removeItem: (itemId: string) => {
        set(state => {
          const newItems = state.items.filter(item => item.id !== itemId);
          const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

          return {
            items: newItems,
            totalItems,
            totalPrice
          };
        });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set(state => {
          const newItems = state.items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          );
          
          const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

          return {
            items: newItems,
            totalItems,
            totalPrice
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0
        });
      },

      getItemQuantity: (productId: string) => {
        const item = get().items.find(item => item.product.id === productId);
        return item ? item.quantity : 0;
      }
    }),
    {
      name: 'quickmart-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);