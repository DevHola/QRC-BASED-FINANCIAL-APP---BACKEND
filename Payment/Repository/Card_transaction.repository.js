const Card_transaction = require('../Models/Card_Transaction')

// Create card transaction
const Create_Card_Transaction = async (data)=>{
    const cardtrans = await new Card_transaction({
        ct_id:data.ct_id,
        user:data.user,
        wallet_reference:data.wallet,
        balance_before:data.balance_before,
        balance_after:data.balance_before,
        amount:data.amount,
        trans_type:data.trans_type,

    })
    return await cardtrans.save();
}

// Attach Paystack Transaction Reference Number to Card Transaction
const attachRefNo = async (data)=>{
    return await Card_transaction.findOneAndUpdate({ct_id:data.ct_id},{reference_No:data.reference_No},{new:true});
}

// Get All Card Transaction
const getallcardtransaction = async ()=>{
    return await Card_transaction.find();
}

// Get All Card Transaction
const getallusercardtransaction = async (data)=>{
    return await Card_transaction.find({user:data.user});
}

// Get Card Transaction
const getcardtransaction =async (data)=>{
    return await Card_transaction.findOne({ct_id:data})
}
// Get Card Transaction Reference Number For Final OTP VERIFICATION
const getcardtransrefno =async (data)=>{
    return await Card_transaction.find({user:data.user}).select('reference_No').exec()
}
// Update Card Transaction Status After Card Transaction Runs
const updateCardTrans_status =async (data)=>{
    return await Card_transaction.findOneAndUpdate({ct_id:data.ct_id},{trans_status:data.status},{new:true})
}

// Update Card Transaction Status After Card Transaction Runs
const updateBB =async (data)=>{
    return await Card_transaction.findOneAndUpdate({ct_id:data.ct_id},{balance_after:data.balance_after},{new:true})
}

module.exports = {
    Create_Card_Transaction,attachRefNo,getallcardtransaction,getcardtransaction,getcardtransrefno,updateCardTrans_status,getallusercardtransaction,updateBB
}