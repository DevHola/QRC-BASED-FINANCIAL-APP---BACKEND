const mongoose = require('mongoose')
const Schema = mongoose.Schema
const card_transaction = new Schema({
    ct_id:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    wallet_reference:{
        type:String,
        required:true
    },
    balance_before:{
        type:Number,
        required:true
    },
    balance_after:{
        type:Number,
        required:true,
        default:0
    },
    amount:{
        type:Number,
        required:true
    },
    reference_No:{
        type:String,
        default:"Awaiting Reference Number ",
        unique:true,
        required:true
    },
    trans_type:{
        type:String,
        enum:['Wallet_Credit','Wallet_Debit'],
        required:true
    },
    trans_status:{
        type:String,
        enum:['Inititated','Failed','Success'],
        default:"Inititated"
    }
},{timestamps:true})
module.exports = mongoose.model('Card_transaction',card_transaction)