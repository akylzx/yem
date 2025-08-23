import { PageLayout } from "@/components/page-layout"
import { BookingForm } from "@/components/booking/booking-form"

export default function BookAppointmentPage() {
  return (
    <PageLayout
      title="Book Appointment"
      description="Schedule your healthcare appointment with our medical professionals"
      showEmergencyButton={false}
    >
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Appointment</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Schedule a consultation with our healthcare professionals. Choose your preferred date, time, and
              specialist.
            </p>
          </div>

          <BookingForm />
        </div>
      </div>
    </PageLayout>
  )
}
