"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import type { Provider } from "@supabase/supabase-js"

export async function handleRegister(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const phone = formData.get("phone") as string
  const dateOfBirth = formData.get("dateOfBirth") as string
  const gender = formData.get("gender") as string
  const acceptTerms = formData.get("terms") === "on"
  const acceptPrivacy = formData.get("privacy") === "on"

  // Server-side validation
  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }
  if (!acceptTerms || !acceptPrivacy) {
    return { error: "Please accept the terms and privacy policy" }
  }

  // Fix: Await headers()
  const headerList = await headers()
  const origin = headerList.get("origin")
  if (!origin) {
    return { error: "Origin header not found." }
  }

  const supabase = await createClient()

  // STEP 1: Create the user in the auth.users table
  const { data: userData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${origin}/profile`,
    },
  })

  if (signUpError) {
    // Added: Handle specific Supabase errors for better UX
    let errorMessage = signUpError.message
    if (signUpError.status === 400 && errorMessage.includes("User already registered")) {
      errorMessage = "User already exists. Please log in or use a different email."
    } else if (errorMessage.includes("Database error saving new user")) {
      errorMessage = "Unable to create user due to a database issue. Please try again later or contact support."
    }
    console.error("Sign up error:", signUpError.message)
    return { error: errorMessage }
  }
  
  if (!userData.user) {
    return { error: "User not created after sign up." };
  }

  // STEP 2: Insert the profile data into the public.profiles table
  const { error: insertError } = await supabase.from("profiles").insert({
    id: userData.user.id,
    email: userData.user.email,
    full_name: `${firstName} ${lastName}`,
    phone,
    date_of_birth: dateOfBirth,
    gender,
    role: 'patient', // Assuming a default role
    onboarding_completed: false, // Assuming a default value
  })

  if (insertError) {
    console.error("Profile insertion error:", insertError.message)
    // Added: More specific error handling
    return { error: "Failed to create profile. Please try signing up again." }
  }

  redirect("/auth/verify-email")
}

export async function handleOAuthRegister(provider: Provider) {
  const supabase = await createClient()
  // Fix: Await headers()
  const headerList = await headers()
  const origin = headerList.get("referer")
  const redirectTo = `${origin}auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  })

  if (error) {
    console.error("OAuth registration error:", error.message)
    return { error: error.message }  // Added return for client-side handling
  }

  if (data.url) {
    redirect(data.url)
  }
}