export interface Clinic {
  id: string
  name: string
  description?: string
  address: string
  phone?: string
  email?: string
  website?: string
  coordinates?: [number, number] // stored as PostGIS point or float8[]
  hours?: Record<string, { open: string; close: string; closed?: boolean }>
  rating: number
  review_count: number
  specialties: string[]
  services: string[]
  images?: string[]
  price_range?: string
  next_available?: string
  featured: boolean
  achievements?: string[]
  is_active: boolean
  created_at: string
  updated_at: string
  specialists?: ClinicSpecialist[]
  reviews?: Review[]
}

export interface Specialist {
  id: string
  user_id: string
  specialty: string
  license_number?: string
  years_experience?: number
  education?: string[]
  certifications?: string[]
  languages?: string[]
  bio?: string
  consultation_fee?: number
  rating: number
  review_count: number
  availability?: Record<string, any> // JSONB
  is_accepting_patients: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  profile?: {
    first_name: string
    last_name: string
    avatar_url?: string
    phone?: string
  }
  clinics?: ClinicSpecialist[]
}

export interface ClinicSpecialist {
  clinic_id: string
  specialist_id: string
  is_primary_location: boolean
  clinic?: Clinic
  specialist?: Specialist
}

export interface Appointment {
  id: string
  patient_id: string
  specialist_id: string
  clinic_id: string
  appointment_date: string // date
  appointment_time: string // time
  duration_minutes: number
  service_type?: string
  reason: string
  notes?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
  patient_notes?: string
  specialist_notes?: string
  total_cost?: number
  insurance_covered?: number
  patient_paid?: number
  created_at: string
  updated_at: string
  specialist?: Specialist
  clinic?: Clinic
}

export interface Review {
  id: string
  patient_id: string
  specialist_id?: string
  clinic_id?: string
  appointment_id?: string
  rating: number
  title?: string
  comment?: string
  is_verified: boolean
  is_anonymous: boolean
  helpful_count: number
  created_at: string
  updated_at: string
  patient?: {
    first_name: string
    last_name: string
    avatar_url?: string
  }
}

export interface MedicalRecord {
  id: string
  patient_id: string
  specialist_id?: string
  appointment_id?: string
  record_type: 'diagnosis' | 'prescription' | 'lab_result' | 'imaging' | 'note'
  title: string
  description?: string
  diagnosis_codes?: string[]
  medications?: Record<string, any> // JSONB for drug info
  attachments?: string[]
  is_sensitive: boolean
  created_at: string
  updated_at: string
}

export interface ApiResponse<T> {
  success?: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

export interface CreateAppointmentRequest {
  specialist_id: string
  clinic_id: string
  appointment_date: string
  appointment_time: string
  service_type?: string
  reason: string
  notes?: string
}

export interface CreateReviewRequest {
  specialist_id?: string
  clinic_id?: string
  appointment_id?: string
  rating: number
  title?: string
  comment?: string
  is_anonymous?: boolean
}

export interface UpdateProfileRequest {
  first_name?: string
  last_name?: string
  phone?: string
  date_of_birth?: string
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say'
  address?: Record<string, any>
  blood_type?: string
  insurance_provider?: string
  insurance_policy_number?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  medical_conditions?: string[]
  allergies?: string[]
  medications?: string[]
}