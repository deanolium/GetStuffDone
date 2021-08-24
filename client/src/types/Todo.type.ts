export interface TodoModel {
  _id: string
  title: string
  description: string
  isDone: boolean
  dueDate: string
}

export interface TodoForm {
  title: string
  description?: string
  dueDate?: Date
}
