const mongoose = require('mongoose')
const Schema = mongoose.Schema
const WalletSchema = new Schema({
    Address:{
        type:String,
        required:true,
        unique:true
    },
    Balance:{
        type:Number,
        required:true,
        default: 0
    },
    User:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Wallet',WalletSchema);