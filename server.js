const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app')
const mongoose = require('mongoose')

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

const connectDB = async () => {
  const conn = await mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  console.log(`MongoDB connected: ${conn.connection.host}`)
}

connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
