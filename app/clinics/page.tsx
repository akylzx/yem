import { createClient } from "@/lib/supabase/server"
import ClinicsClient from "./ClinicsClient"

export default async function ClinicsPage() {
  const supabase = await createClient()
  const { data: clinicsData, error } = await supabase.from("clinics").select("*").eq("is_active", true)

  // Optionally handle error here
  if (error) {
    return <div className="p-8 text-red-600">Failed to load clinics: {error.message}</div>
  }

  return <ClinicsClient clinics={clinicsData || []} />
}

// "use client"

// import { PageLayout } from "@/components/page-layout"
// import { SectionContainer } from "@/components/section-container"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import {
//   Search,
//   MapPin,
//   Clock,
//   Star,
//   ArrowUpDown,
//   Phone,
//   Calendar,
//   Heart,
//   Award,
//   Users,
//   Stethoscope,
// } from "lucide-react"
// import { useState } from "react"
// import { createClient } from "@/lib/supabase/server"
// import dynamic from "next/dynamic"

// const MapComponent = dynamic(() => import("@/components/leaflet-map"), {
//   ssr: false,
//   loading: () => (
//     <div className="h-96 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
//       <div className="text-center text-gray-500 dark:text-gray-400">
//         <MapPin className="w-12 h-12 mx-auto mb-2" />
//         <p>Loading map...</p>
//       </div>
//     </div>
//   ),
// })

// const clinics = [
//   {
//     id: 1,
//     name: "Central Medical Center",
//     rating: 4.8,
//     reviewCount: 324,
//     address: "123 Healthcare Ave, Medical District",
//     coordinates: [40.7589, -73.9851] as [number, number],
//     phone: "+1 (555) 123-4567",
//     hours: "Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM",
//     specialties: ["Cardiology", "Internal Medicine", "Pediatrics"],
//     services: [
//       "X-ray",
//       "MRI",
//       "CT Scan",
//       "Ultrasound",
//       "Blood Tests",
//       "ECG",
//       "Stress Test",
//       "Echocardiogram",
//       "Vaccination",
//       "Physical Exam",
//     ],
//     nextAvailable: "Today 2:30 PM",
//     price: "$150-300",
//     image: "/modern-medical-clinic.png",
//     featured: true,
//     achievements: ["Joint Commission Accredited", "Top Rated 2024"],
//     doctors: [
//       { name: "Dr. Sarah Johnson", specialty: "Cardiology", rating: 4.9 },
//       { name: "Dr. Michael Chen", specialty: "Internal Medicine", rating: 4.7 },
//     ],
//   },
//   {
//     id: 2,
//     name: "Family Health Clinic",
//     rating: 4.6,
//     reviewCount: 189,
//     address: "456 Wellness Blvd, Health Plaza",
//     coordinates: [40.7505, -73.9934] as [number, number],
//     phone: "+1 (555) 234-5678",
//     hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-4PM",
//     specialties: ["Family Medicine", "Urgent Care", "Preventive Care"],
//     services: [
//       "Blood Tests",
//       "Vaccination",
//       "Physical Exam",
//       "Minor Surgery",
//       "Wound Care",
//       "Flu Shots",
//       "Health Screening",
//     ],
//     nextAvailable: "Tomorrow 10:00 AM",
//     price: "$100-250",
//     image: "/family-medical-clinic.png",
//     featured: false,
//     achievements: ["Patient Choice Award", "Excellence in Care"],
//     doctors: [
//       { name: "Dr. Emily Rodriguez", specialty: "Family Medicine", rating: 4.8 },
//       { name: "Dr. James Wilson", specialty: "Urgent Care", rating: 4.5 },
//     ],
//   },
//   {
//     id: 3,
//     name: "Specialized Care Institute",
//     rating: 4.9,
//     reviewCount: 456,
//     address: "789 Specialist Dr, Medical Campus",
//     coordinates: [40.7614, -73.9776] as [number, number],
//     phone: "+1 (555) 345-6789",
//     hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM",
//     specialties: ["Orthopedics", "Neurology", "Dermatology"],
//     services: [
//       "X-ray",
//       "MRI",
//       "CT Scan",
//       "Bone Density Test",
//       "EMG",
//       "EEG",
//       "Skin Biopsy",
//       "Joint Injection",
//       "Physical Therapy",
//     ],
//     nextAvailable: "Next Week",
//     price: "$200-500",
//     image: "/specialized-medical-center.png",
//     featured: true,
//     achievements: ["Center of Excellence", "Research Leader"],
//     doctors: [
//       { name: "Dr. Robert Kim", specialty: "Orthopedics", rating: 4.9 },
//       { name: "Dr. Lisa Thompson", specialty: "Neurology", rating: 4.8 },
//     ],
//   },
// ]
  
// export default async function ClinicsPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedClinic, setSelectedClinic] = useState<number | null>(null)
//   const [showMap, setShowMap] = useState(false)
//   const [sortBy, setSortBy] = useState("rating")
//   const [showSortDropdown, setShowSortDropdown] = useState(false)
//   const supabase = await createClient()
//   const { data: clinicsData, error } = await supabase.from("clinics").select("*").eq("is_active", true)
//   const clinics = clinicsData || []

//   const filteredClinics = clinics.filter(
//     (clinic) =>
//       clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       clinic.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       clinic.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       clinic.address.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   const sortedClinics = [...filteredClinics].sort((a, b) => {
//     switch (sortBy) {
//       case "rating":
//         return b.rating - a.rating
//       case "price-low":
//         return (
//           Number.parseInt(a.price.split("-")[0].replace("$", "")) -
//           Number.parseInt(b.price.split("-")[0].replace("$", ""))
//         )
//       case "price-high":
//         return (
//           Number.parseInt(b.price.split("-")[0].replace("$", "")) -
//           Number.parseInt(a.price.split("-")[0].replace("$", ""))
//         )
//       case "reviews":
//         return b.reviewCount - a.reviewCount
//       case "name":
//         return a.name.localeCompare(b.name)
//       default:
//         return 0
//     }
//   })

  
// }
