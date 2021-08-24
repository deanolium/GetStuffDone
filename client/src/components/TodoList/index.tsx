import axios from 'axios'
import React, { VFC } from 'react'
import { TodoModel } from '../../types/Todo.type'
import Todo from '../Todo'

interface TodoListProps {
  todos?: TodoModel[]
  fetchTodos: () => void
}

const TodoList: VFC<TodoListProps> = ({ todos, fetchTodos }) => {
  const switchTodoDoneState = async (todo: TodoModel) => {
    const method = todo.isDone ? 'reopen' : 'close'
    await axios.put(`${process.env.REACT_APP_API}/todos/${todo._id}/${method}`)
    fetchTodos()
  }

  return (
    <>
      {todos?.map((todo) => (
        <Todo
          key={todo._id}
          todo={todo}
          onClick={() => switchTodoDoneState(todo)}
        />
      ))}
    </>
  )
}

export default TodoList
