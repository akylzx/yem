import { requireRole } from "@/lib/auth/server-auth"
import { PageLayout } from "@/components/page-layout"
import { SectionContainer } from "@/components/section-container"
import { UserManagementContent } from "@/components/admin/user-management-content"

export default async function AdminUsersPage() {
  const { user, profile } = await requireRole("admin")

  return (
    <PageLayout>
      <SectionContainer background="gray" size="lg">
        <UserManagementContent />
      </SectionContainer>
    </PageLayout>
  )
}
