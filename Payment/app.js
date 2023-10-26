const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config()
const connect = require('./Utils/Dbconnect')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('combined'))

const wroute = require('./Routes/wallet')
const payroute = require('./Routes/payment')
const ctroute = require('./Routes/Card_Transaction')
app.use('/api', wroute)
app.use('/api', payroute)
app.use('/api', ctroute)

const Port = process.env.Port
app.listen(Port, () => {
  console.log(`Listening On Port ${Port}`)
  connect()
})
