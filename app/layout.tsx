import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { AuthProvider } from "@/lib/auth/auth-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "YEM - Your Health, Unified",
  description:
    "Connect with all private clinics in one platform. Book appointments, access AI health assistance, and manage your medical records seamlessly.",
  generator: "YEM Healthcare Platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
