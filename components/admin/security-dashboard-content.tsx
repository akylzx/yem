"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { AuditLogDetailsModal } from "@/components/admin/audit-log-details-modal"
import { Shield, AlertTriangle, Activity, Users, Search, Eye, Calendar, MapPin } from "lucide-react"
import type { AuditLog } from "@/lib/types/auth"

interface SecurityMetrics {
  securityEvents: number
  failedLogins: number
  activeSessions: number
  totalUsers: number
}

export function SecurityDashboardContent() {
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    securityEvents: 0,
    failedLogins: 0,
    activeSessions: 0,
    totalUsers: 0,
  })
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  const [showLogDetails, setShowLogDetails] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchSecurityData()
  }, [])

  useEffect(() => {
    filterLogs()
  }, [auditLogs, searchTerm, actionFilter])

  const fetchSecurityData = async () => {
    try {
      // Fetch security metrics
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

      const [securityEventsResult, failedLoginsResult, activeSessionsResult, totalUsersResult, auditLogsResult] =
        await Promise.all([
          supabase
            .from("audit_logs")
            .select("*", { count: "exact" })
            .like("action", "security_%")
            .gte("created_at", twentyFourHoursAgo),
          supabase
            .from("audit_logs")
            .select("*", { count: "exact" })
            .eq("action", "auth_login_failed")
            .gte("created_at", twentyFourHoursAgo),
          supabase
            .from("user_sessions")
            .select("*", { count: "exact" })
            .eq("is_active", true)
            .gte("expires_at", new Date().toISOString()),
          supabase.from("profiles").select("*", { count: "exact" }),
          supabase.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(100),
        ])

      setMetrics({
        securityEvents: securityEventsResult.count || 0,
        failedLogins: failedLoginsResult.count || 0,
        activeSessions: activeSessionsResult.count || 0,
        totalUsers: totalUsersResult.count || 0,
      })

      setAuditLogs(auditLogsResult.data || [])
    } catch (error) {
      console.error("Error fetching security data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterLogs = () => {
    let filtered = auditLogs

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.resource_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.ip_address?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Action filter
    if (actionFilter !== "all") {
      if (actionFilter === "security") {
        filtered = filtered.filter((log) => log.action.startsWith("security_"))
      } else if (actionFilter === "auth") {
        filtered = filtered.filter((log) => log.action.startsWith("auth_"))
      } else if (actionFilter === "profile") {
        filtered = filtered.filter((log) => log.action.includes("profile"))
      }
    }

    setFilteredLogs(filtered)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getActionBadgeColor = (action: string) => {
    if (action.startsWith("security_")) return "bg-red-100 text-red-800"
    if (action.startsWith("auth_")) return "bg-blue-100 text-blue-800"
    if (action.includes("profile")) return "bg-green-100 text-green-800"
    return "bg-gray-100 text-gray-800"
  }

  const getActionIcon = (action: string) => {
    if (action.startsWith("security_")) return <AlertTriangle className="w-4 h-4" />
    if (action.startsWith("auth_")) return <Shield className="w-4 h-4" />
    if (action.includes("profile")) return <Users className="w-4 h-4" />
    return <Activity className="w-4 h-4" />
  }

  const getSeverityLevel = (action: string) => {
    if (action.includes("suspicious") || action.includes("locked")) return "High"
    if (action.includes("failed") || action.includes("security")) return "Medium"
    return "Low"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor security events, audit logs, and system activity</p>
        </div>
        <Button onClick={fetchSecurityData} className="bg-green-500 hover:bg-green-600">
          Refresh Data
        </Button>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Security Events (24h)</p>
                <p className="text-2xl font-bold text-red-600">{metrics.securityEvents}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Logins (24h)</p>
                <p className="text-2xl font-bold text-yellow-600">{metrics.failedLogins}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                <p className="text-2xl font-bold text-green-600">{metrics.activeSessions}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">{metrics.totalUsers}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search audit logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="security">Security Events</SelectItem>
                <SelectItem value="auth">Authentication</SelectItem>
                <SelectItem value="profile">Profile Changes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Audit Logs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {formatDate(log.created_at)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActionIcon(log.action)}
                      <Badge variant="secondary" className={getActionBadgeColor(log.action)}>
                        {log.action.replace(/_/g, " ")}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {log.user_id ? `User ${log.user_id.slice(0, 8)}...` : "System"}
                  </TableCell>
                  <TableCell className="text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {log.ip_address || "Unknown"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        getSeverityLevel(log.action) === "High"
                          ? "destructive"
                          : getSeverityLevel(log.action) === "Medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {getSeverityLevel(log.action)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedLog(log)
                        setShowLogDetails(true)
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Audit Log Details Modal */}
      {selectedLog && (
        <AuditLogDetailsModal
          log={selectedLog}
          isOpen={showLogDetails}
          onClose={() => {
            setShowLogDetails(false)
            setSelectedLog(null)
          }}
        />
      )}
    </div>
  )
}
