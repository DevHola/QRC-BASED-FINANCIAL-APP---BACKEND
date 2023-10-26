const User_service = require('../Services/user.services')
const bcrypt = require('bcrypt')
const tokengen = require('../config/Jwt')

// Registration Function
const CreateUser = async(req,res)=>{
    try {
        if(req.body.Email == '' || req.body.Password =='' || req.body.Name ==''){
            return res.status(200).json({message:'Fill all details'})
        }
        const user = await User_service.getuserbyemail(req.body.Email);
        if(user){
           return res.status(200).json({message:'Account Already Exists'})
        }
        const hash = await bcrypt.hashSync(req.body.Password,10)
        const data = {
            Fullname: req.body.Name,
            Email:req.body.Email,
            Password:hash,
            OTP:req.body.otp
    }
        const new_user = await User_service.createuser(data)
        const token =  tokengen.token(new_user);
        res.status(200).json({token:token});
    } catch (error) {
        res.status(500).json(error)
    }
}

//Login Functionality
const login= async(req,res)=>{
    if(req.body.Email == '' || req.body.Password ==''){
        return res.status(200).json({message:'Fill all details'})
    }
    const user = await User_service.login(req.body.Email);
    if(!user){
        return res.status(200).json({message:'Email Incorrect'});
    }
    const comparepassword = await bcrypt.compare(req.body.Password,user.Password)
    if(!comparepassword){
        return res.status(200).json({message:'Invalid Password'});
    }
    if(user.Verified === false){
    const token = await tokengen.token(user);
    res.status(200).json({token:token,verified:false})
    }else{
        const token = await tokengen.token(user);
    res.status(200).json({token:token,verified:true}) 
    }
}

// Verify user before resetting
const forget_verify_user = async(req,res,next)=>{
    const user = await User_service.getuserbyemail(req.body.Email);
    if(user){
        res.status(200).json({message:'Verified'})
    }
}

const getuserbymail = async(req,res,next)=>{
    const user = await User_service.getuserbyemail(req.params.id);
    if(user){
        res.status(200).send(user)
    }
}


//Forget Password
const Forgetpassword = async(req,res,next)=>{
    if(req.body.password =='' ){
        return res.status(201).json({message:'Enter Data'})
    }
    const user = await User_service.getuserbyemail(req.params.id)
    if(!user){
        res.status(201).json({message:'Invalid user'})
    }
   const hash = await bcrypt.hashSync(req.body.password,10);
   const data = {
            password:hash,
            user:user._id
        }
        const reset = await User_service.Forgetpassword(data);
        if(reset){
            res.status(200).json({message:'Reset Successful'})
        }
    
    }

// Get user by id
const getuserbyid =async(req,res,next)=>{
    console.log((req.user.data.id))
    const user = await User_service.getuserbyid(req.user.data.id);
    if(user){
        res.status(200).json(user);
    }
    
}


module.exports = { 
    CreateUser,
    login,
    getuserbyid,
    Forgetpassword,
    forget_verify_user,
    getuserbymail
}