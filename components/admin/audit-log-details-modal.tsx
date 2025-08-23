"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, User, Globe, Monitor, Calendar, Database } from "lucide-react"
import type { AuditLog } from "@/lib/types/auth"

interface AuditLogDetailsModalProps {
  log: AuditLog
  isOpen: boolean
  onClose: () => void
}

export function AuditLogDetailsModal({ log, isOpen, onClose }: AuditLogDetailsModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    })
  }

  const getActionBadgeColor = (action: string) => {
    if (action.startsWith("security_")) return "bg-red-100 text-red-800"
    if (action.startsWith("auth_")) return "bg-blue-100 text-blue-800"
    if (action.includes("profile")) return "bg-green-100 text-green-800"
    return "bg-gray-100 text-gray-800"
  }

  const getSeverityLevel = (action: string) => {
    if (action.includes("suspicious") || action.includes("locked")) return "High"
    if (action.includes("failed") || action.includes("security")) return "Medium"
    return "Low"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Audit Log Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Log Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className={getActionBadgeColor(log.action)}>
                    {log.action.replace(/_/g, " ")}
                  </Badge>
                  <Badge
                    variant={
                      getSeverityLevel(log.action) === "High"
                        ? "destructive"
                        : getSeverityLevel(log.action) === "Medium"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {getSeverityLevel(log.action)} Severity
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {formatDate(log.created_at)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Log ID</p>
                  <p className="text-gray-900 font-mono text-sm">{log.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Resource Type</p>
                  <p className="text-gray-900">{log.resource_type || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Resource ID</p>
                  <p className="text-gray-900 font-mono text-sm">{log.resource_id || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-green-600" />
                  User Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">User ID</p>
                  <p className="text-gray-900 font-mono text-sm">{log.user_id || "System/Anonymous"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Session ID</p>
                  <p className="text-gray-900 font-mono text-sm">{log.session_id || "N/A"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Network Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  Network Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">IP Address</p>
                  <p className="text-gray-900 font-mono text-sm">{log.ip_address || "Unknown"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">User Agent</p>
                  <p className="text-gray-900 text-sm break-all">{log.user_agent || "Unknown"}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Changes */}
          {(log.old_values || log.new_values) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {log.old_values && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-red-600" />
                      Previous Values
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-auto max-h-64">
                      {JSON.stringify(log.old_values, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}

              {log.new_values && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-green-600" />
                      New Values
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-auto max-h-64">
                      {JSON.stringify(log.new_values, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-green-600" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Action Type</p>
                  <p className="text-gray-900">{log.action}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Timestamp</p>
                  <p className="text-gray-900">{formatDate(log.created_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
