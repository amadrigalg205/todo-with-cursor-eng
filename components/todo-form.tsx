"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

interface TodoFormProps {
  onAddTodo: (title: string) => void
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onAddTodo(input)
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 gap-2">
        <Plus className="w-4 h-4" />
        Add
      </Button>
    </form>
  )
}
