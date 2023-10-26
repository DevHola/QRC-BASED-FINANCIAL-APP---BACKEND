const Wallet = require('../Models/Wallet')

const walletcreation = async(data,address)=>{
    const wallet = new Wallet({
        Address:address,
        User:data
    });
    return await wallet.save()
}
const GetwalletbyAddress = async(data)=>{
    return await Wallet.findOne({Address:data});
}
const Getwalletbyuser = async(data)=>{
    return await Wallet.findOne({User:data});
}
const GetAllwallets = async()=>{
    return await Wallet.find();
}
const getbalance = async (data)=>{
     return await Wallet.findOne({User:data}).select('-User -_id').exec();
}
const creditwallet = async (data)=>{
    return await Wallet.findOneAndUpdate({Address:data.Address,User:data.user},{Balance:data.balance_after},{new:true})
}
module.exports = {
    getbalance,
    walletcreation,
    GetwalletbyAddress,
    Getwalletbyuser,
    GetAllwallets,
    creditwallet
}