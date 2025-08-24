"use client"

import { PageLayout } from "@/components/page-layout"
import { SectionContainer } from "@/components/section-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  MapPin,
  Clock,
  Star,
  ArrowUpDown,
  Phone,
  Calendar,
  Heart,
  Award,
  Users,
  Stethoscope,
} from "lucide-react"
import { useState, useMemo } from "react"
import dynamic from "next/dynamic"

// Define the Clinic interface to match your Supabase database schema
interface ClinicFromDB {
  id: number
  name: string
  rating: number
  review_count: number
  address: string
  phone: string
  hours: string
  specialties: string[]
  services: string[]
  next_available: string | null
  price_range: string
  image: string
  featured: boolean
  achievements: string[]
  latitude: number  // Separate latitude column
  longitude: number // Separate longitude column
  is_active: boolean
  doctors: Array<{
    name: string;
    specialty: string;
    rating: number;
  }>
}

// Interface for the processed clinic data (with combined coordinates)
interface Clinic {
  id: number
  name: string
  rating: number
  review_count: number
  address: string
  phone: string
  hours: string
  specialties: string[]
  services: string[]
  next_available: string | null
  price_range: string
  image: string
  featured: boolean
  achievements: string[]
  coordinates: [number, number] // Combined coordinates for map
  is_active: boolean
  doctors: Array<{
    name: string;
    specialty: string;
    rating: number;
  }>
}

interface ClinicsClientProps {
  clinics: ClinicFromDB[]
}

// Dynamically import the MapComponent
const MapComponent = dynamic(() => import("@/components/leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
      <div className="text-center text-gray-500 dark:text-gray-400">
        <MapPin className="w-12 h-12 mx-auto mb-2" />
        <p>Loading map...</p>
      </div>
    </div>
  ),
})

