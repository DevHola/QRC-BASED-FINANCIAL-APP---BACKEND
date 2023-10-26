const express = require('express');
const router = express.Router();
const User_controller = require('../Controllers/user.controller')
const tokengen = require('../config/Jwt')
const mail_controller = require('../Controllers/mail')
const otp_controller = require('../Controllers/otp')
//Registration Flow
router.post('/register',User_controller.CreateUser);
router.post('/mail',mail_controller.mail)
router.post('/login',User_controller.login);
router.post('/forgetpassword',User_controller.forget_verify_user);
router.post('/otp/generate/:id',otp_controller.generateotp)
router.post('/otp/verify/:Email',otp_controller.Authverifyotp)
router.get('/user',tokengen.verify,User_controller.getuserbyid)
router.get('/:id',User_controller.getuserbymail)
router.get('/code',otp_controller.code)
router.put('/user/forget/:id',User_controller.Forgetpassword)

module.exports= router