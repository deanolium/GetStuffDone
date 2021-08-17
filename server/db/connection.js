const mongoose = require("mongoose")

const connectDB = () =>
  mongoose.connect(process.env.MONGO_DB_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

module.exports = connectDB
