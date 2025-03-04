require('dotenv').config({})
require('colors')
const app = require('./src/app')
const { ConnectDB } = require('./src/config/db.config')
const port = process.env.PORT || 8000
ConnectDB()

app.listen(port, '0.0.0.0', () => {
  console.log(`> Server running on port ${port}`)
})
