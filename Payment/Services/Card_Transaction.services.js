const CardTransRepository = require('../Repository/Card_transaction.repository')
const WalletRepository = require('../Repository/Wallet.repository')
const Paystackutil = require('../Utils/paystack')
const Create_Card_Transaction = async (data)=>{
    const wallet = await WalletRepository.getbalance(data.user);
    const new_data = {
        balance_before:wallet.Balance,
        wallet:wallet.Address,
    } 
    const combined = {...data,...new_data}
    //console.log(combined.ct_id)
    const cardtrans = await CardTransRepository.Create_Card_Transaction(combined);
    //console.log(cardtrans)
    const payit = {
        email:data.user,
        amount:data.amount
    }
    const paystack = await Paystackutil.IPP(payit)
    if(paystack){
        const update = {
            ct_id:cardtrans.ct_id,
            reference_No:paystack.data.data.reference
        }
       //console.log(paystack.data.data)
        //console.log(cardtrans.ct_id)
        return await CardTransRepository.attachRefNo(update);
        
    }
    
    
    console.log(paystack.data.data.status)
}

const CompleteCardTransaction = async (data)=>{
    const cardtrans = await Paystackutil.submitpin(data)
    //console.log(cardtrans.data.data.status);
     if(cardtrans.data.data.status != 'success'){
            const stupdate = {
                ct_id:data.ct_id,
                status:'Failed'
            }
            return await CardTransRepository.updateCardTrans_status(stupdate)
        }
        
        const stpdate = {
            ct_id:data.ct_id,
            status:'Success'
        }
        const detail = await CardTransRepository.updateCardTrans_status(stpdate)
        if(detail){
            const calculate = detail.amount/100;
            const bb = {
                ct_id:detail.ct_id,
                balance_after:detail.balance_after + calculate,
                user:detail.user,
                Address:detail.wallet_reference
            }
           // console.log(bb)
            const check =await WalletRepository.creditwallet(bb)
           // console.log(check)
            return await CardTransRepository.updateBB(bb)
        }

}

const attachRefNo = async (data)=>{
    return await CardTransRepository.attachRefNo(data);
}

const getallcardtransaction = async ()=>{
    return await CardTransRepository.getallcardtransaction()
}

const getallusercardtransaction = async (data)=>{
    return await CardTransRepository.getallusercardtransaction(data)
}

const getcardtransaction =async (data)=>{
    return await CardTransRepository.getcardtransaction(data)
}
const getcardtransrefno = async (data)=>{
    return await CardTransRepository.getcardtransrefno(data)
}
const updateCardTrans_status = async (data)=>{
    return await CardTransRepository.updateCardTrans_status(data)
}
module.exports = {
    getallcardtransaction,getallusercardtransaction,getcardtransaction,getcardtransrefno,updateCardTrans_status,attachRefNo,Create_Card_Transaction,CompleteCardTransaction
}