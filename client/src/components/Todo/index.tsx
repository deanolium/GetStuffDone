import React, { VFC } from 'react'
import Styles from './Todo.module.scss'
import ReactMarkdown from 'react-markdown'
import { TodoModel } from '../../types/Todo.type'

interface TodoProps {
  todo: TodoModel
  deletable?: boolean
  onClick: () => void
}

const Todo: VFC<TodoProps> = ({ todo, deletable, onClick }) => {
  let dueDate = undefined,
    pastDue = false
  if (todo.dueDate) {
    dueDate = new Date(todo.dueDate)
    pastDue = !todo.isDone && new Date(new Date().toDateString()) > dueDate
  }

  return (
    <article className={Styles.todo}>
      <header>
        <div className={`${Styles.title} ${pastDue && Styles.pastDue}`}>
          {todo.title}
        </div>
        <div className={Styles.status} onClick={onClick}>
          {deletable ? '🗑' : todo.isDone ? '👍' : '👎'}
        </div>
      </header>
      <section>
        <ReactMarkdown>{todo.description}</ReactMarkdown>
      </section>
      <footer className={`${pastDue && Styles.pastDue}`}>
        {dueDate && <span>Due: {dueDate.toDateString()}</span>}
        &nbsp;
      </footer>
    </article>
  )
}

export default Todo
