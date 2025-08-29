import { useState, useEffect, useCallback } from 'react'
import { Database } from '@/lib/supabase/database.types'

type Product = Database['public']['Tables']['products']['Row']
type CartItem = Database['public']['Tables']['cart_items']['Row'] & {
  product: Product
}

interface CartData {
  cart_id: string
  items: CartItem[]
  total: number
  item_count: number
}

export function useCart() {
  const [cart, setCart] = useState<CartData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  // 카트 조회
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/cart')
      if (!response.ok) throw new Error('Failed to fetch cart')

      const data = await response.json()
      setCart(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  // 카트에 상품 추가
  const addToCart = useCallback(async (productId: string, quantity: number = 1) => {
    try {
      setIsUpdating(true)
      setError(null)

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to add to cart')
      }

      // 카트 다시 조회
      await fetchCart()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return false
    } finally {
      setIsUpdating(false)
    }
  }, [fetchCart])

  // 카트 아이템 수량 업데이트
  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    try {
      setIsUpdating(true)
      setError(null)

      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update quantity')
      }

      // 카트 다시 조회
      await fetchCart()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return false
    } finally {
      setIsUpdating(false)
    }
  }, [fetchCart])

  // 카트에서 아이템 제거
  const removeFromCart = useCallback(async (itemId: string) => {
    try {
      setIsUpdating(true)
      setError(null)

      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to remove item')
      }

      // 카트 다시 조회
      await fetchCart()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return false
    } finally {
      setIsUpdating(false)
    }
  }, [fetchCart])

  // 카트 비우기
  const clearCart = useCallback(async () => {
    try {
      setIsUpdating(true)
      setError(null)

      const response = await fetch('/api/cart', {
        method: 'DELETE'
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to clear cart')
      }

      setCart({
        cart_id: cart?.cart_id || '',
        items: [],
        total: 0,
        item_count: 0
      })
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return false
    } finally {
      setIsUpdating(false)
    }
  }, [cart])

  // 초기 로드
  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  return {
    cart,
    loading,
    error,
    isUpdating,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refresh: fetchCart
  }
}