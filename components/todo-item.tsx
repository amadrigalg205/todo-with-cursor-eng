"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Check, X } from "lucide-react"
import { useState } from "react"

interface TodoItemProps {
  id: string
  title: string
  completed: boolean
  onUpdate: (id: string, title: string) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ id, title, completed, onUpdate, onToggle, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)

  const handleSave = () => {
    if (editedTitle.trim()) {
      onUpdate(id, editedTitle)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditedTitle(title)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <Checkbox checked={completed} onCheckedChange={() => onToggle(id)} className="w-5 h-5" />

      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <Input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} autoFocus className="flex-1" />
          <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700 gap-1">
            <Check className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 text-lg cursor-pointer ${completed ? "line-through text-gray-400" : "text-gray-800"}`}
            onClick={() => setIsEditing(true)}
            role="button"
            tabIndex={0}
          >
            {title}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(id)}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  )
}
