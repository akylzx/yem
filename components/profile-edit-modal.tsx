"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Edit, AlertCircle, CheckCircle } from "lucide-react"
import type { UserProfile } from "@/lib/types/auth"

interface ProfileEditModalProps {
  profile: UserProfile
  onProfileUpdate: () => void
}

export function ProfileEditModal({ profile, onProfileUpdate }: ProfileEditModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    first_name: profile.first_name || "",
    last_name: profile.last_name || "",
    display_name: profile.display_name || "",
    phone: profile.phone || "",
    date_of_birth: profile.date_of_birth || "",
    gender: profile.gender || "",
    address: {
      street: profile.address?.street || "",
      city: profile.address?.city || "",
      state: profile.address?.state || "",
      zip: profile.address?.zip || "",
      country: profile.address?.country || "",
    },
    emergency_contact: {
      name: profile.emergency_contact?.name || "",
      phone: profile.emergency_contact?.phone || "",
      relationship: profile.emergency_contact?.relationship || "",
    },
    medical_info: {
      blood_type: profile.medical_info?.blood_type || "",
      allergies: profile.medical_info?.allergies || [],
      medications: profile.medical_info?.medications || [],
      conditions: profile.medical_info?.conditions || [],
      insurance: {
        provider: profile.medical_info?.insurance?.provider || "",
        policy_number: profile.medical_info?.insurance?.policy_number || "",
        group_number: profile.medical_info?.insurance?.group_number || "",
      },
    },
  })

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleArrayChange = (field: string, value: string) => {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
    setFormData((prev) => ({
      ...prev,
      medical_info: {
        ...prev.medical_info,
        [field]: items,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock success response
      setSuccess(true)
      if (onProfileUpdate) {
        onProfileUpdate()
      }

      setTimeout(() => {
        setIsOpen(false)
        setSuccess(false)
      }, 2000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your personal information and medical details</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                  id="display_name"
                  value={formData.display_name}
                  onChange={(e) => handleInputChange("display_name", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={formData.address.street}
                  onChange={(e) => handleInputChange("address.street", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.address.city}
                    onChange={(e) => handleInputChange("address.city", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.address.state}
                    onChange={(e) => handleInputChange("address.state", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    value={formData.address.zip}
                    onChange={(e) => handleInputChange("address.zip", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.address.country}
                  onChange={(e) => handleInputChange("address.country", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergency_name">Name</Label>
                  <Input
                    id="emergency_name"
                    value={formData.emergency_contact.name}
                    onChange={(e) => handleInputChange("emergency_contact.name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="emergency_phone">Phone</Label>
                  <Input
                    id="emergency_phone"
                    type="tel"
                    value={formData.emergency_contact.phone}
                    onChange={(e) => handleInputChange("emergency_contact.phone", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="emergency_relationship">Relationship</Label>
                <Input
                  id="emergency_relationship"
                  value={formData.emergency_contact.relationship}
                  onChange={(e) => handleInputChange("emergency_contact.relationship", e.target.value)}
                  placeholder="e.g., Spouse, Parent, Sibling"
                />
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="blood_type">Blood Type</Label>
                <Select
                  value={formData.medical_info.blood_type}
                  onValueChange={(value) => handleInputChange("medical_info.blood_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="allergies">Allergies (comma-separated)</Label>
                <Textarea
                  id="allergies"
                  value={formData.medical_info.allergies.join(", ")}
                  onChange={(e) => handleArrayChange("allergies", e.target.value)}
                  placeholder="e.g., Penicillin, Peanuts, Shellfish"
                />
              </div>

              <div>
                <Label htmlFor="medications">Current Medications (comma-separated)</Label>
                <Textarea
                  id="medications"
                  value={formData.medical_info.medications.join(", ")}
                  onChange={(e) => handleArrayChange("medications", e.target.value)}
                  placeholder="e.g., Lisinopril 10mg, Metformin 500mg"
                />
              </div>

              <div>
                <Label htmlFor="conditions">Medical Conditions (comma-separated)</Label>
                <Textarea
                  id="conditions"
                  value={formData.medical_info.conditions.join(", ")}
                  onChange={(e) => handleArrayChange("conditions", e.target.value)}
                  placeholder="e.g., Diabetes, Hypertension, Asthma"
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Insurance Information</h4>
                <div>
                  <Label htmlFor="insurance_provider">Insurance Provider</Label>
                  <Input
                    id="insurance_provider"
                    value={formData.medical_info.insurance.provider}
                    onChange={(e) => handleInputChange("medical_info.insurance.provider", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="policy_number">Policy Number</Label>
                    <Input
                      id="policy_number"
                      value={formData.medical_info.insurance.policy_number}
                      onChange={(e) => handleInputChange("medical_info.insurance.policy_number", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="group_number">Group Number</Label>
                    <Input
                      id="group_number"
                      value={formData.medical_info.insurance.group_number}
                      onChange={(e) => handleInputChange("medical_info.insurance.group_number", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <p className="text-sm text-green-700">Profile updated successfully!</p>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-green-500 hover:bg-green-600">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
