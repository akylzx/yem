"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, ClockIcon, UserIcon, HeartIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react"

interface BookingData {
  // Patient Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string

  // Appointment Details
  appointmentDate: Date | null
  appointmentTime: string
  service: string
  doctor: string
  clinic: string

  // Additional Information
  reason: string
  notes: string
  insuranceProvider: string
  emergencyContact: string
  emergencyPhone: string
}

interface ValidationErrors {
  [key: string]: string
}

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
]

const services = [
  "General Consultation",
  "Cardiology",
  "Dermatology",
  "Orthopedics",
  "Pediatrics",
  "Gynecology",
  "Neurology",
  "Psychiatry",
  "X-Ray",
  "Blood Test",
  "MRI Scan",
  "CT Scan",
]

const doctors = [
  { id: "1", name: "Dr. Sarah Johnson", specialty: "General Medicine", clinic: "Central Medical Center" },
  { id: "2", name: "Dr. Michael Chen", specialty: "Cardiology", clinic: "Heart Care Clinic" },
  { id: "3", name: "Dr. Emily Rodriguez", specialty: "Dermatology", clinic: "Skin Health Institute" },
  { id: "4", name: "Dr. David Kim", specialty: "Orthopedics", clinic: "Bone & Joint Center" },
  { id: "5", name: "Dr. Lisa Thompson", specialty: "Pediatrics", clinic: "Children's Health Center" },
]

