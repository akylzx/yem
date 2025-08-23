import type React from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  background?: "white" | "gray" | "green"
  size?: "sm" | "md" | "lg" | "xl"
}

export function SectionContainer({ children, className, background = "white", size = "lg" }: SectionContainerProps) {
  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    green: "yem-gradient-bg",
  }

  const sizeClasses = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
    xl: "py-24",
  }

  return (
    <section className={cn(backgroundClasses[background], sizeClasses[size], "px-4 sm:px-6 lg:px-8", className)}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}
