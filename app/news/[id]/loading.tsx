import { PageLayout } from "@/components/page-layout"
import { SectionContainer } from "@/components/section-container"

export default function Loading() {
  return (
    <PageLayout>
      <SectionContainer background="white" size="lg">
        <div className="animate-pulse">
          {/* Back button skeleton */}
          <div className="h-10 w-32 bg-gray-200 rounded mb-6"></div>

          {/* Header skeleton */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
            </div>
            <div className="h-12 w-full bg-gray-200 rounded mb-4"></div>
            <div className="h-6 w-3/4 bg-gray-200 rounded mb-6"></div>
            <div className="flex gap-3 mb-8">
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="h-96 w-full bg-gray-200 rounded"></div>
          </div>

          {/* Content skeleton */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  )
}
