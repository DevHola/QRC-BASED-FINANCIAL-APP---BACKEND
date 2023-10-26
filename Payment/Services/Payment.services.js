const Paymentrepo = require('../Repository/Payment.repository')
const Walletrepo = require('../Repository/Wallet.repository')
// Initialize payment
const InitPayment = async(data)=>{
    const initpay = await Paymentrepo.InitPayment(data);
    const userbalance = await Walletrepo.getbalance(initpay.User)
    //console.log(userbalance)
    if (userbalance.Balance < initpay.Amount) {
    await Paymentrepo.failed(initpay.Hash);        
    return "Transaction Failed Due to insufficient balance";
    }
    const recipentbalance = await Walletrepo.getbalance(initpay.Recipent_Name)
    console.log(recipentbalance.Balance)
    if(initpay){
        let transdata = {
            Sender:initpay.User,
            Sender_balance: userbalance.Balance - initpay.Amount,
            reci_user:initpay.Recipent_Name,
            reci_balance: recipentbalance.Balance + initpay.Amount
        }
       // console.log(transdata);
        const updatebalances = await Paymentrepo.Payment_now(transdata);
        if(updatebalances){
            await Paymentrepo.success(initpay.Hash);
            return "Transaction Successful"
        }
    }
}

const ALLWALLETTRANSACTION = async (data)=>{
    return await Paymentrepo.ALLWALLETTRANSACTION(data);
}
//GET PAYMENT BY ID
const GetPayment = async(data)=>{
    return await Paymentrepo.GetPayment(data)
}
module.exports ={
    InitPayment,
    GetPayment,
    ALLWALLETTRANSACTION
}