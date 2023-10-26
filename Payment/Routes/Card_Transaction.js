const express = require('express')
const router = express.Router()
const Card_Transaction = require('../Controllers/Card_Transaction.controllers')
const authmiddleware = require('../Utils/auth')
router.post('/deposit',authmiddleware.authuser,Card_Transaction.Create_Card_Transaction)
router.post('/deposit/pin/:id',authmiddleware.authuser,Card_Transaction.CompleteCardTransaction)
module.exports = router