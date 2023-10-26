const jwt = require('jsonwebtoken')

const token =(user)=>{
    const data = {
        id:user._id,
        Email:user.Email,
        Verified:user.Verified
    }
   const token = jwt.sign({
    data:data},process.env.Secret,{expiresIn: 60 * 60})
    return token;
}
const verify = (req,res,next)=>{
    const token = req.body.token || req.headers.authorization || req.headers['auth-access-token'];
    if(!token) return res.status(401).json({message:'Missing Authorization header'});
    try {
        const decoded = jwt.verify(token,process.env.Secret)
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({message:'Invalid Token'})
    }
}
module.exports = {
    token,
    verify
}