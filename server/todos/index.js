const express = require("express")
const Todo = require("../db/todo.model")

const router = express.Router()

// Basic REST routes

// TODO: Add in user auth for these!
router.get("/", async (req, res) => {
  const todos = await Todo.find()
  res.json({
    todos,
  })
})

router.get("/:id", async (req, res) => {
  try {
    const foundTodo = await Todo.findOne({ _id: req.params.id })
    if (foundTodo) {
      res.json({ todo: foundTodo })
    } else {
      res.json({ response: "💩", error: `Todo ${req.params.id} not found` })
    }
  } catch (err) {
    res.status = 400
    res.json({ response: "💩", error: err })
  }
})

router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body)
    await newTodo.save()
    res.json({ todo: newTodo })
  } catch (err) {
    res.status = 400
    res.json({ response: "💩", error: err })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    )
    if (updatedTodo) {
      res.json({ todo: updatedTodo })
    } else {
      res.json({ response: "💩", error: `Todo ${req.params.id} not found` })
    }
  } catch (err) {
    res.status = 400
    res.json({ response: "💩", error: err })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const response = await Todo.deleteOne({ _id: req.params.id })
    if (response.n > 0) {
      res.json({ response: "👍" })
    } else {
      res.json({ response: "💩", error: `Todo ${req.params.id} not found` })
    }
  } catch (err) {
    res.status = 400
    res.json({ response: "💩", error: err })
  }
})

// deal with completing or reopening todos
router.put("/:id/close", async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { isDone: true },
      { new: true }
    )
    if (updatedTodo) {
      res.json({ todo: updatedTodo })
    } else {
      res.json({ response: "💩", error: `Todo ${req.params.id} not found` })
    }
  } catch (err) {
    res.status = 400
    res.json({ response: "💩", error: err })
  }
})

router.put("/:id/reopen", async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { isDone: false },
      { new: true }
    )
    if (updatedTodo) {
      res.json({ todo: updatedTodo })
    } else {
      res.json({ response: "💩", error: `Todo ${req.params.id} not found` })
    }
  } catch (err) {
    res.status = 400
    res.json({ response: "💩", error: err })
  }
})

module.exports = router
