import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    
    // Extract query parameters
    const search = searchParams.get('search') || ''
    const specialty = searchParams.get('specialty')
    const service = searchParams.get('service')
    const location = searchParams.get('location')
    const sortBy = searchParams.get('sortBy') || 'rating'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('clinics')
      .select(`
        *,
        specialists:clinic_specialists(
          specialist:specialists(
            id,
            user_id,
            specialty,
            rating,
            review_count,
            profile:profiles(first_name, last_name, avatar_url)
          )
        )
      `)
      .eq('is_active', true)

    // Apply filters
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,address.ilike.%${search}%`)
    }

    if (specialty) {
      query = query.contains('specialties', [specialty])
    }

    if (service) {
      query = query.contains('services', [service])
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        query = query.order('rating', { ascending: false })
        break
      case 'reviews':
        query = query.order('review_count', { ascending: false })
        break
      case 'name':
        query = query.order('name', { ascending: true })
        break
      default:
        query = query.order('featured', { ascending: false }).order('rating', { ascending: false })
    }

    query = query.range(offset, offset + limit - 1)

    const { data: clinics, error, count } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      clinics: clinics || [], 
      total: count || 0,
      limit,
      offset 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}