import React, { VFC } from 'react'
import EditStyles from './EditableTodo.module.scss'
import TodoStyles from '../Todo.module.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TodoForm, TodoModel } from '../../../types/Todo.type'

const todoSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  dueDate: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
})

interface EditableTodoProps {
  todo?: TodoModel
  onSubmit: (todoData: TodoForm) => void
}

const EditableTodo: VFC<EditableTodoProps> = ({ todo, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(todoSchema),
  })

  const onHandleSubmit = (data: TodoForm) => {
    onSubmit(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <article className={TodoStyles.todo}>
        <header>
          <div className={TodoStyles.title}>
            <input
              type="text"
              className={EditStyles.editTitle}
              placeholder="Enter title"
              defaultValue={todo?.title}
              {...register('title')}
              required
            />
          </div>
          <div className={TodoStyles.status}>
            <button type="submit">Save</button>{' '}
          </div>
        </header>
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <textarea
            placeholder="Enter description (optional)"
            className={EditStyles.editDescription}
            defaultValue={todo?.description}
            {...register('description')}
          />
        </section>
        <footer>
          Due:{' '}
          <input
            type="date"
            defaultValue={
              todo?.dueDate && new Date(todo.dueDate).toISOString().slice(0, 10)
            }
            {...register('dueDate')}
          />
        </footer>
      </article>
      {Object.keys(errors).map((errorID) => (
        <p>{errors[errorID].message}</p>
      ))}
    </form>
  )
}

export default EditableTodo
