import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

// PATCH /api/cart/items/[id] - 카트 아이템 수량 수정
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { quantity } = body

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { error: 'Invalid quantity' },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()
    
    // 카트 아이템 조회
    const { data: cartItem } = await supabase
      .from('cart_items')
      .select('*, product:products(stock_quantity)')
      .eq('id', params.id)
      .single()

    if (!cartItem) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      )
    }

    // 재고 확인
    if (quantity > cartItem.product.stock_quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      )
    }

    // 수량 업데이트
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', params.id)
      .select(`
        *,
        product:products (*)
      `)
      .single()

    if (error) {
      console.error('Cart item update error:', error)
      return NextResponse.json(
        { error: 'Failed to update cart item' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/cart/items/[id] - 카트에서 아이템 제거
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerSupabaseClient()
    
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Cart item deletion error:', error)
      return NextResponse.json(
        { error: 'Failed to remove item from cart' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Item removed from cart'
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}