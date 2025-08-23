import { createClient } from "@/lib/supabase/server"

export interface AuditLogData {
  user_id?: string
  action: string
  resource_type?: string
  resource_id?: string
  old_values?: Record<string, any>
  new_values?: Record<string, any>
  ip_address?: string
  user_agent?: string
  session_id?: string
}

export class AuditLogger {
  private static async getClientInfo(request?: Request) {
    if (!request) return {}

    const ip_address = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const user_agent = request.headers.get("user-agent") || "unknown"

    return { ip_address, user_agent }
  }

  static async log(data: AuditLogData, request?: Request) {
    try {
      const supabase = await createClient()
      const clientInfo = await this.getClientInfo(request)

      const logEntry = {
        ...data,
        ...clientInfo,
        created_at: new Date().toISOString(),
      }

      // Use service role to bypass RLS for audit logging
      const { error } = await supabase.from("audit_logs").insert(logEntry)

      if (error) {
        console.error("Failed to create audit log:", error)
      }
    } catch (error) {
      console.error("Audit logging error:", error)
    }
  }

  static async logUserAction(
    userId: string,
    action: string,
    resourceType?: string,
    resourceId?: string,
    oldValues?: Record<string, any>,
    newValues?: Record<string, any>,
    request?: Request,
  ) {
    await this.log(
      {
        user_id: userId,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        old_values: oldValues,
        new_values: newValues,
      },
      request,
    )
  }

  static async logSecurityEvent(action: string, userId?: string, details?: Record<string, any>, request?: Request) {
    await this.log(
      {
        user_id: userId,
        action: `security_${action}`,
        resource_type: "security",
        new_values: details,
      },
      request,
    )
  }

  static async logAuthEvent(
    action: "login_success" | "login_failed" | "logout" | "password_reset" | "email_verification",
    userId?: string,
    email?: string,
    request?: Request,
  ) {
    await this.log(
      {
        user_id: userId,
        action: `auth_${action}`,
        resource_type: "authentication",
        new_values: { email },
      },
      request,
    )
  }
}
