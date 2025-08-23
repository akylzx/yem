"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, Shield, Heart } from "lucide-react"
import type { UserProfile } from "@/lib/types/auth"

interface UserDetailsModalProps {
  user: UserProfile
  isOpen: boolean
  onClose: () => void
}

export function UserDetailsModal({ user, isOpen, onClose }: UserDetailsModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-green-600" />
            User Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  {user.avatar_url ? (
                    <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.display_name} />
                  ) : (
                    <AvatarFallback className="bg-green-100 text-green-700 text-xl">
                      {user.first_name && user.last_name ? getInitials(user.first_name, user.last_name) : "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.display_name || `${user.first_name} ${user.last_name}`}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={user.is_active ? "default" : "secondary"}>
                      {user.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {user.role}
                    </Badge>
                    {user.email_verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Email Verified
                      </Badge>
                    )}
                    {user.phone_verified && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Phone Verified
                      </Badge>
                    )}
                    {user.two_factor_enabled && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        2FA Enabled
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-green-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">First Name</p>
                    <p className="text-gray-900">{user.first_name || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Name</p>
                    <p className="text-gray-900">{user.last_name || "Not provided"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Display Name</p>
                  <p className="text-gray-900">{user.display_name || "Not provided"}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                    <p className="text-gray-900">
                      {user.date_of_birth ? formatDate(user.date_of_birth) : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Gender</p>
                    <p className="text-gray-900 capitalize">
                      {user.gender ? user.gender.replace("_", " ") : "Not provided"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">{user.phone || "Not provided"}</p>
                </div>
                {user.address && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <div className="text-gray-900">
                      {user.address.street && <p>{user.address.street}</p>}
                      {(user.address.city || user.address.state || user.address.zip) && (
                        <p>
                          {user.address.city}
                          {user.address.city && user.address.state && ", "}
                          {user.address.state} {user.address.zip}
                        </p>
                      )}
                      {user.address.country && <p>{user.address.country}</p>}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            {user.emergency_contact && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-gray-900">{user.emergency_contact.name || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-gray-900">{user.emergency_contact.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Relationship</p>
                    <p className="text-gray-900">{user.emergency_contact.relationship || "Not provided"}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Medical Information */}
            {user.medical_info && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-green-600" />
                    Medical Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Blood Type</p>
                    <p className="text-gray-900">{user.medical_info.blood_type || "Not provided"}</p>
                  </div>
                  {user.medical_info.allergies && user.medical_info.allergies.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Allergies</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.medical_info.allergies.map((allergy, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {user.medical_info.medications && user.medical_info.medications.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Current Medications</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.medical_info.medications.map((medication, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {medication}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {user.medical_info.conditions && user.medical_info.conditions.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Medical Conditions</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.medical_info.conditions.map((condition, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {user.medical_info.insurance && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Insurance</p>
                      <div className="text-gray-900">
                        <p>{user.medical_info.insurance.provider || "Not provided"}</p>
                        {user.medical_info.insurance.policy_number && (
                          <p className="text-sm text-gray-600">Policy: {user.medical_info.insurance.policy_number}</p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">User ID</p>
                  <p className="text-gray-900 font-mono text-sm">{user.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Created</p>
                  <p className="text-gray-900">{formatDate(user.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Updated</p>
                  <p className="text-gray-900">{formatDate(user.updated_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
