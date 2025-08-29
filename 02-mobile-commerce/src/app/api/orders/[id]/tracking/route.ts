import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

// GET /api/orders/[id]/tracking - 주문 배송 추적 조회
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

    // 주문 소유자 확인
    const { data: order } = await supabase
      .from('orders')
      .select('user_id, status, delivery_person_id')
      .eq('id', params.id)
      .single()

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    if (order.user_id !== user.id && order.delivery_person_id !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to view this tracking' },
        { status: 403 }
      )
    }

    // 배송 추적 정보 조회
    const { data: tracking, error } = await supabase
      .from('delivery_tracking')
      .select('*')
      .eq('order_id', params.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Tracking fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch tracking information' },
        { status: 500 }
      )
    }

    // 현재 상태 및 예상 시간 계산
    const latestTracking = tracking?.[0]
    const currentStatus = latestTracking?.status || 'pending'
    const estimatedTime = latestTracking?.estimated_time || null
    
    // 배송 진행률 계산
    const statusProgress = {
      'order_placed': 20,
      'order_confirmed': 30,
      'preparing': 50,
      'out_for_delivery': 80,
      'delivered': 100,
      'cancelled': 0
    }
    const progress = statusProgress[currentStatus as keyof typeof statusProgress] || 0

    return NextResponse.json({
      order_id: params.id,
      current_status: currentStatus,
      progress,
      estimated_time: estimatedTime,
      tracking_history: tracking || [],
      delivery_person: order.delivery_person_id ? {
        id: order.delivery_person_id,
        // 실제로는 배송원 정보를 조회해야 함
        name: '배송원',
        phone: '010-1234-5678'
      } : null
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/orders/[id]/tracking - 배송 추적 업데이트 (배송원용)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, location, notes } = body

    const supabase = await createServerSupabaseClient()
    
    // 사용자 인증 확인
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 배송원 권한 확인 (실제로는 더 정교한 권한 확인 필요)
    const { data: userInfo } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userInfo?.role !== 'delivery' && userInfo?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only delivery personnel can update tracking' },
        { status: 403 }
      )
    }

    // 배송 추적 정보 추가
    const { data: tracking, error } = await supabase
      .from('delivery_tracking')
      .insert([{
        order_id: params.id,
        status,
        location,
        notes,
        actual_time: status === 'delivered' ? new Date().toISOString() : null
      }])
      .select()
      .single()

    if (error) {
      console.error('Tracking update error:', error)
      return NextResponse.json(
        { error: 'Failed to update tracking' },
        { status: 500 }
      )
    }

    // 주문 상태도 함께 업데이트
    const orderStatus = {
      'out_for_delivery': 'delivering',
      'delivered': 'delivered'
    }[status]

    if (orderStatus) {
      await supabase
        .from('orders')
        .update({ status: orderStatus })
        .eq('id', params.id)
    }

    return NextResponse.json({
      message: 'Tracking updated successfully',
      tracking
    }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}