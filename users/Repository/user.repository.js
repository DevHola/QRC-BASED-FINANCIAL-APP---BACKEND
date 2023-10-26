const User = require('../Models/User')

const createuser= async(user)=>{
  const new_user = new User(user);
  await new_user.save()
  return new_user;
}

const login = async (Email)=>{
 return await User.findOne({'Email':Email}).select('+Password').exec();
}

const getuserbyemail = async(Email)=>{
    return await User.findOne({'Email':Email});
}
//need rethinking
const Authverifyotp =async(id)=>{
    return await User.findOneAndUpdate({'_id':id},{Verified:true,OTP:null},{new:true})
}


const getuserbyid =async(id)=>{
  return await User.findOne({'_id':id});
}

const getusers = async()=>{
    return await User.find();
}

const OneTimeGen = async (data)=>{
    const onetime = await User.findOneAndUpdate({Email:data.id},{OTP:data.otp},{new:true})
}

const Forgetpassword =async(data)=>{
    const Forget = await User.findOneAndUpdate({_id:data.user},{Password:data.password,OTP:null},{new:true})
    return Forget;
}

module.exports = {
    createuser,
    getuserbyemail,
    getusers,
    login,
    getuserbyid,
    Authverifyotp,
    Forgetpassword,
    OneTimeGen,
}