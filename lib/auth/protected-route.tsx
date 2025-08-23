"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import type { UserProfile } from "@/lib/types/auth"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "patient" | "doctor" | "admin" | "staff"
  fallbackUrl?: string
}

export function ProtectedRoute({ children, requiredRole, fallbackUrl = "/auth/login" }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push(`${fallbackUrl}?redirectTo=${window.location.pathname}`)
          return
        }

        setUser(user)

        // Get user profile for role checking
        if (requiredRole) {
          const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

          if (error || !profile) {
            console.error("Error fetching profile:", error)
            router.push("/auth/login")
            return
          }

          if (profile.role !== requiredRole && requiredRole !== "patient") {
            // Allow admin to access all routes
            if (profile.role !== "admin") {
              router.push("/unauthorized")
              return
            }
          }

          setProfile(profile)
        }
      } catch (error) {
        console.error("Auth check error:", error)
        router.push(fallbackUrl)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        router.push(fallbackUrl)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, router, requiredRole, fallbackUrl])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
