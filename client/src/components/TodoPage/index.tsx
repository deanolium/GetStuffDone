import React, { VFC } from 'react'
import EditableTodo from '../Todo/EditableTodo'
import TodoList from '../TodoList'
import Styles from './TodoPage.module.scss'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import MenuBar from './MenuBar'
import { createTodoAPI, getTodosAPI } from '../../api'

const TodoPage: VFC = () => {
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery('todos', getTodosAPI)

  const createTodo = useMutation(createTodoAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

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
