"use client"

import type React from "react"

import { useAuth } from "@/lib/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: ("patient" | "doctor" | "admin" | "staff")[]
  fallbackUrl?: string
}

export function RoleGuard({ children, allowedRoles, fallbackUrl = "/unauthorized" }: RoleGuardProps) {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || !profile)) {
      router.push("/auth/login")
      return
    }

    if (!loading && profile && !allowedRoles.includes(profile.role)) {
      // Admin can access everything
      if (profile.role !== "admin") {
        router.push(fallbackUrl)
        return
      }
    }
  }, [user, profile, loading, allowedRoles, fallbackUrl, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  if (!allowedRoles.includes(profile.role) && profile.role !== "admin") {
    return null
  }

  return <>{children}</>
}
