import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

// GET /api/products/search - 상품 검색 (자동완성 포함)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const limit = parseInt(searchParams.get('limit') || '10')
    const type = searchParams.get('type') || 'full' // 'full' | 'autocomplete'

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [], suggestions: [] })
    }

    const supabase = await createServerSupabaseClient()

    if (type === 'autocomplete') {
      // 자동완성용 간단한 검색
      const { data: products, error } = await supabase
        .from('products')
        .select('id, name, category, price, thumbnail_url')
        .eq('is_available', true)
        .or(`name.ilike.%${query}%,brand.ilike.%${query}%`)
        .limit(limit)

      if (error) {
        console.error('Search error:', error)
        return NextResponse.json(
          { error: 'Search failed' },
          { status: 500 }
        )
      }

      // 검색어 제안 생성
      const suggestions = [...new Set(
        products?.map(p => p.name.toLowerCase().includes(query.toLowerCase()) 
          ? p.name 
          : p.brand
        ).filter(Boolean)
      )].slice(0, 5)

      return NextResponse.json({
        results: products || [],
        suggestions
      })
    } else {
      // 전체 검색
      const { data: products, error, count } = await supabase
        .from('products')
        .select('*', { count: 'exact' })
        .eq('is_available', true)
        .or(`
          name.ilike.%${query}%,
          description.ilike.%${query}%,
          brand.ilike.%${query}%,
          category.ilike.%${query}%
        `)
        .order('rating', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Search error:', error)
        return NextResponse.json(
          { error: 'Search failed' },
          { status: 500 }
        )
      }

      // 검색 결과 그룹화 (카테고리별)
      const groupedResults = products?.reduce((acc, product) => {
        if (!acc[product.category]) {
          acc[product.category] = []
        }
        acc[product.category].push(product)
        return acc
      }, {} as Record<string, typeof products>)

      return NextResponse.json({
        results: products || [],
        grouped: groupedResults || {},
        total: count || 0,
        query
      })
    }
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}