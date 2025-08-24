import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const upcoming = searchParams.get('upcoming') === 'true'

    let query = supabase
      .from('appointments')
      .select(`
        *,
        specialist:specialists(
          id,
          specialty,
          profile:profiles(first_name, last_name, avatar_url)
        ),
        clinic:clinics(id, name, address, phone)
      `)
      .eq('patient_id', user.id)

    if (status) {
      query = query.eq('status', status)
    }

    if (upcoming) {
      query = query
        .gte('appointment_date', new Date().toISOString().split('T')[0])
        .in('status', ['pending', 'confirmed'])
    }

    query = query.order('appointment_date', { ascending: true })

    const { data: appointments, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ appointments: appointments || [] })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['specialist_id', 'clinic_id', 'appointment_date', 'appointment_time', 'reason']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Check if time slot is available
    const { data: existingAppointment } = await supabase
      .from('appointments')
      .select('id')
      .eq('specialist_id', body.specialist_id)
      .eq('appointment_date', body.appointment_date)
      .eq('appointment_time', body.appointment_time)
      .in('status', ['pending', 'confirmed'])
      .single()

    if (existingAppointment) {
      return NextResponse.json({ error: 'Time slot not available' }, { status: 400 })
    }

    const { data: appointment, error } = await supabase
      .from('appointments')
      .insert({
        patient_id: user.id,
        specialist_id: body.specialist_id,
        clinic_id: body.clinic_id,
        appointment_date: body.appointment_date,
        appointment_time: body.appointment_time,
        service_type: body.service_type,
        reason: body.reason,
        notes: body.notes,
        status: 'pending'
      })
      .select(`
        *,
        specialist:specialists(
          specialty,
          profile:profiles(first_name, last_name)
        ),
        clinic:clinics(name, address, phone)
      `)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ appointment }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}