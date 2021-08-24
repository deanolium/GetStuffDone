import axios from 'axios'
import React, { VFC } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { TodoModel } from '../../types/Todo.type'
import Todo from '../Todo'

interface TodoListProps {
  todos?: TodoModel[]
}

const TodoList: VFC<TodoListProps> = ({ todos }) => {
  const queryClient = useQueryClient()

  const switchTodoDoneState = useMutation(
    async (todo: TodoModel) => {
      const method = todo.isDone ? 'reopen' : 'close'
      await axios.put(
        `${process.env.REACT_APP_API}/todos/${todo._id}/${method}`
      )
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos')
      },
    }
  )

  return (
    <>
      {todos?.map((todo) => (
        <Todo
          key={todo._id}
          todo={todo}
          onClick={() => switchTodoDoneState.mutate(todo)}
        />
      ))}
    </>
  )
}

export default TodoList
