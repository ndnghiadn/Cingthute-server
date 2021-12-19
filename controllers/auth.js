const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const Users = require('../models/User')

const authController = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body
      const newUsername = username.toLowerCase().replace(/ /g, '')
      const newEmail = email.toLowerCase().replace(/ /g, '')

      const user = await Users.findOne({ username: newUsername })
      if (user) return res.status(400).json({ msg: 'This username is already taken.' })

      if (password.length < 6)
        return res.status(400).json({ msg: 'Password must be at least 6 characters.' })

      const hashedPassword = await argon2.hash(password)

      const newUser = new Users({
        fullname,
        username: newUsername,
        email: newEmail,
        password: hashedPassword,
        gender,
      })

      const accessToken = createAccessToken({ id: newUser._id })

      await newUser.save()

      res.json({
        msg: 'Created successfully!',
        accessToken,
        user: {
          ...newUser._doc,
          password: '',
        },
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body

      const user = await Users.findOne({ username }).populate('followers following', '-password')
      if (!user) return res.status(400).json({ msg: 'Invalid username or password!' })

      const validPassword = await argon2.verify(user.password, password)
      if (!validPassword) return res.status(400).json({ msg: 'Invalid username or password!' })

      const accessToken = createAccessToken({ id: user._id })

      res.json({
        msg: 'Logged in successfully!',
        accessToken,
        user: {
          ...user._doc,
          password: '',
        },
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30d' })
}

module.exports = authController
