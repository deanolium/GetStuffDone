const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  isDone: { type: Boolean, default: false },
  dueDate: { type: Date, default: Date.now },
})

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo
