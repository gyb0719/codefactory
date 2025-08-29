import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

// GET /api/products - 상품 목록 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const sort = searchParams.get('sort') || 'created_at'
    const order = searchParams.get('order') || 'desc'

    const supabase = await createServerSupabaseClient()
    
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('is_available', true)

    // 카테고리 필터
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    // 추천 상품 필터
    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }

    // 검색어 필터
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,brand.ilike.%${search}%`)
    }

    // 정렬
    const validSortFields = ['created_at', 'price', 'rating', 'name']
    const sortField = validSortFields.includes(sort) ? sort : 'created_at'
    query = query.order(sortField, { ascending: order === 'asc' })

    // 페이지네이션
    query = query.range(offset, offset + limit - 1)

    const { data: products, error, count } = await query

    if (error) {
      console.error('Products fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      products: products || [],
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

// POST /api/products - 상품 생성 (관리자용)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = await createServerSupabaseClient()

    // 인증 확인 (실제로는 관리자 권한 확인 필요)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: product, error } = await supabase
      .from('products')
      .insert([body])
      .select()
      .single()

    if (error) {
      console.error('Product creation error:', error)
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      )
    }

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}