import axios from 'axios'
import React, { VFC } from 'react'
import { TodoModel, TodoForm } from '../../types/Todo.type'
import EditableTodo from '../Todo/EditableTodo'
import TodoList from '../TodoList'
import Styles from './TodoPage.module.scss'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import MenuBar from './MenuBar'

const TodoPage: VFC = () => {
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery('todos', async () => {
    const { data } = await axios.get<{ todos: TodoModel[] }>(
      `${process.env.REACT_APP_API}/todos/`
    )
    return data
  })

  const createTodo = useMutation(
    async (todoData: TodoForm) => {
      await axios.post(`${process.env.REACT_APP_API}/todos/`, {
        title: todoData.title,
        description: todoData.description,
        dueDate: todoData.dueDate?.toISOString(),
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos')
      },
    }
  )

  return (
    <div>
      <MenuBar>Todo-a-rama</MenuBar>
      {isLoading || !data ? (
        <h1>Loading...</h1>
      ) : error ? (
        <div>
          <h1>Error</h1>
          <p>{(error as Error)?.message ?? 'Unknown error'}</p>
        </div>
      ) : (
        <div className={Styles.container}>
          <TodoList todos={data.todos} />
          <EditableTodo onSubmit={(newTodo) => createTodo.mutate(newTodo)} />
        </div>
      )}
    </div>
  )
}

export default TodoPage
