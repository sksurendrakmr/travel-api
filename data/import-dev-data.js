const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const mongoose = require('mongoose')
const fs = require('fs')
const Tour = require('./../models/tourModel')
const { join } = require('path')

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

//?Read JOSN FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
)

//?Import DATA INTO DATABASE

const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('Data successfully addded')
    process.exit()
  } catch (error) {
    console.log(error)
  }
}

//?DELETE ALL DATA FROM COLLECTIONS
const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('Data successfully deleted')
    process.exit()
  } catch (error) {
    console.log(error)
  }
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}
