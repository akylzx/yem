import { requireRole } from "@/lib/auth/server-auth"
import { PageLayout } from "@/components/page-layout"
import { SectionContainer } from "@/components/section-container"
import { SecurityDashboardContent } from "@/components/admin/security-dashboard-content"

export default async function AdminSecurityPage() {
  const { user, profile } = await requireRole("admin")

  return (
    <PageLayout>
      <SectionContainer background="gray" size="lg">
        <SecurityDashboardContent />
      </SectionContainer>
    </PageLayout>
  )
}
