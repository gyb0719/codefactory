import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

// GET /api/orders - 주문 목록 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const supabase = await createServerSupabaseClient()
    
    // 사용자 인증 확인
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    let query = supabase
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
            image_url,
            thumbnail_url
          )
        )
      `, { count: 'exact' })
      .eq('user_id', user.id)

    if (status) {
      query = query.eq('status', status)
    }

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data: orders, error, count } = await query

    if (error) {
      console.error('Orders fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      orders: orders || [],
      total: count || 0,
      limit,
      offset,
      hasMore: (count || 0) > offset + limit
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/orders - 주문 생성 (장바구니에서 주문으로 전환)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      delivery_address,
      payment_method,
      delivery_time,
      notes
    } = body

    const supabase = await createServerSupabaseClient()
    
    // 사용자 인증 확인
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 장바구니 조회
    const { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      )
    }

    // 장바구니 아이템 조회
    const { data: cartItems } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products (
          id,
          name,
          price,
          stock_quantity,
          is_available
        )
      `)
      .eq('cart_id', cart.id)

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // 재고 및 가용성 확인
    for (const item of cartItems) {
      if (!item.product.is_available) {
        return NextResponse.json(
          { error: `Product ${item.product.name} is not available` },
          { status: 400 }
        )
      }
      if (item.quantity > item.product.stock_quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${item.product.name}` },
          { status: 400 }
        )
      }
    }

    // 총액 계산
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity)
    }, 0)
    const deliveryFee = 3000 // 고정 배송비
    const totalAmount = subtotal + deliveryFee

    // 트랜잭션 시작 (주문 생성, 주문 아이템 생성, 재고 감소, 장바구니 비우기)
    // 주문 생성
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: user.id,
        status: 'pending',
        total_amount: totalAmount,
        delivery_fee: deliveryFee,
        payment_method,
        payment_status: 'pending',
        delivery_address,
        delivery_time,
        notes
      }])
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      )
    }

    // 주문 아이템 생성
    const orderItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      unit_price: item.product.price,
      total_price: item.product.price * item.quantity
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Order items creation error:', itemsError)
      // 주문 롤백 (실제로는 트랜잭션이 필요)
      await supabase.from('orders').delete().eq('id', order.id)
      return NextResponse.json(
        { error: 'Failed to create order items' },
        { status: 500 }
      )
    }

    // 재고 감소 (각 상품별로)
    for (const item of cartItems) {
      const newStock = item.product.stock_quantity - item.quantity
      await supabase
        .from('products')
        .update({ stock_quantity: newStock })
        .eq('id', item.product.id)
    }

    // 장바구니 비우기
    await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id)

    // 배송 추적 초기 상태 생성
    await supabase
      .from('delivery_tracking')
      .insert([{
        order_id: order.id,
        status: 'order_placed',
        estimated_time: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30분 후
      }])

    return NextResponse.json({
      message: 'Order created successfully',
      order: {
        ...order,
        order_items: orderItems
      }
    }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}