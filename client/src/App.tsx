import React, { useEffect } from 'react'
import axios from 'axios'
import { useCallback } from 'react'
import { useState } from 'react'
import './App.css'
import { TodoForm, TodoModel } from './types/Todo.type'
import Todo from './components/Todo'
import EditableTodo from './components/Todo/EditableTodo/index'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState<TodoModel[]>()

  const fetchTodos = useCallback(async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/todos/`)
    setTodos(data?.todos)
  }, [])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const handleCreateTodo = async (todoData: TodoForm) => {
    await axios.post(`${process.env.REACT_APP_API}/todos/`, {
      title: todoData.title,
      description: todoData.description,
      dueDate: todoData.dueDate?.toISOString(),
    })

    fetchTodos()
  }

  return (
    <div>
      <h1>Todos!</h1>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <TodoList todos={todos} fetchTodos={fetchTodos} />
        <EditableTodo onSubmit={handleCreateTodo} />
      </div>
    </div>
  )
}

export default App
