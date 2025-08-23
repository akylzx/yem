import type React from "react"
import { Navigation } from "./navigation"
import { Footer } from "./footer"
import { Button } from "@/components/ui/button"

interface PageLayoutProps {
  children: React.ReactNode
  showEmergencyButton?: boolean
}

export function PageLayout({ children, showEmergencyButton = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />

      {/* Emergency Button - Fixed Position */}
      {showEmergencyButton && (
        <div className="fixed bottom-8 right-8 z-40">
          <Button
            size="lg"
            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-200"
            title="Emergency - Call for immediate help"
          >
            <span className="text-2xl">🚨</span>
          </Button>
        </div>
      )}
    </div>
  )
}
