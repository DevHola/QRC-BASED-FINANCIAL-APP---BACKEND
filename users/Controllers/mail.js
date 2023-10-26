const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.user,
        pass: process.env.pass
    }
});
const mail = async (req,res)=>{
    try {
    const {Email,Subject,text} = req.body
    const mail = transporter.sendMail({
       from: process.env.user,
       to: Email,
       subject: Subject,
       text: text
    });
   res.status(200).json({Message:'Mail Sent'})
    } catch (error) {
        res.status(500).json(error)
    }
   }
module.exports = {mail};