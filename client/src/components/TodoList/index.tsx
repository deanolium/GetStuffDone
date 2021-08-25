import React, { VFC } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { selectMode } from '../../redux/selectors/mode.selectors'
import { enterViewMode, Modes } from '../../redux/slices/modes'
import { TodoModel } from '../../types/Todo.type'
import Todo from '../Todo'
import EditableTodo from '../Todo/EditableTodo'
import {
  deleteTodoAPI,
  updateTodoAPI,
  switchTodoStateAPI,
} from '../../api/index'

interface TodoListProps {
  todos?: TodoModel[]
}

const TodoList: VFC<TodoListProps> = ({ todos }) => {
  const mode = useSelector(selectMode)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const switchTodoDoneState = useMutation(switchTodoStateAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  const updateTodo = useMutation(updateTodoAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
      dispatch(enterViewMode())
    },
  })

  const deleteTodo = useMutation(deleteTodoAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

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
