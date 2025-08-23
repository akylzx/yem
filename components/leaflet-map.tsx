"use client"

import { useEffect, useRef, useState } from "react"

interface Clinic {
  id: number
  name: string
  rating: number
  address: string
  coordinates: [number, number]
  phone: string
  price: string
  nextAvailable: string
  featured: boolean
}

interface MapComponentProps {
  clinics: Clinic[]
  onClinicSelect: (clinicId: number) => void
}

export default function MapComponent({ clinics, onClinicSelect }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    const initMap = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100))

        if (!mapRef.current) {
          console.log("[v0] Map container still not available after timeout")
          return
        }

        const L = (await import("leaflet")).default

        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove()
          mapInstanceRef.current = null
        }

        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        })

        if (!mapRef.current) {
          console.log("[v0] Map container disappeared during initialization")
          return
        }

        const map = L.map(mapRef.current).setView([40.7589, -73.9851], 13)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize()
          }
        }, 100)

        const greenIcon = L.divIcon({
          html: `<div class="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                   <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                   </svg>
                 </div>`,
          className: "custom-div-icon",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        })

        clinics.forEach((clinic) => {
          const marker = L.marker(clinic.coordinates, { icon: greenIcon }).addTo(map)

          const popupContent = `
            <div class="p-3 min-w-[250px]">
              <h3 class="font-bold text-lg mb-2">${clinic.name}</h3>
              <div class="flex items-center gap-1 mb-2">
                <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="font-semibold">${clinic.rating}</span>
              </div>
              <p class="text-sm text-gray-600 mb-2">${clinic.address}</p>
              <p class="text-sm text-gray-600 mb-2">${clinic.phone}</p>
              <div class="flex items-center justify-between mb-3">
                <span class="text-green-600 font-bold">${clinic.price}</span>
                <span class="text-sm ${clinic.nextAvailable.includes("Today") ? "text-green-600" : "text-gray-600"}">${clinic.nextAvailable}</span>
              </div>
              <button 
                onclick="window.selectClinic(${clinic.id})"
                class="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                View Details
              </button>
            </div>
          `

          marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: "custom-popup",
          })
        })

        if (clinics.length > 0) {
          const group = L.featureGroup(clinics.map((clinic) => L.marker(clinic.coordinates)))
          map.fitBounds(group.getBounds().pad(0.1))
        }

        mapInstanceRef.current = map
        setIsLoaded(true)
        console.log("[v0] Map initialized successfully")
      } catch (error) {
        console.error("[v0] Map initialization error:", error)
      }
    }

    const timer = setTimeout(initMap, 200)

    return () => {
      clearTimeout(timer)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      delete (window as any).selectClinic
      setIsLoaded(false)
    }
  }, [clinics, onClinicSelect])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      <div className="relative">
        <div ref={mapRef} className="h-96 w-full rounded-lg" />
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-gray-500">Loading map...</div>
          </div>
        )}
      </div>
    </>
  )
}
