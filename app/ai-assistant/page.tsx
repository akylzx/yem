"use client"

import { PageLayout } from "@/components/page-layout"
import { SectionContainer } from "@/components/section-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Send, AlertTriangle, CheckCircle, Clock, Stethoscope, Heart, Brain, User } from "lucide-react"
import { useState } from "react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  urgency?: "low" | "medium" | "high"
  recommendations?: string[]
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "assistant",
    content:
      "Hello! I'm your AI Health Assistant. I can help you understand your symptoms, provide health guidance, and suggest when to seek medical care. Please describe what you're experiencing, and I'll do my best to help.",
    timestamp: new Date(),
  },
]

const urgencyColors = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-red-100 text-red-800 border-red-200",
}

const urgencyIcons = {
  low: <CheckCircle className="w-4 h-4" />,
  medium: <Clock className="w-4 h-4" />,
  high: <AlertTriangle className="w-4 h-4" />,
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage)
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()

    // Simple symptom analysis simulation
    if (input.includes("chest pain") || input.includes("heart")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "I understand you're experiencing chest pain. This could be related to various conditions ranging from muscle strain to more serious cardiac issues.",
        urgency: "high",
        recommendations: [
          "Seek immediate medical attention if pain is severe, crushing, or accompanied by shortness of breath",
          "Call emergency services if you feel dizzy, nauseous, or have pain radiating to your arm or jaw",
          "Avoid physical exertion until evaluated by a healthcare provider",
          "Consider visiting the emergency room or urgent care center",
        ],
        timestamp: new Date(),
      }
    }

    if (input.includes("headache") || input.includes("head")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "Headaches can have many causes, from tension and dehydration to more serious conditions. Let me help you assess the situation.",
        urgency: "medium",
        recommendations: [
          "Try resting in a quiet, dark room",
          "Stay hydrated and consider over-the-counter pain relief",
          "Monitor for severe symptoms like vision changes, fever, or neck stiffness",
          "Consult a healthcare provider if headaches are frequent or severe",
        ],
        timestamp: new Date(),
      }
    }

    if (input.includes("fever") || input.includes("temperature")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "Fever is often a sign that your body is fighting an infection. The severity depends on the temperature and accompanying symptoms.",
        urgency: "medium",
        recommendations: [
          "Monitor your temperature regularly",
          "Stay hydrated with plenty of fluids",
          "Rest and avoid strenuous activities",
          "Seek medical care if fever exceeds 103°F (39.4°C) or persists for more than 3 days",
        ],
        timestamp: new Date(),
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "assistant",
      content:
        "Thank you for sharing your symptoms. Based on what you've described, I recommend monitoring your condition closely. Please remember that this is preliminary guidance and not a medical diagnosis.",
      urgency: "low",
      recommendations: [
        "Monitor your symptoms and note any changes",
        "Stay hydrated and get adequate rest",
        "Consider scheduling an appointment with your healthcare provider",
        "Seek immediate care if symptoms worsen significantly",
      ],
      timestamp: new Date(),
    }
  }

  return (
    <PageLayout>
      <SectionContainer background="gray" size="lg">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Health Assistant</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get instant health guidance, symptom analysis, and recommendations. Our AI assistant can help you
              understand your symptoms and determine the appropriate level of care needed.
            </p>
          </div>

          {/* Disclaimer */}
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">Important Disclaimer</p>
                  <p>
                    This AI assistant provides general health information and preliminary guidance only. It is not a
                    substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified
                    healthcare providers for medical concerns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-green-600" />
                Health Consultation
              </CardTitle>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}>
                  {message.type === "assistant" && (
                    <Avatar className="w-8 h-8 bg-green-500">
                      <AvatarFallback className="bg-green-500 text-white">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.type === "user" ? "bg-green-600 text-white ml-auto" : "bg-white border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>

                      {message.urgency && (
                        <div className={`mt-3 p-2 rounded border ${urgencyColors[message.urgency]}`}>
                          <div className="flex items-center gap-2 mb-2">
                            {urgencyIcons[message.urgency]}
                            <span className="font-semibold text-xs uppercase">
                              {message.urgency === "low" && "Low Priority"}
                              {message.urgency === "medium" && "Moderate Concern"}
                              {message.urgency === "high" && "Urgent - Seek Immediate Care"}
                            </span>
                          </div>
                        </div>
                      )}

                      {message.recommendations && (
                        <div className="mt-3 p-3 bg-gray-50 rounded border">
                          <p className="font-semibold text-xs text-gray-700 mb-2">RECOMMENDATIONS:</p>
                          <ul className="space-y-1">
                            {message.recommendations.map((rec, index) => (
                              <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                                <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-3">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  {message.type === "user" && (
                    <Avatar className="w-8 h-8 bg-gray-500">
                      <AvatarFallback className="bg-gray-500 text-white">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 bg-green-500">
                    <AvatarFallback className="bg-green-500 text-white">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white border border-gray-200 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <span className="text-sm text-gray-500 ml-2">AI is analyzing...</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Describe your symptoms or health concerns..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Stethoscope className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Symptom Checker</h3>
                <p className="text-sm text-gray-600">Get guidance on your symptoms</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Health Tips</h3>
                <p className="text-sm text-gray-600">Personalized wellness advice</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Brain className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Mental Health</h3>
                <p className="text-sm text-gray-600">Support for mental wellness</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  )
}
