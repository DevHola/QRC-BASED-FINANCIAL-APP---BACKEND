const express = require('express');
const router = express.Router();
const authmiddleware = require('../Utils/auth')
const WalletController = require('../Controllers/Wallet.controllers');
router.post('/wc',authmiddleware.authuser,WalletController.create_wallet);
router.get('/wallet/:id',WalletController.Getwalletviaaddress)
router.get('/wallet/user/:id',WalletController.GetUserwallet)
router.get('/wallets',WalletController.GetAllwallets)
module.exports= router;