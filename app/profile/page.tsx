"use client"

import { PageLayout } from "@/components/page-layout"
import { SectionContainer } from "@/components/section-container"
import { ProfileContent } from "@/components/profile-content"
import { useAuth } from "@/lib/auth/auth-provider"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const { user, profile, loading, refreshProfile } = useAuth()
  const [mockUser, setMockUser] = useState(null)
  const [mockProfile, setMockProfile] = useState(null)

  useEffect(() => {
    const simulatedUser = {
      id: "mock-user-123",
      email: "john.doe@example.com",
      user_metadata: {},
    }

    const simulatedProfile = {
      id: "mock-user-123",
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

    setMockUser(simulatedUser)
    setMockProfile(simulatedProfile)
  }, [])

  if (loading || !mockUser || !mockProfile) {
    return (
      <PageLayout>
        <SectionContainer background="gray" size="lg">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </SectionContainer>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <SectionContainer background="gray" size="lg">
        <ProfileContent user={mockUser} profile={mockProfile} refreshProfile={refreshProfile} />
      </SectionContainer>
    </PageLayout>
  )
}
