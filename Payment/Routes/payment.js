const express = require('express')
const router = express.Router()
const Paymentcontroller = require('../Controllers/Payment.controllers')
const authmiddleware = require('../Utils/auth')
router.post('/pay',authmiddleware.authuser,Paymentcontroller.InitializeP2PI);
router.get('/wallet/pay/user/:id',authmiddleware.authuser,Paymentcontroller.allwallettransaction)
router.get('/payment/:id',authmiddleware.authuser,Paymentcontroller.GetPaymentdetail)

module.exports = router