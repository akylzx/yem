import { createClient } from "@/lib/supabase/server"
import { AuditLogger } from "@/lib/audit/audit-logger"

export class SecurityMonitor {
  private static readonly MAX_FAILED_ATTEMPTS = 5
  private static readonly LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes
  private static readonly SUSPICIOUS_ACTIVITY_THRESHOLD = 10

  static async checkFailedLoginAttempts(email: string, ipAddress: string): Promise<boolean> {
    try {
      const supabase = await createClient()
      const fifteenMinutesAgo = new Date(Date.now() - this.LOCKOUT_DURATION).toISOString()

      // Check failed attempts by email
      const { data: emailAttempts } = await supabase
        .from("audit_logs")
        .select("*")
        .eq("action", "auth_login_failed")
        .eq("new_values->>email", email)
        .gte("created_at", fifteenMinutesAgo)

      // Check failed attempts by IP
      const { data: ipAttempts } = await supabase
        .from("audit_logs")
        .select("*")
        .eq("action", "auth_login_failed")
        .eq("ip_address", ipAddress)
        .gte("created_at", fifteenMinutesAgo)

      const emailFailures = emailAttempts?.length || 0
      const ipFailures = ipAttempts?.length || 0

      if (emailFailures >= this.MAX_FAILED_ATTEMPTS || ipFailures >= this.MAX_FAILED_ATTEMPTS) {
        await AuditLogger.logSecurityEvent("account_locked", undefined, {
          email,
          ip_address: ipAddress,
          failed_attempts: Math.max(emailFailures, ipFailures),
        })
        return true
      }

      return false
    } catch (error) {
      console.error("Error checking failed login attempts:", error)
      return false
    }
  }

  static async detectSuspiciousActivity(userId: string): Promise<boolean> {
    try {
      const supabase = await createClient()
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

      // Check for unusual activity patterns
      const { data: recentActivity } = await supabase
        .from("audit_logs")
        .select("*")
        .eq("user_id", userId)
        .gte("created_at", oneHourAgo)

      if (!recentActivity) return false

      // Check for multiple IP addresses
      const uniqueIPs = new Set(recentActivity.map((log) => log.ip_address))
      if (uniqueIPs.size > 3) {
        await AuditLogger.logSecurityEvent("suspicious_multiple_ips", userId, {
          unique_ips: Array.from(uniqueIPs),
          activity_count: recentActivity.length,
        })
        return true
      }

      // Check for high activity volume
      if (recentActivity.length > this.SUSPICIOUS_ACTIVITY_THRESHOLD) {
        await AuditLogger.logSecurityEvent("suspicious_high_activity", userId, {
          activity_count: recentActivity.length,
          time_window: "1_hour",
        })
        return true
      }

      return false
    } catch (error) {
      console.error("Error detecting suspicious activity:", error)
      return false
    }
  }

  static async trackUserSession(userId: string, sessionData: any, request?: Request) {
    try {
      const supabase = await createClient()
      const clientInfo = request
        ? {
            ip_address: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
            user_agent: request.headers.get("user-agent"),
          }
        : {}

      // Create or update session record
      const sessionRecord = {
        user_id: userId,
        session_token: sessionData.access_token?.substring(0, 20) + "...", // Truncated for security
        device_info: this.parseUserAgent(clientInfo.user_agent || ""),
        ip_address: clientInfo.ip_address,
        is_active: true,
        last_activity: new Date().toISOString(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      }

      await supabase.from("user_sessions").upsert(sessionRecord)

      await AuditLogger.logAuthEvent("login_success", userId, undefined, request)
    } catch (error) {
      console.error("Error tracking user session:", error)
    }
  }

  private static parseUserAgent(userAgent: string) {
    // Simple user agent parsing - in production, use a proper library
    const browser = userAgent.includes("Chrome")
      ? "Chrome"
      : userAgent.includes("Firefox")
        ? "Firefox"
        : userAgent.includes("Safari")
          ? "Safari"
          : "Unknown"

    const os = userAgent.includes("Windows")
      ? "Windows"
      : userAgent.includes("Mac")
        ? "macOS"
        : userAgent.includes("Linux")
          ? "Linux"
          : userAgent.includes("Android")
            ? "Android"
            : userAgent.includes("iOS")
              ? "iOS"
              : "Unknown"

    return { browser, os, full: userAgent }
  }

  static async getSecurityMetrics() {
    try {
      const supabase = await createClient()
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

      // Get recent security events
      const { data: securityEvents } = await supabase
        .from("audit_logs")
        .select("*")
        .like("action", "security_%")
        .gte("created_at", twentyFourHoursAgo)

      // Get failed login attempts
      const { data: failedLogins } = await supabase
        .from("audit_logs")
        .select("*")
        .eq("action", "auth_login_failed")
        .gte("created_at", twentyFourHoursAgo)

      // Get active sessions
      const { data: activeSessions } = await supabase
        .from("user_sessions")
        .select("*")
        .eq("is_active", true)
        .gte("expires_at", new Date().toISOString())

      return {
        securityEvents: securityEvents?.length || 0,
        failedLogins: failedLogins?.length || 0,
        activeSessions: activeSessions?.length || 0,
        recentEvents: securityEvents || [],
      }
    } catch (error) {
      console.error("Error getting security metrics:", error)
      return {
        securityEvents: 0,
        failedLogins: 0,
        activeSessions: 0,
        recentEvents: [],
      }
    }
  }
}
