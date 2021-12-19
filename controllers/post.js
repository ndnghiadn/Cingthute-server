const Posts = require('../models/Post')
const Users = require('../models/User')

const postController = {
  createPost: async (req, res) => {
    const { content } = req.body

    try {
      const newPost = new Posts({
        content,
        image: `${process.env.SERVER_URL}/images/post/${req.file.filename}`,
        user: req.userId,
      })

      await newPost.save()

      res.json({ msg: 'Create post successfully!' })
    } catch (err) {
      res.status(500).json({ msg: 'Internal server error!' })
    }
  },
  deletePost: async (req, res) => {
    try {
      const { postId } = req.params
      const post = await Posts.findOneAndRemove({ _id: postId, user: req.userId })
      if (!post) return res.status(403).json({ msg: 'Cant access to delete...' })
      return res.json({ msg: 'Deleted post successfully!' })
    } catch (err) {
      res.status(500).json({ msg: 'Internal server error...' })
    }
  },
  getPostsByUserId: async (req, res) => {
    const { userId } = req.params

    try {
      const posts = await Posts.find({ user: userId }).select('image _id createdAt')
      if (posts) return res.json({ posts: posts.sort((a, b) => b.createdAt - a.createdAt) })
    } catch (err) {
      return res.status(500).json({ msg: 'That user doesnt exist!' })
    }
  },
  getPosts: async (req, res) => {
    try {
      const user = await Users.findById(req.userId)

      const followings = user.following.map((following) => following.toString())

      const posts = await Posts.find({
        user: followings,
      }).populate('user', 'fullname username avatar')

      res.json({ posts: posts.sort((a, b) => b.createdAt - a.createdAt) })
    } catch (err) {
      res.status(500).json({ msg: 'Internal server error.' })
    }
  },
  star: async (req, res) => {
    const { postId } = req.params
    try {
      const post = await Posts.findByIdAndUpdate(postId, { $push: { stars: req.userId } })
      if (post) return res.json({ msg: 'Star successfully!' })
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error...' })
    }
  },
  unstar: async (req, res) => {
    const { postId } = req.params
    try {
      const post = await Posts.findByIdAndUpdate(postId, { $pull: { stars: req.userId } })
      if (post) return res.json({ msg: 'Unstar successfully!' })
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error...' })
    }
  },
  getPost: async (req, res) => {
    const { postId } = req.params

    try {
      const post = await Posts.findById(postId).populate('user', 'username fullname avatar')
      if (post) return res.json({ post })
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error.' })
    }
  },
}

module.exports = postController
