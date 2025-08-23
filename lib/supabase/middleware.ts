import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  // Skip Supabase operations if environment variables are not available
  if (!supabaseUrl || !supabaseAnonKey) {
    console.log("[v0] Supabase environment variables not found, skipping auth middleware")
    return supabaseResponse
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
      },
    },
  })

  let user = null
  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    user = authUser
  } catch (error) {
    console.log("[v0] Error getting user from Supabase:", error)
    return supabaseResponse
  }

  // Protected routes - redirect to login if not authenticated
  const protectedPaths = ["/profile", "/admin", "/settings"]
  const authPaths = ["/auth/login", "/auth/register", "/auth/forgot-password"]

  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  const isAuthPath = authPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Redirect unauthenticated users from protected routes
  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    url.searchParams.set("redirectTo", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPath && user) {
    const url = request.nextUrl.clone()
    url.pathname = "/profile"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
