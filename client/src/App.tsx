import React, { useEffect } from 'react'
import axios from 'axios'
import { useCallback } from 'react'
import { useState } from 'react'
import './App.css'
import { TodoModel } from './types/Todo.type'
import Todo from './components/Todo'

function App() {
  const [todos, setTodos] = useState<TodoModel[]>()

  const fetchTodos = useCallback(() => {
    axios(`${process.env.REACT_APP_API}/todos/`, {
      method: 'GET',
    }).then((res) => {
      setTodos(res.data?.todos)
    })
  }, [])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const handleClick = (todo: TodoModel) => {
    const method = todo.isDone ? 'reopen' : 'close'

    axios(`${process.env.REACT_APP_API}/todos/${todo._id}/${method}`, {
      method: 'PUT',
    }).then((res) => {
      fetchTodos()
    })
  }

  return (
    <div>
      <h1>Todos!</h1>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {todos?.map((todo) => (
          <Todo key={todo._id} todo={todo} onClick={() => handleClick(todo)} />
        ))}

        <Todo
          todo={{
            _id: 'newTodo',
            title: 'New Todo',
            description: '_Enter description here..._',
            isDone: false,
            dueDate: '',
          }}
          onClick={() => {}}
        />
      </div>
    </div>
  )
}

export default App
