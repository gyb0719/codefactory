import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/database.types'

type Order = Database['public']['Tables']['orders']['Row']
type DeliveryTracking = Database['public']['Tables']['delivery_tracking']['Row']

interface RealtimeOrderUpdate {
  order: Order
  tracking: DeliveryTracking[]
}

export function useRealtimeOrder(orderId: string) {
  const [order, setOrder] = useState<Order | null>(null)
  const [tracking, setTracking] = useState<DeliveryTracking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!orderId) return

    const supabase = createClient()
    
    // 초기 데이터 로드
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        
        // 주문 정보 조회
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single()
          
        if (orderError) throw orderError
        setOrder(orderData)
        
        // 배송 추적 정보 조회
        const { data: trackingData, error: trackingError } = await supabase
          .from('delivery_tracking')
          .select('*')
          .eq('order_id', orderId)
          .order('created_at', { ascending: false })
          
        if (trackingError) throw trackingError
        setTracking(trackingData || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load order')
      } finally {
        setLoading(false)
      }
    }
    
    fetchInitialData()
    
    // 실시간 구독 설정 - 주문 상태 변경
    const orderChannel = supabase
      .channel(`order-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`
        },
        (payload) => {
          console.log('Order updated:', payload)
          setOrder(payload.new as Order)
        }
      )
      .subscribe()
    
    // 실시간 구독 설정 - 배송 추적 업데이트
    const trackingChannel = supabase
      .channel(`tracking-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'delivery_tracking',
          filter: `order_id=eq.${orderId}`
        },
        (payload) => {
          console.log('New tracking update:', payload)
          setTracking(prev => [payload.new as DeliveryTracking, ...prev])
        }
      )
      .subscribe()
    
    // 클린업
    return () => {
      supabase.removeChannel(orderChannel)
      supabase.removeChannel(trackingChannel)
    }
  }, [orderId])

  return {
    order,
    tracking,
    loading,
    error,
    currentStatus: tracking[0]?.status || order?.status || 'pending',
    estimatedTime: tracking[0]?.estimated_time || null
  }
}

// 재고 실시간 업데이트 훅
export function useRealtimeStock(productId: string) {
  const [stock, setStock] = useState<number | null>(null)
  const [isAvailable, setIsAvailable] = useState(true)

  useEffect(() => {
    if (!productId) return

    const supabase = createClient()
    
    // 초기 재고 조회
    const fetchStock = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('stock_quantity, is_available')
        .eq('id', productId)
        .single()
        
      if (!error && data) {
        setStock(data.stock_quantity)
        setIsAvailable(data.is_available)
      }
    }
    
    fetchStock()
    
    // 실시간 재고 업데이트 구독
    const channel = supabase
      .channel(`stock-${productId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'products',
          filter: `id=eq.${productId}`
        },
        (payload) => {
          const newData = payload.new as Database['public']['Tables']['products']['Row']
          setStock(newData.stock_quantity)
          setIsAvailable(newData.is_available)
        }
      )
      .subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [productId])

  return { stock, isAvailable }
}

// 실시간 주문 목록 (관리자용)
export function useRealtimeOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    
    // 초기 주문 목록 로드
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
        
      if (!error && data) {
        setOrders(data)
      }
      setLoading(false)
    }
    
    fetchOrders()
    
    // 실시간 새 주문 알림
    const channel = supabase
      .channel('orders-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          console.log('New order received:', payload)
          setOrders(prev => [payload.new as Order, ...prev])
          
          // 새 주문 알림 이벤트 발생
          window.dispatchEvent(new CustomEvent('newOrder', {
            detail: payload.new
          }))
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          setOrders(prev => prev.map(order => 
            order.id === (payload.new as Order).id 
              ? payload.new as Order 
              : order
          ))
        }
      )
      .subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { orders, loading }
}