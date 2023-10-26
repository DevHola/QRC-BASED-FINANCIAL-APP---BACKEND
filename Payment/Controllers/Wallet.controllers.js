const WalletService = require('../Services/Wallet.services')

const create_wallet = async (req,res)=>{
  try {
    const creation = await WalletService.walletcreation(req.user.Email);
    return res.status(200).json({
      "Message": 'success',
      "Data" : creation
    })
  } catch (error) {
    res.status(500).json({
        error: error
    })
  }
}
const Getwalletviaaddress = async(req,res)=>{
  try {
    const wallet = await WalletService.GetwalletbyAddress(req.params.id);
  res.status(200).json({
   "Wallet":wallet
  })
  } catch (error) {
    res.status(500).json({
      "error":error.Message
    })
  }
}
const GetUserwallet = async(req,res)=>{
  try {
    const wallet = await WalletService.Getwalletbyuser(req.params.id)
    res.status(200).json({
      "wallet":wallet
    })
  } catch (error) {
    res.status(500).json({
      "error":error
    })
  }
}
const GetAllwallets =async (req,res)=>{
  try {
    const wallets = await WalletService.GetAllwallets()
    res.status(200).json({
      "wallet":wallets
    })
  } catch (error) {
    res.status(500).json({
      "error":error
    })
  }
}
module.exports = {
    create_wallet,Getwalletviaaddress,GetUserwallet,GetAllwallets
}