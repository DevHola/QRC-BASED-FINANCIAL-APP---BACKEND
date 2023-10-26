const mongoose = require('mongoose')
const connection =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        family: 4,
    }).then(()=>{
        console.log('Connected')
    }).catch((Error)=>{
        console.log(Error)
    })
}
module.exports = connection;