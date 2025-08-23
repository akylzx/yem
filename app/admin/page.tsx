import { requireRole } from "@/lib/auth/server-auth"
import { PageLayout } from "@/components/page-layout"
import { SectionContainer } from "@/components/section-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Activity, Shield, AlertTriangle } from "lucide-react"

export default async function AdminPage() {
  const { user, profile } = await requireRole("admin")

  return (
    <PageLayout>
      <SectionContainer background="gray" size="lg">
        <div className="space-y-6">
          {/* Admin Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage users, monitor system health, and oversee platform operations</p>
            </div>
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              <Shield className="w-4 h-4 mr-1" />
              Admin Access
            </Badge>
          </div>

          {/* Admin Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                    <p className="text-2xl font-bold text-gray-900">456</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Security Alerts</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">System Health</p>
                    <p className="text-2xl font-bold text-green-600">98%</p>
                  </div>
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
                  <p className="text-sm text-gray-600">View, edit, and manage user accounts</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-semibold text-gray-900 mb-2">Audit Logs</h3>
                  <p className="text-sm text-gray-600">Review system activity and security events</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-semibold text-gray-900 mb-2">System Settings</h3>
                  <p className="text-sm text-gray-600">Configure platform settings and preferences</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">New user registration</p>
                    <p className="text-sm text-gray-600">john.doe@example.com - 2 minutes ago</p>
                  </div>
                  <Badge variant="outline">User</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Failed login attempt</p>
                    <p className="text-sm text-gray-600">IP: 192.168.1.100 - 5 minutes ago</p>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Security
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Profile updated</p>
                    <p className="text-sm text-gray-600">jane.smith@example.com - 10 minutes ago</p>
                  </div>
                  <Badge variant="outline">Profile</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionContainer>
    </PageLayout>
  )
}
