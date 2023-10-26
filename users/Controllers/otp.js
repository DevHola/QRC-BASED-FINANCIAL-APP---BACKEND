const User_service = require('../Services/user.services')
const speakeazy = require('@levminer/speakeasy')
// Generator Otp
const otpGenerator= async ()=>{
    let secret = await speakeazy.generateSecret({length:20});
    let token = speakeazy.totp({
        secret:secret.base32,
        encoding:"base32"
    })
    const data = {
        secret,
        token
    }
    return data;
    }
    // Verify OTP 
    const verifyotp = async (secret,otp)=>{
        let token = await speakeazy.totp.verify({
            secret:secret,
            encoding:"base32",
            token:otp,
            window:6,
         })
         return token;
    }

    const generateotp = async (req,res)=>{
        try {
            const news = await otpGenerator();
            const otp =  await otpGenerator();
            console.log(news)
            const data ={
                id:req.params.id,
                otp:otp.secret.base32
            }
            await User_service.OneTimeGen(data)
            res.status(200).json({code:data.otp})
        } catch (error) {
            res.status(500).json(error)
        }
    }

    const otpcode = async (req,res)=>{
        try {
            const otp =  await otpGenerator();
            console.log(otp)
            const data ={
                otp:otp.secret.base32
            }
            console.log(otp)
            res.status(200).json({code:data.otp})
        } catch (error) {
            res.status(500).json(error)
        }
    }

    const code = async (req,res)=>{
        try {
            const otp = await otpGenerator()
            console.log(otp)
            console.log(req)
        } catch (error) {
            res.status(500).json({"error":error})
            
        }
    }

    // OTP VERIFICATION
    const Authverifyotp = async(req,res)=>{
    if(req.body.otp == ''){
        return res.status(201).json({message:'enter otp for verification'})
    }
    const user = await User_service.getuserbyemail(req.params.Email);
    console.log(user)
    if(user){
     let token = await verifyotp(user.OTP,req.body.otp);
     console.log(token);
    if(token === true){
        const verified = await User_service.Authverifyotp(user._id);
        res.status(200).json(verified)
    }else{
        res.status(401).json({message:'Verification Failed'})
    }
    }
    
}

    module.exports = {
        generateotp,Authverifyotp,otpcode,code
    }