"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Download,
  Calendar,
  User,
  Stethoscope,
  Pill,
  AlertTriangle,
  Heart,
  Activity,
  Eye,
} from "lucide-react"

const medicalRecords = [
  {
    id: 1,
    type: "Physical Exam",
    title: "Annual Physical Exam",
    doctor: "Dr. Sarah Johnson",
    specialty: "Internal Medicine",
    date: "2024-01-10",
    clinic: "Central Medical Center",
    status: "Completed",
    summary: "Comprehensive annual physical examination with routine screenings",
    vitals: {
      bloodPressure: "120/80 mmHg",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      weight: "165 lbs",
      height: "5'8\"",
    },
    findings: [
      "Blood pressure within normal range",
      "Heart rate regular and strong",
      "No abnormal findings on physical examination",
      "Recommended routine follow-up in 12 months",
    ],
    prescriptions: [],
    labResults: ["Complete Blood Count - Normal", "Lipid Panel - Normal", "Glucose - Normal"],
    cost: "$250.00",
  },
  {
    id: 2,
    type: "Lab Results",
    title: "Blood Test Results",
    doctor: "Dr. Sarah Johnson",
    specialty: "Internal Medicine",
    date: "2023-12-28",
    clinic: "City Lab",
    status: "Reviewed",
    summary: "Routine blood work including CBC, metabolic panel, and lipid profile",
    findings: [
      "Cholesterol levels slightly elevated",
      "All other values within normal range",
      "Recommend dietary modifications",
      "Follow-up testing in 6 months",
    ],
    prescriptions: [],
    labResults: [
      "Total Cholesterol: 210 mg/dL (High)",
      "HDL: 45 mg/dL (Normal)",
      "LDL: 140 mg/dL (Borderline High)",
      "Triglycerides: 125 mg/dL (Normal)",
    ],
    cost: "$85.00",
  },
  {
    id: 3,
    type: "Consultation",
    title: "Cardiology Consultation",
    doctor: "Dr. Michael Chen",
    specialty: "Cardiology",
    date: "2023-12-15",
    clinic: "Heart Specialists Center",
    status: "Completed",
    summary: "Follow-up consultation for elevated cholesterol and cardiovascular risk assessment",
    findings: [
      "EKG shows normal sinus rhythm",
      "Echocardiogram reveals normal heart function",
      "10-year cardiovascular risk: Low-moderate",
      "Lifestyle modifications recommended",
    ],
    prescriptions: [
      {
        medication: "Atorvastatin 20mg",
        dosage: "Once daily at bedtime",
        duration: "3 months, then reassess",
      },
    ],
    labResults: [],
    cost: "$180.00",
  },
]

const chronicConditions = ["Hypertension (Controlled)", "High Cholesterol"]
const allergies = ["Penicillin - Rash", "Shellfish - Mild reaction"]
const contraindications = ["NSAIDs - History of gastric ulcer"]

export function MedicalRecordsDetail() {
  return (
    <div className="space-y-6">
      {/* Health Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Chronic Conditions</h4>
                <p className="text-sm text-gray-600">{chronicConditions.length} conditions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Allergies</h4>
                <p className="text-sm text-gray-600">{allergies.length} known allergies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Pill className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Active Medications</h4>
                <p className="text-sm text-gray-600">1 prescription</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Medical Records */}
      <div className="space-y-6">
        {medicalRecords.map((record) => (
          <Card key={record.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{record.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{record.doctor}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(record.date).toLocaleDateString()}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {record.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{record.summary}</p>

              {/* Vitals */}
              {record.vitals && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Vital Signs
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">Blood Pressure</p>
                      <p className="font-medium">{record.vitals.bloodPressure}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Heart Rate</p>
                      <p className="font-medium">{record.vitals.heartRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Temperature</p>
                      <p className="font-medium">{record.vitals.temperature}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Weight</p>
                      <p className="font-medium">{record.vitals.weight}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Height</p>
                      <p className="font-medium">{record.vitals.height}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Findings */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Clinical Findings</h4>
                <ul className="space-y-1">
                  {record.findings.map((finding, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lab Results */}
              {record.labResults.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Laboratory Results</h4>
                  <div className="space-y-1">
                    {record.labResults.map((result, index) => (
                      <p key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {result}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Prescriptions */}
              {record.prescriptions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Pill className="w-4 h-4" />
                    Prescriptions
                  </h4>
                  <div className="space-y-2">
                    {record.prescriptions.map((prescription, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <p className="font-medium text-blue-900">{prescription.medication}</p>
                        <p className="text-sm text-blue-700">Dosage: {prescription.dosage}</p>
                        <p className="text-sm text-blue-700">Duration: {prescription.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>{record.clinic}</span>
                  <span>•</span>
                  <span>{record.specialty}</span>
                </div>
                <span className="font-medium text-green-600">{record.cost}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Health Conditions Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Chronic Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {chronicConditions.map((condition, index) => (
                <div key={index} className="p-2 bg-red-50 rounded text-sm text-red-800">
                  {condition}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Allergies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {allergies.map((allergy, index) => (
                <div key={index} className="p-2 bg-yellow-50 rounded text-sm text-yellow-800">
                  {allergy}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-500" />
              Contraindications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {contraindications.map((contraindication, index) => (
                <div key={index} className="p-2 bg-blue-50 rounded text-sm text-blue-800">
                  {contraindication}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
