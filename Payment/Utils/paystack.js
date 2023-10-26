const axios = require('axios')
const IPP = async (data) => {
  try {
    const response = await axios.post('https://api.paystack.co/charge', {
      card: {
        number: '507850785078507812',
        cvv: '081',
        expiry_year: '24',
        expiry_month: '7'
      },
      email: data.email,
      amount: data.amount
    }, {
      headers: {
        Authorization: `Bearer ${process.env.Paystack_secret}`
      }
    })
    return response
  } catch (error) {
    console.log(error.message)
  }
}
const submitpin = async (data) => {
  const pin = data.pin
  const reference = data.reference
  try {
    const response = await axios.post('https://api.paystack.co/charge/submit_pin', {
      pin, reference
    }, {
      headers: {
        Authorization: `Bearer ${process.env.Paystack_secret}`
      }
    })
    return response
  } catch (error) {
    return error
  }
}
module.exports = {
  IPP, submitpin
}
