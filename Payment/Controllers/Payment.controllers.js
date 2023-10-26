const PAYMENTSVS = require('../Services/Payment.services')
const crypto = require('crypto')

//
const InitializeP2PI = async(req,res)=>{

    try {
        const id = await crypto.randomBytes(10).toString('hex')
        const data = {
            Sender: req.user.Email,
            Payment_ID: process.env.Prefix + id
        }
        const merge = {...data,...req.body}
       // console.log(merge);
        const initiate = await PAYMENTSVS.InitPayment(merge);
        return res.status(200).json({
        "STATUS":'PAYMENT_STATUS',
        "Message":'Transaction Initiated',
        "init":initiate
        })
    } catch (error) {
        return res.status(500).json({
            "Message":error
        })
    }

}

const allwallettransaction = async (req,res)=>{
    try {
      const transactions = await PAYMENTSVS.ALLWALLETTRANSACTION(req.params.id)
      if(transactions){
        res.status(200).json({'Transaction':transactions})
      }
    } catch (error) {
        res.status(500).json({'error':error})
    }
}

const GetPaymentdetail = async (req,res)=>{
    try {
       const details = await PAYMENTSVS.GetPayment(req.params.id);
       if(details){
        res.status(200).json({
            'Transaction':details
        })
       }

    } catch (error) {
        res.status(500).json({
            'error':error
        })
    }
}
module.exports = {
    InitializeP2PI,
    allwallettransaction,
    GetPaymentdetail
}