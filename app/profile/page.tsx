import { createClient } from "@/lib/supabase/server"
import ProfileClient from "./ProfileClient"

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: profile, error } = await supabase.from("profiles").select("*").single()

  if (error) {
    return <div className="p-8 text-red-600">Failed to load profile: {error.message}</div>
  }

  return <ProfileClient profile={profile} />
}

