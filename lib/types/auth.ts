export interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  display_name: string
  avatar_url?: string
  phone?: string
  date_of_birth?: string
  gender?: "male" | "female" | "other" | "prefer_not_to_say"
  address?: {
    street?: string
    city?: string
    state?: string
    zip?: string
    country?: string
  }
  emergency_contact?: {
    name?: string
    phone?: string
    relationship?: string
  }
  medical_info?: {
    blood_type?: string
    allergies?: string[]
    medications?: string[]
    conditions?: string[]
    insurance?: {
      provider?: string
      policy_number?: string
      group_number?: string
    }
  }
  preferences?: {
    notifications?: {
      email?: boolean
      sms?: boolean
      push?: boolean
    }
    privacy?: {
      profile_visibility?: "public" | "private"
      data_sharing?: boolean
    }
  }
  role: "patient" | "doctor" | "admin" | "staff"
  is_active: boolean
  email_verified: boolean
  phone_verified: boolean
  two_factor_enabled: boolean
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
