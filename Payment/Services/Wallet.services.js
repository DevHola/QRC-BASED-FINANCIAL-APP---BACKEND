const Walletrepo = require('../Repository/Wallet.repository')
const QRcode = require('qrcode');
const crypto = require('crypto')
const walletcreation =async (data)=>{
    const address = await crypto.randomBytes(20).toString('hex');
    const wc = await Walletrepo.walletcreation(data,address);
    let datas = {
        user:wc.User,
        address:wc.Address
    }
   let stringdata =JSON.stringify(datas)
   //console.log(stringdata);
   return QRcode.toDataURL(stringdata)
   
}
const GetwalletbyAddress = async(data)=>{
    return await Walletrepo.GetwalletbyAddress(data)
}
const Getwalletbyuser = async(data)=>{
    return await Walletrepo.Getwalletbyuser(data)
}
const GetAllwallets = async()=>{
    return await Walletrepo.GetAllwallets()
}
module.exports = {
    walletcreation,
    GetwalletbyAddress,
    Getwalletbyuser,
    GetAllwallets,
}