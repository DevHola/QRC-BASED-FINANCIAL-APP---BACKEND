const Payment = require('../Models/Payment.model')
const Wallet = require('../Models/Wallet')
// Initialize payment
const InitPayment = async({Payment_ID,Sender,Recipent_Name,Recipent_Signature,Amount})=>{
    const initpay = await new Payment({
        Hash:Payment_ID,
        User:Sender,
        Recipent_Name:Recipent_Name,
        Recipent_Signature:Recipent_Signature,
        Amount:Amount
    })
    return await initpay.save();
     
}

const Payment_now = async(data)=>{   
 try {
    updatebalances(data)
    return 'done'
 } catch (error) {
    console.log(error)
 }

}

const updatebalances=async(data)=>{
const {Sender,Sender_balance,reci_user,reci_balance} = data
try {
    return Promise.all([Updatesenderbalance(Sender,Sender_balance),Updaterecipientbalance(reci_user,reci_balance)]).then(([result1,result2])=>{
    })
} catch (error) {
    res.status(500).json(error)
}

}

const Updatesenderbalance = async (Sender,Sender_balance)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            await Wallet.findOneAndUpdate({User:Sender},{Balance:Sender_balance},{new:true}) 
            resolve("Successful")
        } catch (error) {
            reject(error)
        }
    })
}
//Update Sender Account balance
const Updaterecipientbalance = async (reci_user,reci_balance)=>{
    return new Promise(async (resolve,reject)=>{
      try {
        await Wallet.findOneAndUpdate({User:reci_user},{Balance:reci_balance},{new:true})
        resolve("Successful");
      } catch (error) {
        reject(error);
      } 
    })
}

const failed = async (data)=>{
    await Payment.findOneAndUpdate({Hash:data},{Status:'Failed'},{new:true}) 
}

const success = async (data)=>{
    await Payment.findOneAndUpdate({Hash:data},{Status:'Successful'},{new:true}) 
}


const ALLWALLETTRANSACTION = async (id)=>{
    return await Payment.find({User:id}).select('-_id').exec()
}
//GET PAYMENT BY ID
const GetPayment = async(id)=>{
    return await Payment.find({Hash:id}).select('-_id').exec()
}

module.exports ={
    InitPayment,
    Payment_now,
    failed,
    success,
    GetPayment,
    ALLWALLETTRANSACTION
}