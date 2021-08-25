import axios from 'axios'
import { TodoForm, TodoModel } from '../types/Todo.type'

export const getTodosAPI = async () => {
  const { data } = await axios.get<{ todos: TodoModel[] }>(
    `${process.env.REACT_APP_API}/todos/`
  )
  return data
}

export const createTodoAPI = async (todoData: TodoForm) => {
  await axios.post(`${process.env.REACT_APP_API}/todos/`, {
    title: todoData.title,
    description: todoData.description,
    dueDate: todoData.dueDate?.toISOString(),
  })
}

export const switchTodoStateAPI = async (todo: TodoModel) => {
  const method = todo.isDone ? 'reopen' : 'close'
  await axios.put(`${process.env.REACT_APP_API}/todos/${todo._id}/${method}`)
}

export const updateTodoAPI = async ({
  id,
  todo,
}: {
  id: string
  todo: TodoForm
}) => {
  await axios.put(`${process.env.REACT_APP_API}/todos/${id}`, {
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate?.toISOString(),
  })
}

export const deleteTodoAPI = async (id: string) => {
  await axios.delete(`${process.env.REACT_APP_API}/todos/${id}`)
}
