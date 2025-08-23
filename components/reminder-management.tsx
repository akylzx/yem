"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Plus, Trash2, Clock } from "lucide-react"

interface Reminder {
  id: string
  title: string
  time: string
  completed: boolean
  category: "medication" | "appointment" | "exercise" | "other"
}

interface ReminderManagementProps {
  reminders: Reminder[]
  onRemindersUpdate: (reminders: Reminder[]) => void
}

export function ReminderManagement({ reminders, onRemindersUpdate }: ReminderManagementProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newReminder, setNewReminder] = useState({
    title: "",
    time: "",
    category: "other" as const,
  })

  const handleToggleReminder = (id: string) => {
    console.log("[v0] Toggling reminder:", id)
    const updatedReminders = reminders.map((reminder) =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder,
    )
    console.log("[v0] Updated reminders after toggle:", updatedReminders)
    onRemindersUpdate(updatedReminders)
  }

  const handleDeleteReminder = (id: string) => {
    console.log("[v0] Deleting reminder:", id)
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id)
    console.log("[v0] Updated reminders after delete:", updatedReminders)
    onRemindersUpdate(updatedReminders)
  }

  const handleAddReminder = () => {
    console.log("[v0] Adding reminder with data:", newReminder)
    console.log("[v0] Current reminders before add:", reminders)

    if (!newReminder.title.trim()) {
      console.log("[v0] Missing title, aborting add")
      return
    }

    const defaultTime =
      newReminder.time ||
      new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })

    const reminder: Reminder = {
      id: Date.now().toString(),
      title: newReminder.title.trim(),
      time: defaultTime,
      completed: false,
      category: newReminder.category,
    }

    console.log("[v0] New reminder object:", reminder)
    const updatedReminders = [...reminders, reminder]
    console.log("[v0] Updated reminders array:", updatedReminders)

    onRemindersUpdate(updatedReminders)
    setNewReminder({ title: "", time: "", category: "other" })
    setIsAddModalOpen(false)
    console.log("[v0] Add reminder completed, modal closed")
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "medication":
        return "text-blue-600"
      case "appointment":
        return "text-green-600"
      case "exercise":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="w-5 h-5 text-green-600" />
            Today's Reminders
          </CardTitle>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Reminder</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reminder-title">Reminder Title</Label>
                  <Input
                    id="reminder-title"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                    placeholder="e.g., Take medication"
                  />
                </div>
                <div>
                  <Label htmlFor="reminder-time">Time (optional)</Label>
                  <Input
                    id="reminder-time"
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                    placeholder="Leave empty for current time"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty to use current time as default</p>
                </div>
                <div>
                  <Label htmlFor="reminder-category">Category</Label>
                  <Select
                    value={newReminder.category}
                    onValueChange={(value: any) => setNewReminder({ ...newReminder, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medication">Medication</SelectItem>
                      <SelectItem value="appointment">Appointment</SelectItem>
                      <SelectItem value="exercise">Exercise</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddReminder} className="bg-green-500 hover:bg-green-600">
                    Add Reminder
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {reminders.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">No reminders for today</p>
          </div>
        ) : (
          reminders.map((reminder) => (
            <div key={reminder.id} className="flex items-center gap-3 group">
              <Checkbox
                id={reminder.id}
                checked={reminder.completed}
                onCheckedChange={() => handleToggleReminder(reminder.id)}
                className="data-[state=checked]:bg-green-600"
              />
              <div className="flex-1">
                <label
                  htmlFor={reminder.id}
                  className={`text-sm font-medium cursor-pointer ${
                    reminder.completed ? "line-through text-gray-500" : "text-gray-900"
                  }`}
                >
                  {reminder.title}
                </label>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500">
                    {new Date(`2000-01-01T${reminder.time}`).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                  <span className={`text-xs capitalize ${getCategoryColor(reminder.category)}`}>
                    {reminder.category}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteReminder(reminder.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
