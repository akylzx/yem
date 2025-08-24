import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api/client'

export function useProfile() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getProfile()
      setProfile(response.profile)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: UpdateProfileRequest) => {
    try {
      const response = await apiClient.updateProfile(data)
      setProfile(response.profile)
      return response.profile
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update profile')
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return { profile, loading, error, refetch: fetchProfile, updateProfile }
}

export function useClinics(params?: Parameters<typeof apiClient.getClinics>[0]) {
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClinics = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getClinics(params)
      setClinics(response.clinics)
      setTotal(response.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch clinics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClinics()
  }, [JSON.stringify(params)])

  return { clinics, total, loading, error, refetch: fetchClinics }
}

export function useClinic(id: string) {
  const [clinic, setClinic] = useState<Clinic | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getClinic(id)
        setClinic(response.clinic)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch clinic')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchClinic()
    }
  }, [id])

  return { clinic, loading, error }
}

export function useAppointments(params?: Parameters<typeof apiClient.getAppointments>[0]) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getAppointments(params)
      setAppointments(response.appointments)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch appointments')
    } finally {
      setLoading(false)
    }
  }

  const createAppointment = async (data: CreateAppointmentRequest) => {
    try {
      const response = await apiClient.createAppointment(data)
      await fetchAppointments() // Refresh list
      return response.appointment
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create appointment')
    }
  }

  const cancelAppointment = async (id: string) => {
    try {
      await apiClient.cancelAppointment(id)
      await fetchAppointments() // Refresh list
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to cancel appointment')
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [JSON.stringify(params)])

  return { 
    appointments, 
    loading, 
    error, 
    refetch: fetchAppointments, 
    createAppointment,
    cancelAppointment
  }
}

export function useAvailability(specialistId: string, date: string, clinicId?: string) {
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!specialistId || !date) return

      try {
        setLoading(true)
        const response = await apiClient.getAvailability({
          specialistId,
          date,
          clinicId,
        })
        setAvailableSlots(response.availableSlots)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch availability')
      } finally {
        setLoading(false)
      }
    }

    fetchAvailability()
  }, [specialistId, date, clinicId])

  return { availableSlots, loading, error }
}