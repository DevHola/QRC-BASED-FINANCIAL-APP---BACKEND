const User_repository = require('../Repository/user.repository')

const createuser = async(user)=>{
   return await User_repository.createuser(user);
}

const login = async (Email)=>{
    return await User_repository.login(Email)
}

const getuserbyemail = async(id)=>{
    return await User_repository.getuserbyemail(id);
}

const getuserbyid = async(id)=>{
    return await User_repository.getuserbyid(id);
}

const Authverifyotp =async(otp)=>{
    return await User_repository.Authverifyotp(otp)
}

const getusers = async()=>{
    return await User_repository.getusers()
}

const Forgetpassword =async (data)=>{
    return await User_repository.Forgetpassword(data);
}

const OneTimeGen =async (data)=>{
    return await User_repository.OneTimeGen(data);
}



module.exports = {
    createuser,getuserbyemail,getusers,login,getuserbyid,Authverifyotp,Forgetpassword,OneTimeGen
}