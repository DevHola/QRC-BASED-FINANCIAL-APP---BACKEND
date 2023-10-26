const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    Fullname:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        select: false ,
        required:true,
    },
    OTP:{
        type:String,
        required:true,
        default:null
    },
    Verified:{
        type:Boolean,
        default:0
    }
},{timestamps:true})
module.exports = mongoose.model('Users',userSchema)
/*
USERNAME
FIRSTNAME
LASTNAME
PHONE NUMBER
ADDRESS
*/