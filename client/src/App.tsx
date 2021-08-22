import React, { useEffect } from 'react'
import axios from 'axios'
import { useCallback } from 'react'
import { useState } from 'react'
import './App.css'
import { TodoForm, TodoModel } from './types/Todo.type'
import Todo from './components/Todo'
import EditableTodo from './components/EditableTodo/index'

function App() {
  const [todos, setTodos] = useState<TodoModel[]>()

  const fetchTodos = useCallback(async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/todos/`)
    setTodos(data?.todos)
  }, [])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const handleClick = async (todo: TodoModel) => {
    const method = todo.isDone ? 'reopen' : 'close'
    await axios.put(`${process.env.REACT_APP_API}/todos/${todo._id}/${method}`)
    fetchTodos()
  }

  const handleCreateTodo = async (todoData: TodoForm) => {
    await axios.post(`${process.env.REACT_APP_API}/todos/`, {
      title: todoData.title,
      description: todoData.description,
      dueDate: todoData.dueDate?.toISOString,
    })

    fetchTodos()
  }

  return (
    <div>
      <h1>Todos!</h1>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {todos?.map((todo) => (
          <Todo key={todo._id} todo={todo} onClick={() => handleClick(todo)} />
        ))}

        <EditableTodo onSubmit={handleCreateTodo} />
      </div>
    </div>
  )
}

export default App
