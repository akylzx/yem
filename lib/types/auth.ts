export interface UserProfile {
  id: string
  email: string
  full_name: string
  role: "patient" | "doctor" | "admin" | "staff"
  phone?: string
  date_of_birth?: string
  gender?: "male" | "female" | "other" | "prefer_not_to_say"
  blood_type?: string
  medical_condition?: string
  allergies?: string[]
  medications?: string[]
  insurance_provider?: string
  insurance_policy_number?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  address?: string
  city?: string
  state?: string
  postal_code?: string
  country?: string
  preferred_language?: string
  notification_preferences?: string // or a JSON object if you store preferences as JSON
  favorite_clinics?: string[]       // or string if you store as comma-separated
  avatar_url?: string
  onboarding_completed: boolean
  last_login?: string
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  user_id?: string
  action: string
  resource_type?: string
  resource_id?: string
  old_values?: Record<string, any>
  new_values?: Record<string, any>
  ip_address?: string
  user_agent?: string
  session_id?: string
  created_at: string
}

export interface UserSession {
  id: string
  user_id: string
  session_token: string
  device_info?: {
    browser?: string
    os?: string
    device?: string
  }
  ip_address?: string
  location?: {
    city?: string
    country?: string
    timezone?: string
  }
  is_active: boolean
  last_activity: string
  expires_at: string
  created_at: string
}
