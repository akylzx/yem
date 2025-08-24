"use client"

import type React from "react"
import { useState } from "react"
import { Navigation } from "./navigation"
import { Footer } from "./footer"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface PageLayoutProps {
  children: React.ReactNode
  showEmergencyButton?: boolean
}

export function PageLayout({ children, showEmergencyButton = true }: PageLayoutProps) {
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false)

  const handleEmergencyClick = () => {
    setShowEmergencyDialog(true)
  }

  const handleEmergencyConfirm = () => {
    setShowEmergencyDialog(false)

    // Mock emergency functionality - in real implementation this would:
    // 1. Call emergency services API
    // 2. Get user's location
    // 3. Send emergency alert with location
    // 4. Redirect to emergency page or show emergency contacts

    console.log("[v0] Emergency button activated - calling emergency services")

    // For now, show alert and redirect to emergency page
    alert("🚨 Emergency services have been contacted. Help is on the way!")

    // In a real implementation, you might:
    // window.location.href = "tel:911" // Call emergency number
    // or redirect to emergency page with location services
  }

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
            onClick={handleEmergencyClick}
          >
            <span className="text-2xl">🚨</span>
          </Button>
        </div>
      )}

      <AlertDialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 flex items-center gap-2">
              <span className="text-2xl">🚨</span>
              Emergency Alert
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700">
              <strong>Warning:</strong> This will contact emergency services immediately.
              <br />
              <br />
              Only proceed if you have a genuine medical emergency that requires immediate assistance.
              <br />
              <br />
              Are you sure you want to call for emergency help?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleEmergencyConfirm} className="bg-red-500 hover:bg-red-600 text-white">
              Yes, Call Emergency Services
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
