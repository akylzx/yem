import { requireAuth, getServerProfile } from "@/lib/auth/server-auth"
import { PageLayout } from "@/components/page-layout"
import { SectionContainer } from "@/components/section-container"
import { SettingsContent } from "@/components/settings-content"

export default async function SettingsPage() {
  const user = await requireAuth()
  const profile = await getServerProfile(user.id)

  if (!profile) {
    return (
      <PageLayout>
        <SectionContainer background="gray" size="lg">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
            <p className="text-gray-600">Please contact support if this issue persists.</p>
          </div>
        </SectionContainer>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <SectionContainer background="gray" size="lg">
        <SettingsContent user={user} profile={profile} />
      </SectionContainer>
    </PageLayout>
  )
}
