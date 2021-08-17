const express = require("express")
const Todo = require("../db/todo.model")

const router = express.Router()

router.get("/", async (req, res) => {
  const todos = await Todo.find()
  res.json({
    response: "🔥",
    todos,
  })
})

router.post("/add", async (req, res) => {
  // req.body holds the bits for the todo
  const newTodo = new Todo(req.body)
  await newTodo.save()
  res.json({ response: "🔥", todo: newTodo })
})

module.exports = router
