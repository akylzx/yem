"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import type { Provider } from "@supabase/supabase-js"

export async function handleLogin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  
  // CORRECT: Create a server-side Supabase client to handle authentication.
  // This client has access to the server's cookies and is necessary for
  // the login function to work correctly in this environment.
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Login error:", error)
    return { error: error.message }
  }

  // Redirect to the desired page after successful login
  const redirectTo = headers().get("referer") || "/profile"
  redirect(redirectTo)
}

export async function handleOAuthLogin(provider: Provider) {
  const supabase = await createClient()
  const origin = headers().get("referer")
  const redirectTo = `${origin}auth/callback`
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  })

  if (error) {
    console.error("OAuth login error:", error)
  }
  
  if (data.url) {
    redirect(data.url)
  }
}