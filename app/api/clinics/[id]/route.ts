import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { id } = params

    const { data: clinic, error } = await supabase
      .from('clinics')
      .select(`
        *,
        specialists:clinic_specialists(
          specialist:specialists(
            id,
            user_id,
            specialty,
            license_number,
            years_experience,
            bio,
            consultation_fee,
            rating,
            review_count,
            availability,
            is_accepting_patients,
            profile:profiles(first_name, last_name, avatar_url, phone)
          )
        ),
        reviews:reviews(
          id,
          rating,
          title,
          comment,
          is_verified,
          created_at,
          patient:profiles(first_name, last_name, avatar_url)
        )
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!clinic) {
      return NextResponse.json({ error: 'Clinic not found' }, { status: 404 })
    }

    return NextResponse.json({ clinic })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}