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

  const deleteTodo = useMutation(
    async (id: string) => {
      await axios.delete(`${process.env.REACT_APP_API}/todos/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos')
      },
    }
  )

  const RenderTodo: VFC<{ todo: TodoModel }> = ({ todo }) => {
    switch (mode) {
      case Modes.View:
        return (
          <Todo
            key={todo._id}
            todo={todo}
            onClick={() => switchTodoDoneState.mutate(todo)}
          />
        )

      case Modes.Edit:
        return (
          <EditableTodo
            key={todo._id}
            todo={todo}
            onSubmit={(todoForm) =>
              updateTodo.mutate({ id: todo._id, todo: todoForm })
            }
          />
        )

      case Modes.Delete:
        return (
          <Todo
            key={todo._id}
            todo={todo}
            deletable
            onClick={() => deleteTodo.mutate(todo._id)}
          />
        )
    }
  }

  return (
    <>
      {todos?.map((todo) => (
        <RenderTodo key={todo._id} todo={todo} />
      ))}
    </>
  )
}

export default TodoList
