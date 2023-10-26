const jwt = require('jsonwebtoken')
const axios = require('axios')
const authuser = async (req, res, next) => {
  const token = req.body.token || req.headers.authorization || req.headers['auth-access-token']
  if (!token) return res.status(401).json({ message: 'Missing Authorization header' })
  try {
    const decoded = jwt.verify(token, process.env.Secret)
    const response = await axios.get(`${process.env.ums}/users/${decoded.data.Email}`)
    if (response.data.Email) {
      req.user = response.data
      next()
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' })
  }
}
module.exports = { authuser }