const clinics = [
  "Central Medical Center",
  "Heart Care Clinic",
  "Skin Health Institute",
  "Bone & Joint Center",
  "Children's Health Center",
]

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    appointmentDate: null,
    appointmentTime: "",
    service: "",
    doctor: "",
    clinic: "",
    reason: "",
    notes: "",
    insuranceProvider: "",
    emergencyContact: "",
    emergencyPhone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})

  const updateBookingData = (field: keyof BookingData, value: any) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): ValidationErrors => {
    const newErrors: ValidationErrors = {}

    switch (step) {
      case 1:
        if (!bookingData.firstName.trim()) newErrors.firstName = "First name is required"
        if (!bookingData.lastName.trim()) newErrors.lastName = "Last name is required"
        if (!bookingData.email.trim()) {
          newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
          newErrors.email = "Please enter a valid email address"
        }
        if (!bookingData.phone.trim()) {
          newErrors.phone = "Phone number is required"
        } else if (!/^[+]?[1-9][\d]{0,15}$/.test(bookingData.phone.replace(/[\s\-$$$$]/g, ""))) {
          newErrors.phone = "Please enter a valid phone number"
        }
        break
      case 2:
        if (!bookingData.appointmentDate) newErrors.appointmentDate = "Please select an appointment date"
        if (!bookingData.appointmentTime) newErrors.appointmentTime = "Please select an appointment time"
        break
      case 3:
        if (!bookingData.service) newErrors.service = "Please select a service"
        if (!bookingData.doctor) newErrors.doctor = "Please select a doctor"
        if (!bookingData.reason.trim()) newErrors.reason = "Please provide a reason for your visit"
        break
    }

    return newErrors
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock booking creation - ready for backend integration
    const appointmentPayload = {
      patient: {
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        email: bookingData.email,
        phone: bookingData.phone,
        dateOfBirth: bookingData.dateOfBirth,
        insuranceProvider: bookingData.insuranceProvider,
        emergencyContact: {
          name: bookingData.emergencyContact,
          phone: bookingData.emergencyPhone,
        },
      },
      appointment: {
        date: bookingData.appointmentDate?.toISOString().split("T")[0],
        time: bookingData.appointmentTime,
        service: bookingData.service,
        doctorId: bookingData.doctor,
        clinicId: bookingData.clinic,
        reason: bookingData.reason,
        notes: bookingData.notes,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    }

    console.log("[v0] Appointment booking payload:", appointmentPayload)

    setIsSubmitting(false)
    setIsBooked(true)
  }

  const nextStep = () => {
    const stepErrors = validateStep(currentStep)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setErrors({})
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const isStepValid = (step: number) => {
    const stepErrors = validateStep(step)
    return Object.keys(stepErrors).length === 0
  }

  if (isBooked) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Booked Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your appointment has been scheduled for{" "}
            <strong>
              {bookingData.appointmentDate?.toLocaleDateString()} at {bookingData.appointmentTime}
            </strong>{" "}
            with {doctors.find((d) => d.id === bookingData.doctor)?.name}.
          </p>
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-green-800">
              A confirmation email has been sent to <strong>{bookingData.email}</strong>
            </p>
          </div>
          <Button onClick={() => (window.location.href = "/profile")} className="bg-green-500 hover:bg-green-600">
            View My Appointments
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
              {step < 4 && <div className={`w-12 h-0.5 ${step < currentStep ? "bg-green-500" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {currentStep === 1 && (
              <>
                <UserIcon className="w-5 h-5" /> Personal Information
              </>
            )}
            {currentStep === 2 && (
              <>
                <CalendarIcon className="w-5 h-5" /> Select Date & Time
              </>
            )}
            {currentStep === 3 && (
              <>
                <HeartIcon className="w-5 h-5" /> Appointment Details
              </>
            )}
            {currentStep === 4 && (
              <>
                <CheckCircleIcon className="w-5 h-5" /> Review & Confirm
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={bookingData.firstName}
                  onChange={(e) => updateBookingData("firstName", e.target.value)}
                  placeholder="Enter your first name"
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircleIcon className="w-4 h-4" />
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={bookingData.lastName}
                  onChange={(e) => updateBookingData("lastName", e.target.value)}
                  placeholder="Enter your last name"
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircleIcon className="w-4 h-4" />
                    {errors.lastName}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => updateBookingData("email", e.target.value)}
                  placeholder="Enter your email"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircleIcon className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={bookingData.phone}
                  onChange={(e) => updateBookingData("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircleIcon className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={bookingData.dateOfBirth}
                  onChange={(e) => updateBookingData("dateOfBirth", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="insurance">Insurance Provider</Label>
                <Input
                  id="insurance"
                  value={bookingData.insuranceProvider}
                  onChange={(e) => updateBookingData("insuranceProvider", e.target.value)}
                  placeholder="Enter insurance provider"
                />
              </div>
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  value={bookingData.emergencyContact}
                  onChange={(e) => updateBookingData("emergencyContact", e.target.value)}
                  placeholder="Emergency contact name"
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  value={bookingData.emergencyPhone}
                  onChange={(e) => updateBookingData("emergencyPhone", e.target.value)}
                  placeholder="Emergency contact phone"
                />
              </div>
            </div>
          )}

          {/* Step 2: Date & Time Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-base font-medium">Select Date *</Label>
                  <div className="space-y-2">
                    <Input
                      type="date"
                      value={bookingData.appointmentDate ? bookingData.appointmentDate.toISOString().split("T")[0] : ""}
                      onChange={(e) => {
                        const selectedDate = e.target.value ? new Date(e.target.value + "T00:00:00") : null
                        updateBookingData("appointmentDate", selectedDate)
                      }}
                      min={new Date().toISOString().split("T")[0]}
                      className={`w-full text-center text-lg py-3 ${errors.appointmentDate ? "border-red-500" : ""}`}
                    />
                    <p className="text-sm text-gray-500 text-center">
                      Please select a date (Sundays are not available)
                    </p>
                  </div>
                  {errors.appointmentDate && (
                    <p className="text-red-500 text-sm flex items-center gap-1 justify-center">
                      <AlertCircleIcon className="w-4 h-4" />
                      {errors.appointmentDate}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">Available Time Slots *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={bookingData.appointmentTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateBookingData("appointmentTime", time)}
                        className={bookingData.appointmentTime === time ? "bg-green-500 hover:bg-green-600" : ""}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                  {errors.appointmentTime && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircleIcon className="w-4 h-4" />
                      {errors.appointmentTime}
                    </p>
                  )}

                  {bookingData.appointmentTime && bookingData.appointmentDate && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        <ClockIcon className="w-4 h-4 inline mr-1" />
                        Selected: {bookingData.appointmentDate?.toLocaleDateString()} at {bookingData.appointmentTime}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Appointment Details */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="service">Service/Treatment *</Label>
                <Select value={bookingData.service} onValueChange={(value) => updateBookingData("service", value)}>
                  <SelectTrigger className={errors.service ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircleIcon className="w-4 h-4" />
                    {errors.service}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="doctor">Preferred Doctor *</Label>
                <Select value={bookingData.doctor} onValueChange={(value) => updateBookingData("doctor", value)}>
                  <SelectTrigger className={errors.doctor ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        <div className="flex flex-col">
                          <span>{doctor.name}</span>
                          <span className="text-sm text-gray-500">
                            {doctor.specialty} - {doctor.clinic}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.doctor && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircleIcon className="w-4 h-4" />
                    {errors.doctor}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="clinic">Clinic Location</Label>
                <Select value={bookingData.clinic} onValueChange={(value) => updateBookingData("clinic", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a clinic" />
                  </SelectTrigger>
                  <SelectContent>
                    {clinics.map((clinic) => (
                      <SelectItem key={clinic} value={clinic}>
                        {clinic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="reason">Reason for Visit *</Label>
                <Textarea
                  id="reason"
                  value={bookingData.reason}
                  onChange={(e) => updateBookingData("reason", e.target.value)}
                  placeholder="Please describe the reason for your visit"
                  rows={3}
                  className={errors.reason ? "border-red-500" : ""}
                />
                {errors.reason && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircleIcon className="w-4 h-4" />
                    {errors.reason}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={bookingData.notes}
                  onChange={(e) => updateBookingData("notes", e.target.value)}
                  placeholder="Any additional information or special requests"
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Appointment Summary</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Patient Information</h4>
                    <p className="text-sm text-gray-600">
                      {bookingData.firstName} {bookingData.lastName}
                      <br />
                      {bookingData.email}
                      <br />
                      {bookingData.phone}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Appointment Details</h4>
                    <p className="text-sm text-gray-600">
                      <strong>Date:</strong> {bookingData.appointmentDate?.toLocaleDateString()}
                      <br />
                      <strong>Time:</strong> {bookingData.appointmentTime}
                      <br />
                      <strong>Service:</strong> {bookingData.service}
                      <br />
                      <strong>Doctor:</strong> {doctors.find((d) => d.id === bookingData.doctor)?.name}
                    </p>
                  </div>
                </div>

                {bookingData.reason && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Reason for Visit</h4>
                    <p className="text-sm text-gray-600">{bookingData.reason}</p>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Please note:</strong> Your appointment is subject to confirmation. You will receive a
                  confirmation email within 24 hours.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button onClick={nextStep} className="bg-green-500 hover:bg-green-600">
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-500 hover:bg-green-600">
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
