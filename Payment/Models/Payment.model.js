const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Paymentschema = new Schema({
    Hash:{
        type:String,
        required:true,
        unique:true
    },
    User:{
        type:String,
        required:true
    },
    Recipent_Name:{
        type:String,
        required:true,
    },
    Recipent_Signature:{
        type:String,
        required:true,
    },
    Amount:{
        type:Number,
        required:true
    },
    Status:{
        type:String,
        enum:['Initiated','Successful','Failed'],
        required:true,
        default:'Initiated'
    }
},{timestamps:true})

module.exports = mongoose.model('Payment',Paymentschema);