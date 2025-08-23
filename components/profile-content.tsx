"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MedicalRecordsDetail } from "@/components/medical-records-detail"
import { ProfileEditModal } from "@/components/profile-edit-modal"
import { ReminderManagement } from "@/components/reminder-management"
import { useAuth } from "@/lib/auth/auth-provider"
import { Calendar, Heart, Bookmark, FileText, Shield, LogOut } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type { UserProfile } from "@/lib/types/auth"

interface ProfileContentProps {
  user: any
  profile: UserProfile
  refreshProfile?: () => Promise<void>
}

export function ProfileContent({ user, profile, refreshProfile }: ProfileContentProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "records">("overview")
  const [reminders, setReminders] = useState([
    {
      id: "1",
      title: "Take Vitamin D3",
      time: "08:00",
      completed: true,
      category: "medication" as const,
    },
    {
      id: "2",
      title: "Blood Pressure Check",
      time: "14:00",
      completed: false,
      category: "other" as const,
    },
    {
      id: "3",
      title: "Evening Walk",
      time: "18:00",
      completed: false,
      category: "exercise" as const,
    },
  ])

  const { signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content - Left Side */}
      <div className="lg:col-span-2 space-y-6">
        {/* User Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  {profile.avatar_url ? (
                    <AvatarImage src={profile.avatar_url || "/placeholder.svg"} alt={profile.display_name} />
                  ) : (
                    <AvatarFallback className="text-white text-xl font-semibold bg-green-500">
                      {profile.first_name && profile.last_name ? (
                        getInitials(profile.first_name, profile.last_name)
                      ) : (
                        <Shield className="w-8 h-8" />
                      )}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profile.display_name || `${profile.first_name} ${profile.last_name}`}
                  </h1>
                  <p className="text-gray-600">Patient ID: YEM-{user.id.slice(0, 8)}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    {profile.date_of_birth && (
                      <span>Age: {new Date().getFullYear() - new Date(profile.date_of_birth).getFullYear()}</span>
                    )}
                    {profile.medical_info?.blood_type && <span>Blood Type: {profile.medical_info.blood_type}</span>}
                    {profile.medical_info?.insurance?.provider && (
                      <span>Insurance: {profile.medical_info.insurance.provider}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={profile.email_verified ? "default" : "secondary"} className="text-xs">
                      {profile.email_verified ? "Email Verified" : "Email Pending"}
                    </Badge>
                    <Badge variant="outline" className="text-xs capitalize">
                      {profile.role}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <ProfileEditModal profile={profile} onProfileUpdate={refreshProfile} />
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="gap-2 text-red-600 hover:text-red-700 bg-transparent"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <Card>
          <CardContent className="p-0">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "overview"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("records")}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === "records"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Medical Records
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">12</div>
                  <div className="text-sm text-gray-600">Appointments</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">8.5/10</div>
                  <div className="text-sm text-gray-600">Health Score</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Bookmark className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">45</div>
                  <div className="text-sm text-gray-600">Streak Days</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">8</div>
                  <div className="text-sm text-gray-600">Reviews Written</div>
                </CardContent>
              </Card>
            </div>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-medium text-gray-900">{profile.email}</p>
                  </div>
                  {profile.phone && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone</p>
                      <p className="font-medium text-gray-900">{profile.phone}</p>
                    </div>
                  )}
                  {profile.date_of_birth && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                      <p className="font-medium text-gray-900">{formatDate(profile.date_of_birth)}</p>
                    </div>
                  )}
                  {profile.gender && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Gender</p>
                      <p className="font-medium text-gray-900 capitalize">{profile.gender.replace("_", " ")}</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Member Since</p>
                  <p className="font-medium text-gray-900">{formatDate(profile.created_at)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Medical Records */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Recent Medical Records</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Annual Physical Exam</h3>
                    <p className="text-sm text-gray-600">Dr. Sarah Johnson - Jan 10, 2024</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Blood Test Results</h3>
                    <p className="text-sm text-gray-600">City Lab - Dec 28, 2023</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Cardiology Consultation</h3>
                    <p className="text-sm text-gray-600">Dr. Michael Chen - Dec 15, 2023</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "records" && <MedicalRecordsDetail />}
      </div>

      {/* Sidebar - Right Side */}
      <div className="space-y-6">
        <ReminderManagement reminders={reminders} onRemindersUpdate={setReminders} />

        {/* Insurance Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="w-5 h-5 text-green-600" />
              Insurance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.medical_info?.insurance ? (
              <>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Provider</p>
                  <p className="font-semibold text-gray-900">
                    {profile.medical_info.insurance.provider || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Policy Number</p>
                  <p className="font-semibold text-gray-900">
                    {profile.medical_info.insurance.policy_number || "Not specified"}
                  </p>
                </div>
                {profile.medical_info.insurance.group_number && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Group Number</p>
                    <p className="font-semibold text-gray-900">{profile.medical_info.insurance.group_number}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Coverage</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-600 mb-2">No insurance information on file</p>
                <Button variant="outline" size="sm">
                  Add Insurance
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
