import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

// GET /api/orders/[id] - 개별 주문 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerSupabaseClient()
    
    // 사용자 인증 확인
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          quantity,
          unit_price,
          total_price,
          product:products (
            id,
            name,
            description,
            image_url,
            thumbnail_url,
            category
          )
        ),
        delivery_tracking (
          id,
          status,
          location,
          estimated_time,
          actual_time,
          notes,
          created_at
        )
      `)
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        )
      }
      console.error('Order fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch order' },
        { status: 500 }
      )
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/orders/[id] - 주문 상태 업데이트 (관리자용)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, payment_status } = body

    const supabase = await createServerSupabaseClient()
    
    // 사용자 인증 확인
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 주문 소유자 확인 (또는 관리자 권한 확인)
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('user_id, status')
      .eq('id', params.id)
      .single()

    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // 일반 사용자는 'cancelled' 상태로만 변경 가능
    if (existingOrder.user_id === user.id && status && status !== 'cancelled') {
      return NextResponse.json(
        { error: 'You can only cancel your order' },
        { status: 403 }
      )
    }

    // 이미 배송 중이거나 완료된 주문은 취소 불가
    if (status === 'cancelled' && 
        ['delivering', 'delivered', 'cancelled'].includes(existingOrder.status)) {
      return NextResponse.json(
        { error: 'Cannot cancel order in current status' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (status) updateData.status = status
    if (payment_status) updateData.payment_status = payment_status

    const { data: order, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Order update error:', error)
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      )
    }

    // 상태 변경 시 배송 추적 업데이트
    if (status) {
      const trackingStatus = {
        'confirmed': 'order_confirmed',
        'preparing': 'preparing',
        'delivering': 'out_for_delivery',
        'delivered': 'delivered',
        'cancelled': 'cancelled'
      }[status]

      if (trackingStatus) {
        await supabase
          .from('delivery_tracking')
          .insert([{
            order_id: params.id,
            status: trackingStatus,
            notes: `Order status updated to ${status}`
          }])
      }
    }

    // 취소된 주문의 경우 재고 복구
    if (status === 'cancelled') {
      const { data: orderItems } = await supabase
        .from('order_items')
        .select('product_id, quantity')
        .eq('order_id', params.id)

      if (orderItems) {
        for (const item of orderItems) {
          const { data: product } = await supabase
            .from('products')
            .select('stock_quantity')
            .eq('id', item.product_id)
            .single()

          if (product) {
            await supabase
              .from('products')
              .update({ 
                stock_quantity: product.stock_quantity + item.quantity 
              })
              .eq('id', item.product_id)
          }
        }
      }
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/orders/[id] - 주문 취소
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // PATCH 메서드로 status를 'cancelled'로 변경하는 것과 동일
  return PATCH(request, { params })
}