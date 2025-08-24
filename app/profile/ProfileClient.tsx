"use client"

import { PageLayout } from "@/components/page-layout"
import { SectionContainer } from "@/components/section-container"
import { ProfileContent } from "@/components/profile-content"

export default function ProfileClient({
  user,
  profile,
  loading,
  refreshProfile,
}: {
  user: any
  profile: any
  loading: boolean
  refreshProfile: () => void
}) {
  if (loading || !user || !profile) {
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
        <ProfileContent user={user} profile={profile} refreshProfile={refreshProfile} />
      </SectionContainer>
    </PageLayout>