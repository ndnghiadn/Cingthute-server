const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) return res.status(401).json({ msg: 'Access token not found!' })
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.userId = decoded.id
    next()
  } catch (error) {
    return res.status(403).json({ msg: 'Please login!' })
  }
}

module.exports = verifyToken
