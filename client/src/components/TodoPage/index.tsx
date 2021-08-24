import axios from 'axios'
import React, { useCallback, useEffect, useState, VFC } from 'react'
import { TodoModel, TodoForm } from '../../types/Todo.type'
import EditableTodo from '../Todo/EditableTodo'
import TodoList from '../TodoList'
import Styles from './TodoPage.module.scss'

const TodoPage: VFC = () => {
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
      <header>
        <h1>Todo-a-rama</h1>
      </header>
      <div className={Styles.container}>
        <TodoList todos={todos} fetchTodos={fetchTodos} />
        <EditableTodo onSubmit={handleCreateTodo} />
      </div>
    </div>
  )
}

export default TodoPage
