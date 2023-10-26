const CardTrans_Service = require('../Services/Card_Transaction.services')
const crypto = require('crypto')
const Create_Card_Transaction = async (req,res)=>{
    try {
        const ct_id = await crypto.randomBytes(10).toString('hex')
        const data = {
            ct_id:ct_id,
            amount:req.body.amount,
            user:req.user.Email,
            trans_type:'Wallet_Credit'
        }
        console.log(data.ct_id)
        const cardtrans = await CardTrans_Service.Create_Card_Transaction(data)
        if(cardtrans){
            res.status(200).json({
                message:'Transaction Initiated',
                status:cardtrans.trans_status
            })
        }

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
//
const CompleteCardTransaction = async (req,res)=>{
    try {
        const findct_id = await CardTrans_Service.getcardtransaction(req.params.id)
        const data ={
            ct_id:req.params.id,
            reference:findct_id.reference_No,
            user:req.user.Email,
            pin:req.body.pin

        }
   const cardtrans = await CardTrans_Service.CompleteCardTransaction(data)
 //  console.log(".........")
   //console.log(cardtrans)
        res.status(200).json({
            'status':cardtrans.trans_status
        })
    } catch (error) {
        res.status(500).json({error:error})
    }
}
module.exports={
    Create_Card_Transaction,CompleteCardTransaction
}