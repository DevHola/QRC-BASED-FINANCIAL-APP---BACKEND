const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const connection = require('./config/Database')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false }))
app.use(morgan('combined'))

//
const userroute = require('./Routes/user.route')
app.use('/users',userroute)

const Port = process.env.PORT || 8001;
app.listen(Port,()=>{
    console.log(`listening on port ${Port}`)
    connection();
})