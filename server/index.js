const express = require("express")
const dotenv = require("dotenv")

const helmet = require("helmet")
const morgan = require("morgan")

const todos = require("./todos")

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(helmet())
app.use(morgan("common"))

app.use("/todos", todos)
app.get("/", (req, res) => {
  res.send("👋 Hello World 🐶")
})

app.listen(process.env.PORT)
