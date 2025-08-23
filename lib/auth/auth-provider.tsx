"use client"

import type React from "react"
// import { createClient } from "@/lib/supabase/client"
import { createContext, useContext, useEffect, useState } from "react"
// import type { User } from "@supabase/supabase-js"
import type { UserProfile } from "@/lib/types/auth"

interface MockUser {
  id: string
  email: string
  user_metadata?: any
}

interface AuthContextType {
  user: MockUser | null
  profile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  // const supabase = createClient()

  const fetchProfile = async (userId: string) => {
    // Mock profile data for demonstration
    return {
      id: userId,
      email: "john.doe@example.com",
      full_name: "John Doe",
      role: "patient" as const,
      phone: "+1 (555) 123-4567",
      date_of_birth: "1990-01-01",
      gender: "male" as const,
      blood_type: "O+",
      insurance_provider: "HealthCare Plus",
      insurance_policy_number: "HCP-2024-567890",
      emergency_contact_name: "Jane Doe",
      emergency_contact_phone: "+1 (555) 987-6543",
      address: "123 Main St, City, State 12345",
      medical_conditions: ["Hypertension"],
      allergies: ["Penicillin"],
      medications: ["Lisinopril 10mg"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id)
      setProfile(profileData)
    }
  }

  const signOut = async () => {
    setUser(null)
    setProfile(null)
  }

  useEffect(() => {
    const getInitialSession = async () => {
      setLoading(false)
    }

    getInitialSession()

    // const {
    //   data: { subscription },
    // } = supabase.auth.onAuthStateChange(async (event, session) => {
    //   if (session?.user) {
    //     setUser(session.user)
    //     const profileData = await fetchProfile(session.user.id)
    //     setProfile(profileData)
    //   } else {
    //     setUser(null)
    //     setProfile(null)
    //   }
    //   setLoading(false)
    // })

    // return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
