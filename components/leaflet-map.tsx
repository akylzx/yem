"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"
import L from "leaflet"
import { useEffect } from "react"

// Fix for default markers in Next.js/React
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom clinic icon (medical marker)
const clinicIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiNEQzI2MjYiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxyZWN0IHg9IjE0IiB5PSIxMCIgd2lkdGg9IjQiIGhlaWdodD0iMTIiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjEwIiB5PSIxNCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjQiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

// Alternative green medical icon
const greenClinicIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiMxNkEzNEEiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxyZWN0IHg9IjE0IiB5PSIxMCIgd2lkdGg9IjQiIGhlaWdodD0iMTIiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjEwIiB5PSIxNCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjQiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

// Define the Clinic interface to match your data structure
interface Clinic {
  id: number
  name: string
  coordinates: [number, number]
  address: string
  rating: number
  phone: string
  specialties: string[]
  next_available: string | null
  featured: boolean
}

interface MapProps {
  clinics: Clinic[]
  onClinicSelect: (clinicId: number) => void
}

// Custom component to handle markers
function MapMarkers({ clinics, onClinicSelect }: MapProps) {
  return (
    <>
      {clinics.map((clinic) => {
        // Validate coordinates
        if (!clinic.coordinates || 
            !Array.isArray(clinic.coordinates) || 
            clinic.coordinates.length !== 2 ||
            isNaN(clinic.coordinates[0]) || 
            isNaN(clinic.coordinates[1])) {
          console.warn(`Invalid coordinates for clinic ${clinic.name}:`, clinic.coordinates)
          return null
        }

        const [lat, lng] = clinic.coordinates
        
        // Validate lat/lng ranges
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
          console.warn(`Coordinates out of range for clinic ${clinic.name}:`, clinic.coordinates)
          return null
        }

        return (
          <Marker
            key={clinic.id}
            position={[lat, lng]}
            icon={clinic.featured ? greenClinicIcon : clinicIcon}
            eventHandlers={{
              click: () => {
                onClinicSelect(clinic.id)
              },
            }}
          >
            <Popup>
              <div className="p-2 min-w-[250px]">
                <h3 className="font-bold text-lg mb-2">{clinic.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{clinic.address}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="font-semibold">{clinic.rating}</span>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-600">Specialties:</p>
                  <p className="text-sm font-medium">{clinic.specialties.slice(0, 2).join(", ")}</p>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-gray-600">Next available:</p>
                  <p className="text-sm font-medium text-green-600">
                    {clinic.next_available || "Call for availability"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      onClinicSelect(clinic.id)
                    }}
                  >
                    View Details
                  </button>
                  <a
                    href={`tel:${clinic.phone}`}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Call
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </>
  )
}

// Map bounds adjustment component
function MapBounds({ clinics }: { clinics: Clinic[] }) {
  const map = useMap()

  useEffect(() => {
    const validClinics = clinics.filter(clinic => 
      clinic.coordinates && 
      Array.isArray(clinic.coordinates) && 
      clinic.coordinates.length === 2 &&
      !isNaN(clinic.coordinates[0]) && 
      !isNaN(clinic.coordinates[1]) &&
      clinic.coordinates[0] >= -90 && clinic.coordinates[0] <= 90 &&
      clinic.coordinates[1] >= -180 && clinic.coordinates[1] <= 180
    )

    if (validClinics.length === 0) {
      // Default to Almaty if no valid coordinates
      map.setView([43.2565, 76.9285], 12)
      return
    }

    if (validClinics.length === 1) {
      // Center on single clinic
      const [lat, lng] = validClinics[0].coordinates
      map.setView([lat, lng], 15)
      return
    }

    // Fit bounds to show all clinics
    try {
      const bounds = L.latLngBounds(
        validClinics.map(clinic => [clinic.coordinates[0], clinic.coordinates[1]])
      )
      map.fitBounds(bounds, { padding: [20, 20] })
    } catch (error) {
      console.error('Error fitting bounds:', error)
      // Fallback to Almaty center
      map.setView([43.2565, 76.9285], 12)
    }
  }, [map, clinics])

  return null
}

export default function LeafletMap({ clinics, onClinicSelect }: MapProps) {
  const almatyCoordinates: L.LatLngTuple = [43.2565, 76.9285]

  return (
    <MapContainer
      center={almatyCoordinates}
      zoom={12}
      scrollWheelZoom={true}
      className="h-full w-full"
      style={{ minHeight: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapMarkers clinics={clinics} onClinicSelect={onClinicSelect} />
      <MapBounds clinics={clinics} />
    </MapContainer>
  )
}