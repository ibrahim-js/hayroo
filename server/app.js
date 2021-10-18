import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRouter from './routes/auth.js'
import usersRouter from './routes/users.js'
import categoryRouter from './routes/categories.js'
import productRouter from './routes/products.js'
import orderRouter from './routes/orders.js'
import customizeRouter from './routes/customize.js'

dotenv.config()
const app = express()

// app.use(morgan('dev')) // TRACKING REQUESTS
app.use(cookieParser())
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => { res.send('APP is running...') })
app.use('/api', authRouter)
app.use('/api/user', usersRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)
app.use('/api/customize', customizeRouter)

const PORT = process.env.PORT || 5000
const DATABASE = process.env.DATABASE

const runServer = async () => {
  try {
    await mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  } catch (error) {
    console.log(`Database not connected | ${error.message}`)
  }
}

runServer()
