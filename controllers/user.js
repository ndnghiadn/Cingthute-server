const Users = require('../models/User')

const userController = {
  getCurrentUser: async (req, res) => {
    try {
      const user = await Users.findById(req.userId)
      if (user) return res.json({ msg: 'Get user successfully', user })
    } catch (err) {
      return res.status(500).json({ msg: 'This user doesnt exist!' })
    }
  },
  getUsersByUsername: async (req, res) => {
    try {
      const { username } = req.params
      const users = await Users.find({ username: { $regex: username } }).select('-password')
      if (users) return res.json({ msg: 'Get users successfully', users })
    } catch (err) {
      return res.status(500).json({ msg: 'Users not found!' })
    }
  },
  getUserByUsername: async (req, res) => {
    try {
      const { username } = req.params
      const user = await Users.findOne({ username }).select('-password')
      if (user) return res.json({ msg: 'Get user successfully', user })
    } catch (err) {
      return res.status(500).json({ msg: 'User not found!' })
    }
  },
  follow: async (req, res) => {
    const { userId } = req.params
    try {
      const user = await Users.findByIdAndUpdate(userId, { $push: { followers: req.userId } })
      const currUser = await Users.findByIdAndUpdate(req.userId, { $push: { following: userId } })
      if (user && currUser) return res.json({ msg: `You followed ${user.username}` })
    } catch (err) {
      return res.status(500).json({ msg: 'Follow has failed!' })
    }
  },
  unfollow: async (req, res) => {
    const { userId } = req.params
    try {
      const user = await Users.findByIdAndUpdate(userId, { $pull: { followers: req.userId } })
      const currUser = await Users.findByIdAndUpdate(req.userId, { $pull: { following: userId } })
      if (user && currUser) return res.json({ msg: `You unfollowed ${user.username}` })
    } catch (err) {
      return res.status(500).json({ msg: 'Follow has failed!' })
    }
  },
  setAvatarAndDesc: async (req, res) => {
    const { filename } = req.file
    try {
      const user = await Users.findByIdAndUpdate(req.userId, {
        avatar: `${process.env.SERVER_URL}/images/avatar/${filename}`,
        description: req.body.desc,
      })
      if (user) return res.json({ msg: 'Set Avatar and Description done', filename })
    } catch (err) {
      return res.status(500).json({ msg: 'User unvalid' })
    }
  },
  setDesc: async (req, res) => {
    const { desc } = req.body

    try {
      const user = await Users.findByIdAndUpdate(req.userId, {
        description: desc,
      })
      if (user) return res.json({ msg: 'Set Description done' })
    } catch (err) {
      return res.status(500).json({ msg: 'User unvalid' })
    }
  },
}

module.exports = userController
