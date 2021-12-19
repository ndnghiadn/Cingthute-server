const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      maxlength: 200,
      default: '',
    },
    stars: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    image: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('post', PostSchema)
