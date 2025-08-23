// import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import type { UserProfile } from "@/lib/types/auth"

export async function getServerAuth() {
  // const supabase = await createClient()
  // const {
  //   data: { user },
  //   error,
  // } = await supabase.auth.getUser()

  return {
    user: {
      id: "mock-user-123",
      email: "john.doe@example.com",
    },
    error: null,
  }
}

export async function requireAuth(redirectTo = "/auth/login") {
  const { user, error } = await getServerAuth()

  if (error || !user) {
    redirect(redirectTo)
  }

  return user
}

export async function getServerProfile(userId: string): Promise<UserProfile | null> {
  // const supabase = await createClient()
  // const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  // if (error) {
  //   console.error("Error fetching profile:", error)
  //   return null
  // }

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

export async function requireRole(
  requiredRole: "patient" | "doctor" | "admin" | "staff",
  redirectTo = "/unauthorized",
) {
  const user = await requireAuth()
  const profile = await getServerProfile(user.id)

  if (!profile) {
    redirect("/auth/login")
  }

  // Admin can access everything
  if (profile.role === "admin") {
    return { user, profile }
  }

  if (profile.role !== requiredRole) {
    redirect(redirectTo)
  }

  return { user, profile }
}
