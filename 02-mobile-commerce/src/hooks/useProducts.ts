import { useState, useEffect, useCallback } from 'react'
import { Database } from '@/lib/supabase/database.types'

type Product = Database['public']['Tables']['products']['Row']

interface UseProductsOptions {
  category?: string
  featured?: boolean
  search?: string
  limit?: number
}

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => Promise<void>
  refresh: () => Promise<void>
  total: number
}

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)

  const { category, featured, search, limit = 20 } = options

  const fetchProducts = useCallback(async (isLoadMore = false) => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: isLoadMore ? offset.toString() : '0'
      })

      if (category) params.append('category', category)
      if (featured) params.append('featured', 'true')
      if (search) params.append('search', search)

      const response = await fetch(`/api/products?${params}`)
      if (!response.ok) throw new Error('Failed to fetch products')

      const data = await response.json()
      
      if (isLoadMore) {
        setProducts(prev => [...prev, ...data.products])
      } else {
        setProducts(data.products)
      }
      
      setTotal(data.total)
      setHasMore(data.hasMore)
      setOffset(isLoadMore ? offset + limit : limit)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [category, featured, search, limit, offset])

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return
    await fetchProducts(true)
  }, [hasMore, loading, fetchProducts])

  const refresh = useCallback(async () => {
    setOffset(0)
    await fetchProducts(false)
  }, [fetchProducts])

  useEffect(() => {
    fetchProducts(false)
  }, [category, featured, search]) // fetchProducts를 의존성에서 제외

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    total
  }
}

// 개별 상품 조회 훅
export function useProduct(productId: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!productId) return

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/products/${productId}`)
        if (!response.ok) throw new Error('Failed to fetch product')

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  return { product, loading, error }
}