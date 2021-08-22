import React, { VFC } from 'react'
import Styles from '../Todo/Todo.module.scss'
// import { TodoModel } from '../../types/Todo.type'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TodoForm } from '../../types/Todo.type'

const todoSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  dueDate: yup.date(),
})

const EditableTodo: VFC<{ onSubmit: (todoData: TodoForm) => void }> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(todoSchema) })

  const onHandleSubmit = (data: TodoForm) => {
    onSubmit(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <article className={Styles.todo}>
        <header>
          <div className={`${Styles.title}`}>
            <input type="text" {...register('title')} />
          </div>
          <div className={Styles.status}>
            <button type="submit">Save</button>{' '}
          </div>
        </header>
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <textarea
            style={{
              flex: '1 0 auto',
              width: 'calc(100% + 1rem)',
              boxSizing: 'border-box',
              outline: 'none',
              resize: 'none',
              border: 'none',
              margin: '-0.5rem -0.5rem -1.5rem -0.5rem',
            }}
            {...register('description')}
          />
        </section>
        <footer>
          Due: <input type="date" {...register('dueDate')} />
        </footer>
      </article>
      {Object.keys(errors).map((errorID) => (
        <p>{errors[errorID].message}</p>
      ))}
    </form>
  )
}

export default EditableTodo
