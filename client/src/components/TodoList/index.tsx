/* eslint-disable array-callback-return */
import axios from 'axios'
import React, { VFC } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { selectMode } from '../../redux/selectors/mode.selectors'
import { enterViewMode, Modes } from '../../redux/slices/modes'
import { TodoForm, TodoModel } from '../../types/Todo.type'
import Todo from '../Todo'
import EditableTodo from '../Todo/EditableTodo'

interface TodoListProps {
  todos?: TodoModel[]
}

const TodoList: VFC<TodoListProps> = ({ todos }) => {
  const mode = useSelector(selectMode)
  const dispatch = useDispatch()
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

  const updateTodo = useMutation(
    async ({ id, todo }: { id: string; todo: TodoForm }) => {
      await axios.put(`${process.env.REACT_APP_API}/todos/${id}`, {
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate?.toISOString(),
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos')
        dispatch(enterViewMode())
      },
    }
  )

  return (
    <>
      {todos?.map((todo) =>
        mode === Modes.View ? (
          <Todo
            key={todo._id}
            todo={todo}
            onClick={() => switchTodoDoneState.mutate(todo)}
          />
        ) : (
          <EditableTodo
            key={todo._id}
            todo={todo}
            onSubmit={(todoForm) =>
              updateTodo.mutate({ id: todo._id, todo: todoForm })
            }
          />
        )
      )}
    </>
  )
}

export default TodoList
