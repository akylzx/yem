"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Heart, Bot, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/clinics", label: "Clinics" },
    { href: "/news", label: "News" },
    { href: "/profile", label: "Profile" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">YEM</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors ${
                  isActive(item.href) ? "text-green-500" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Link href="/ai-assistant">
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
                <Bot className="w-4 h-4" />
                AI Assistant
              </Button>
            </Link>
            <Link href="/book-appointment">
              <Button className="bg-green-500 hover:bg-green-600 text-white">Book Appointment</Button>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white fill-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">YEM</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 px-4 rounded-lg font-medium transition-colors ${
                        isActive(item.href) ? "bg-green-50 text-green-600" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div className="pt-4 border-t">
                    <Link href="/ai-assistant" onClick={() => setIsOpen(false)}>
                      <Button className="w-full mb-3 bg-green-500 hover:bg-green-600">
                        <Bot className="w-4 h-4 mr-2" />
                        AI Assistant
                      </Button>
                    </Link>
                    <Link href="/book-appointment" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-green-500 hover:bg-green-600">Book Appointment</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
