"use client"

import { TodoItem } from "./todo-item"

export interface Todo {
  id: string
  title: string
  completed: boolean
}

interface TodoListProps {
  todos: Todo[]
  onUpdate: (id: string, title: string) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onUpdate, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No tasks yet. Add one to get started! 🎯</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  )
}