export default function ClinicsClient({ clinics: rawClinics }: ClinicsClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClinic, setSelectedClinic] = useState<number | null>(null)
  const [showMap, setShowMap] = useState(true)
  const [sortBy, setSortBy] = useState("rating")
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  // Transform clinics data to combine latitude and longitude into coordinates array
  const clinics: Clinic[] = useMemo(() => {
    return rawClinics
      .filter(
        (clinic) =>
          clinic.latitude != null &&
          clinic.longitude != null &&
          !isNaN(clinic.latitude) &&
          !isNaN(clinic.longitude),
      )
      .map((clinic) => ({
        ...clinic,
        coordinates: [clinic.latitude, clinic.longitude] as [number, number],
      }))
  }, [rawClinics])

  const filteredClinics = clinics.filter(
    (clinic) =>
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
      clinic.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase())) ||
      clinic.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedClinics = [...filteredClinics].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return (
          Number.parseInt(a.price_range.split("-")[0].replace("$", "")) -
          Number.parseInt(b.price_range.split("-")[0].replace("$", ""))
        )
      case "price-high":
        return (
          Number.parseInt(b.price_range.split("-")[0].replace("$", "")) -
          Number.parseInt(a.price_range.split("-")[0].replace("$", ""))
        )
      case "reviews":
        return b.review_count - a.review_count
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <>
      <div className={selectedClinic ? "blur-sm" : ""}>
        <PageLayout>
          <SectionContainer background="white" size="lg">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Healthcare Providers</h1>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search by clinic name, specialty, service (e.g., X-ray, MRI), or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="relative">
                  <Button
                    variant="outline"
                    className="gap-2 h-12 px-6 border-gray-200 bg-transparent"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    Sort
                  </Button>
                  {showSortDropdown && (
                    <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[180px]">
                      <div className="py-2">
                        {[
                          { value: "rating", label: "Highest Rating" },
                          { value: "reviews", label: "Most Reviews" },
                          { value: "price-low", label: "Price: Low to High" },
                          { value: "price-high", label: "Price: High to Low" },
                          { value: "name", label: "Name A-Z" },
                        ].map((option) => (
                          <button
                            key={option.value}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                              sortBy === option.value ? "bg-green-50 text-green-700" : ""
                            }`}
                            onClick={() => {
                              setSortBy(option.value)
                              setShowSortDropdown(false)
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="gap-2 h-12 px-6 border-gray-200 bg-transparent"
                  onClick={() => setShowMap(!showMap)}
                >
                  <MapPin className="w-4 h-4" />
                  {showMap ? "Hide Map" : "Show Map"}
                </Button>
              </div>

              {!searchTerm && (
                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-3">Popular services:</p>
                  <div className="flex flex-wrap gap-2">
                    {["X-ray", "MRI", "Blood Tests", "Vaccination", "Physical Exam", "CT Scan"].map((service) => (
                      <Button
                        key={service}
                        variant="outline"
                        size="sm"
                        className="text-sm bg-gray-50 border-gray-200 text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                        onClick={() => setSearchTerm(service)}
                      >
                        {service}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Map Section */}
            {showMap && (
              <Card className="mb-8 border-gray-200">
                <CardContent className="p-0">
                  <div className="h-96">
                    <MapComponent clinics={sortedClinics} onClinicSelect={setSelectedClinic} />
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Found {sortedClinics.length} healthcare providers
                {searchTerm && ` for "${searchTerm}"`}
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Available Today: {sortedClinics.filter((c) => c.next_available && c.next_available.includes("Today")).length}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sortedClinics.map((clinic) => (
                <Card
                  key={clinic.id}
                  className={`cursor-pointer transition-all hover:shadow-lg border-gray-200 ${clinic.featured ? "ring-2 ring-green-200" : ""}`}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={clinic.image || "/placeholder.svg"}
                        alt={clinic.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {clinic.featured && <Badge className="absolute top-3 left-3 bg-green-600">Featured</Badge>}
                      <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm">
                        <Heart className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{clinic.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-semibold text-gray-900">{clinic.rating}</span>
                              <span className="text-gray-500">({clinic.review_count} reviews)</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">{clinic.price_range}</p>
                          <p className="text-sm text-gray-500">per visit</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{clinic.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{clinic.hours}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{clinic.phone}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Specialties:</p>
                        <div className="flex flex-wrap gap-2">
                          {clinic.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Available Services:</p>
                        <div className="flex flex-wrap gap-1">
                          {clinic.services.slice(0, 4).map((service) => (
                            <Badge
                              key={service}
                              variant="outline"
                              className={`text-xs border-gray-200 text-gray-600 ${
                                searchTerm && service.toLowerCase().includes(searchTerm.toLowerCase())
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : ""
                              }`}
                            >
                              {service}
                            </Badge>
                          ))}
                          {clinic.services.length > 4 && (
                            <Badge variant="outline" className="text-xs text-gray-500 border-gray-200">
                              +{clinic.services.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-gray-600">Next available: </span>
                          <span
                            className={`font-semibold ${
                              clinic.next_available && clinic.next_available.includes("Today") ? "text-green-600" : "text-gray-900"
                            }`}
                          >
                            {clinic.next_available || "Not specified"}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedClinic(clinic.id)}
                            className="border-gray-200 text-gray-700 hover:bg-gray-50"
                          >
                            View Details
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SectionContainer>
        </PageLayout>
      </div>

      {/* Modal with blurred background */}
      {selectedClinic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-md"
            onClick={() => setSelectedClinic(null)}
          />
          {/* Modal content */}
          <Card className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto border-gray-200 shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-gray-900">
                  {clinics.find((c) => c.id === selectedClinic)?.name}
                </CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedClinic(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {(() => {
                const clinic = clinics.find((c) => c.id === selectedClinic)
                if (!clinic) return null
                return (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <img
                          src={clinic.image || "/placeholder.svg"}
                          alt={clinic.name}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="text-xl font-bold text-gray-900">{clinic.rating}</span>
                          <span className="text-gray-500">({clinic.review_count} reviews)</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>{clinic.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{clinic.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span>{clinic.hours}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-gray-900">Achievements</h4>
                          <div className="space-y-1">
                            {clinic.achievements.map((achievement) => (
                              <div key={achievement} className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-gray-600">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
                        <Stethoscope className="w-5 h-5" />
                        Available Services
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {clinic.services.map((service) => (
                          <Badge
                            key={service}
                            variant="outline"
                            className={`justify-center py-2 border-gray-200 text-gray-600 ${
                              searchTerm && service.toLowerCase().includes(searchTerm.toLowerCase())
                                ? "bg-green-50 text-green-700 border-green-200"
                                : ""
                            }`}
                          >
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
                        <Users className="w-5 h-5" />
                        Our Specialists
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {clinic.doctors.map((doctor) => (
                          <Card key={doctor.name} className="border-gray-200">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback className="bg-green-100 text-green-700">
                                    <Stethoscope className="w-4 h-4" />
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h5 className="font-semibold text-gray-900">{doctor.name}</h5>
                                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                    <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4 border-t border-gray-200">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Clinic
                      </Button>
                    </div>
                  </>
                )
              })()}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}