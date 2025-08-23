"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth/auth-provider"
import { Settings, Shield, Bell, Eye, Smartphone, Mail } from "lucide-react"
import { useState } from "react"
import type { UserProfile } from "@/lib/types/auth"
import { ChangePasswordModal } from "@/components/change-password-modal"

interface SettingsContentProps {
  user: any
  profile: UserProfile
}

export function SettingsContent({ user, profile }: SettingsContentProps) {
  const { signOut } = useAuth()
  const [notifications, setNotifications] = useState({
    email: profile.preferences?.notifications?.email ?? true,
    sms: profile.preferences?.notifications?.sms ?? false,
    push: profile.preferences?.notifications?.push ?? true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: profile.preferences?.privacy?.profile_visibility ?? "private",
    dataSharing: profile.preferences?.privacy?.data_sharing ?? false,
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Settings className="w-8 h-8 text-green-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600">Manage your account preferences and security settings</p>
        </div>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input id="email" value={profile.email} disabled className="bg-gray-50" />
                <Badge variant={profile.email_verified ? "default" : "secondary"} className="shrink-0">
                  {profile.email_verified ? "Verified" : "Pending"}
                </Badge>
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input id="phone" value={profile.phone || ""} placeholder="Add phone number" />
                <Badge variant={profile.phone_verified ? "default" : "secondary"} className="shrink-0">
                  {profile.phone_verified ? "Verified" : "Unverified"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={profile.first_name} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={profile.last_name} className="mt-1" />
            </div>
          </div>
          <Button className="bg-green-500 hover:bg-green-600">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={profile.two_factor_enabled ? "default" : "secondary"}>
                {profile.two_factor_enabled ? "Enabled" : "Disabled"}
              </Badge>
              <Button variant="outline" size="sm">
                {profile.two_factor_enabled ? "Disable" : "Enable"}
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Change Password</h3>
              <p className="text-sm text-gray-600">Update your account password</p>
            </div>
            <ChangePasswordModal />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Active Sessions</h3>
              <p className="text-sm text-gray-600">Manage your active login sessions</p>
            </div>
            <Button variant="outline" size="sm">
              View Sessions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-green-600" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <h3 className="font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-gray-500" />
              <div>
                <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                <p className="text-sm text-gray-600">Receive updates via text message</p>
              </div>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-500" />
              <div>
                <h3 className="font-medium text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-600">Receive browser notifications</p>
              </div>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-green-600" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Profile Visibility</h3>
              <p className="text-sm text-gray-600">Control who can see your profile information</p>
            </div>
            <Badge variant="outline" className="capitalize">
              {privacy.profileVisibility}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Data Sharing</h3>
              <p className="text-sm text-gray-600">Allow anonymous data sharing for research</p>
            </div>
            <Switch
              checked={privacy.dataSharing}
              onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, dataSharing: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-900">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-red-900">Delete Account</h3>
              <p className="text-sm text-red-600">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
