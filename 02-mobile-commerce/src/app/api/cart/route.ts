import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

// 카트 생성 또는 가져오기
async function getOrCreateCart(supabase: any, userId?: string) {
  const cookieStore = await cookies()
  let sessionId = cookieStore.get('cart_session_id')?.value

  // 세션 ID가 없으면 생성
  if (!sessionId && !userId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    cookieStore.set('cart_session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30일
    })
  }

  // 기존 카트 찾기
  let cart
  if (userId) {
    const { data } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', userId)
      .single()
    cart = data
  } else if (sessionId) {
    const { data } = await supabase
      .from('carts')
      .select('*')
      .eq('session_id', sessionId)
      .single()
    cart = data
  }

  // 카트가 없으면 생성
  if (!cart) {
    const { data, error } = await supabase
      .from('carts')
      .insert([{
        user_id: userId || null,
        session_id: sessionId || null
      }])
      .select()
      .single()
    
    if (error) throw error
    cart = data
  }

  return cart
}

// GET /api/cart - 장바구니 조회
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    // 사용자 인증 확인
    const { data: { user } } = await supabase.auth.getUser()
    const cart = await getOrCreateCart(supabase, user?.id)

    if (!cart) {
      return NextResponse.json({ items: [], total: 0 })
    }

    // 카트 아이템 조회
    const { data: items, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products (
          id,
          name,
          description,
          price,
          original_price,
          discount_percentage,
          image_url,
          thumbnail_url,
          stock_quantity,
          is_available
        )
      `)
      .eq('cart_id', cart.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Cart items fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch cart items' },
        { status: 500 }
      )
    }

    // 총액 계산
    const total = items?.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity)
    }, 0) || 0

    return NextResponse.json({
      cart_id: cart.id,
      items: items || [],
      total,
      item_count: items?.reduce((sum, item) => sum + item.quantity, 0) || 0
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/cart - 장바구니에 상품 추가
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product_id, quantity = 1 } = body

    if (!product_id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    const cart = await getOrCreateCart(supabase, user?.id)

    // 상품 재고 확인
    const { data: product } = await supabase
      .from('products')
      .select('stock_quantity, is_available')
      .eq('id', product_id)
      .single()

    if (!product?.is_available) {
      return NextResponse.json(
        { error: 'Product is not available' },
        { status: 400 }
      )
    }

    // 기존 카트 아이템 확인
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', cart.id)
      .eq('product_id', product_id)
      .single()

    let cartItem
    if (existingItem) {
      // 수량 업데이트
      const newQuantity = existingItem.quantity + quantity
      
      if (newQuantity > product.stock_quantity) {
        return NextResponse.json(
          { error: 'Insufficient stock' },
          { status: 400 }
        )
      }

      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', existingItem.id)
        .select(`
          *,
          product:products (*)
        `)
        .single()
      
      if (error) throw error
      cartItem = data
    } else {
      // 새 아이템 추가
      if (quantity > product.stock_quantity) {
        return NextResponse.json(
          { error: 'Insufficient stock' },
          { status: 400 }
        )
      }

      const { data, error } = await supabase
        .from('cart_items')
        .insert([{
          cart_id: cart.id,
          product_id,
          quantity
        }])
        .select(`
          *,
          product:products (*)
        `)
        .single()
      
      if (error) throw error
      cartItem = data
    }

    return NextResponse.json({
      message: 'Product added to cart',
      item: cartItem
    }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/cart - 장바구니 비우기
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    const cart = await getOrCreateCart(supabase, user?.id)

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id)

    if (error) {
      console.error('Cart clear error:', error)
      return NextResponse.json(
        { error: 'Failed to clear cart' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Cart cleared successfully'
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}