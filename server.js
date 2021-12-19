require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/images', express.static('static/images'))

// Routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)

mongoose.connect(process.env.MONGODB_URL, {}, (err) => {
  if (err) throw err
  console.log('Connected to Database')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
