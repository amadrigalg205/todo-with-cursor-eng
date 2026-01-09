"use client"

import { useState, useEffect } from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { TodoForm } from "./todo-form"
import { TodoList, type Todo } from "./todo-list"
import { Card } from "@/components/ui/card"

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [mounted, setMounted] = useState(false)

  // Load todos from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved) {
      setTodos(JSON.parse(saved))
    }
    setMounted(true)
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos, mounted])

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
    }
    setTodos([newTodo, ...todos])
  }

  const updateTodo = (id: string, title: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)))
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const completedCount = todos.filter((t) => t.completed).length
  const totalCount = todos.length

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        <Card className="p-6 shadow-lg">
          <TodoForm onAddTodo={addTodo} />

          {totalCount > 0 && (
            <div className="mt-6 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                Progress: <span className="font-bold text-blue-600">{completedCount}</span> of{" "}
                <span className="font-bold text-blue-600">{totalCount}</span> tasks completed
              </p>
            </div>
          )}

          <TodoList todos={todos} onUpdate={updateTodo} onToggle={toggleTodo} onDelete={deleteTodo} />
        </Card>
      </main>

      <Footer />
    </div>
  )
}
