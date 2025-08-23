import { PageLayout } from "@/components/page-layout"
import { SectionContainer } from "@/components/section-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Bot, Stethoscope, Users, Building2, UserCheck, Star, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <SectionContainer background="green" size="xl" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your Health, <span className="text-green-500">Unified</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Connect with all private clinics in one platform. Book appointments, access AI health assistance, and
                  manage your medical records seamlessly.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/clinics">
                  <Button
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg w-full sm:w-auto"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Find Clinics
                  </Button>
                </Link>
                <Link href="/ai-assistant">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-300 px-8 py-3 text-lg bg-transparent w-full sm:w-auto"
                  >
                    <Bot className="w-5 h-5 mr-2" />
                    AI Health Assistant
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual Element */}
            <div className="relative flex items-center justify-center">
              {/* Large Circle */}
              <div className="yem-circle-decoration w-80 h-80 lg:w-96 lg:h-96 rounded-full flex items-center justify-center relative animate-pulse">
                {/* Inner Content */}
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">24/7 Healthcare</h3>
                    <p className="text-gray-600">Always available for you</p>
                  </div>
                </div>
              </div>

              {/* Background Decorative Elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-[500px] h-[500px] rounded-full border-2 border-green-200 opacity-30 animate-spin-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Trusted by Thousands Section */}
      <SectionContainer background="white" size="md">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join our growing network of patients and healthcare providers who trust YEM for their medical needs.
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 border-green-100 hover:border-green-200 transition-colors">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">250+</div>
                <div className="text-gray-600">Partner Clinics</div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-green-100 hover:border-green-200 transition-colors">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">15,000+</div>
                <div className="text-gray-600">Happy Clients</div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-green-100 hover:border-green-200 transition-colors">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">1,200+</div>
                <div className="text-gray-600">Medical Specialists</div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-green-100 hover:border-green-200 transition-colors">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">4.8/5</div>
                <div className="text-gray-600">Average Rating</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionContainer>

      {/* Health Tip of the Day Section */}
      <SectionContainer background="green" size="md">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Health Tip of the Day</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Stay hydrated! Drinking 8 glasses of water daily helps maintain proper kidney function, supports
                    healthy skin, and boosts your energy levels. Start your morning with a glass of water to kickstart
                    your metabolism.
                  </p>
                  <div className="text-sm text-gray-500">
                    💡 Pro tip: Add a slice of lemon for extra vitamin C and better taste!
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionContainer>

      {/* AI Assistant Features Section */}
      <SectionContainer background="white" size="lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Health Assistant</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Get instant health guidance with our advanced AI assistant, available 24/7 to help with your medical
              questions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Demo Screenshot */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg">
                <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900">YEM AI Assistant</span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-100 rounded-lg p-3 ml-8">
                      <p className="text-sm text-gray-700">I have a headache and feel dizzy. Should I be concerned?</p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-3 mr-8">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs font-medium text-yellow-700">MODERATE URGENCY</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Based on your symptoms, this could indicate dehydration or stress. I recommend:
                      </p>
                      <ul className="text-xs text-gray-600 mt-2 space-y-1">
                        <li>• Drink water and rest</li>
                        <li>• Monitor symptoms for 2-4 hours</li>
                        <li>• See a doctor if symptoms worsen</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - 4 Feature Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="p-6 border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Bot className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Symptom Analysis</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Describe your symptoms and get instant analysis with urgency levels and preliminary recommendations.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Triage</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get color-coded urgency assessments (green/yellow/red) to help you understand when to seek care.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">First Aid Guidance</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Receive immediate first-aid recommendations and safety tips for various health situations.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-green-100 hover:border-green-200 transition-colors">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Availability</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Access health guidance anytime, anywhere. Our AI assistant never sleeps, so you're always covered.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  )
}
