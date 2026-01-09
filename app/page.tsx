"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, Trash2, Check, X } from "lucide-react"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState("")

  const addTodo = () => {
    if (inputValue.trim() === "") return

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    }

    setTodos([...todos, newTodo])
    setInputValue("")
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id)
    setEditingText(todo.text)
  }

  const saveEdit = () => {
    if (editingText.trim() === "") return

    setTodos(todos.map((todo) => (todo.id === editingId ? { ...todo, text: editingText } : todo)))
    setEditingId(null)
    setEditingText("")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText("")
  }

  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-indigo-600 text-balance">My Todo List</h1>
          <p className="text-muted-foreground mt-1">Organize your tasks efficiently</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {/* Add Todo Input */}
            <div className="flex gap-2 mb-6">
              <Input
                type="text"
                placeholder="Enter a new task..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
                className="flex-1"
              />
              <Button onClick={addTodo} className="bg-indigo-600 hover:bg-indigo-700">
                Add Task
              </Button>
            </div>

            {/* Todo List */}
            <div className="space-y-3">
              {todos.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No tasks yet. Add your first task above!</p>
              ) : (
                todos.map((todo) => (
                  <Card key={todo.id} className="border bg-card">
                    <CardContent className="p-4">
                      {editingId === todo.id ? (
                        // Edit Mode
                        <div className="flex gap-2 items-center">
                          <Input
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                            className="flex-1"
                            autoFocus
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={saveEdit}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={cancelEdit}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        // View Mode
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 flex-1">
                            <input
                              type="checkbox"
                              checked={todo.completed}
                              onChange={() => toggleComplete(todo.id)}
                              className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                            <span
                              className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                            >
                              {todo.text}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => startEditing(todo)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => deleteTodo(todo.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Todo Stats */}
            {todos.length > 0 && (
              <div className="mt-6 pt-4 border-t text-sm text-muted-foreground text-center">
                {todos.filter((t) => t.completed).length} of {todos.length} tasks completed
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          <p>© 2026 Todo List App. Stay organized, stay productive.</p>
        </div>
      </footer>
    </div>
  )
}
