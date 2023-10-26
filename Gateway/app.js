const express = require('express')
const cors = require('cors')
const proxy = require('express-http-proxy')
const morgan = require('morgan')

const app = express()
app.use(cors())
app.use(morgan('combined'))
app.use('/users', proxy('http://localhost:8001'))
app.use('/Payment', proxy('http://localhost:8002'))

const Port = process.env.Port || 8000
app.listen(Port, () => {
  console.log(`Listening on Port ${Port}`)
})
