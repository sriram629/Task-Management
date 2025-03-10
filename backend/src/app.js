const express = require('express')
const ErrorHandling = require('./middlwares/ErrorHandling')
const { ApiError } = require('./utils/ApiError')
const cors = require('cors')
const app = express()

//midlewares
const allowedOrigins = [
  'https://task-management-61zakloek-srirama-krishnas-projects.vercel.app',
]

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use('/api/v1', require('./routes'))

app.use('*', (req, res) => {
  throw new ApiError(404, 'page not found')
})

app.use(ErrorHandling)

module.exports = app
