import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    
    const specialistId = searchParams.get('specialistId')
    const date = searchParams.get('date')
    const clinicId = searchParams.get('clinicId')

    if (!specialistId || !date) {
      return NextResponse.json({ error: 'specialistId and date are required' }, { status: 400 })
    }

    // Get existing appointments for the date
    const { data: existingAppointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('appointment_time')
      .eq('specialist_id', specialistId)
      .eq('appointment_date', date)
      .in('status', ['pending', 'confirmed'])

    if (appointmentsError) {
      return NextResponse.json({ error: appointmentsError.message }, { status: 500 })
    }

    // Get specialist's availability for the day
    const { data: specialist, error: specialistError } = await supabase
      .from('specialists')
      .select('availability')
      .eq('id', specialistId)
      .single()

    if (specialistError) {
      return NextResponse.json({ error: specialistError.message }, { status: 500 })
    }

    // Generate available time slots (this is a simplified version)
    const bookedTimes = existingAppointments?.map(apt => apt.appointment_time) || []
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'lowercase' })
    
    // Default time slots (you can make this more sophisticated)
    const defaultSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ]

    const availableSlots = defaultSlots.filter(slot => !bookedTimes.includes(slot))

    return NextResponse.json({ availableSlots })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}