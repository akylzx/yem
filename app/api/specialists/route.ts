import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    
    const specialty = searchParams.get('specialty')
    const clinicId = searchParams.get('clinicId')
    const available = searchParams.get('available') === 'true'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('specialists')
      .select(`
        *,
        profile:profiles(first_name, last_name, avatar_url, phone),
        clinics:clinic_specialists(
          clinic:clinics(id, name, address, phone)
        )
      `)
      .eq('is_active', true)

    if (specialty) {
      query = query.eq('specialty', specialty)
    }

    if (clinicId) {
      query = query.eq('clinic_specialists.clinic_id', clinicId)
    }

    if (available) {
      query = query.eq('is_accepting_patients', true)
    }

    query = query
      .order('rating', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data: specialists, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ specialists: specialists || [] })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}