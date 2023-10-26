const mongoose = require('mongoose')
const connect = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    family: 4
  }).then(() => {
    console.log('Connection Established')
  }).catch((error) => {
    console.log(error)
    process.exit()
  })
}
module.exports = connect
