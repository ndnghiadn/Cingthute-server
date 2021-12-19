const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 15,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: `${process.env.SERVER_URL}/images/avatar/default.png`,
    },
    role: { type: String, default: 'user' },
    gender: { type: String, default: 'male' },
    mobile: { type: String, default: '' },
    address: { type: String, default: '' },
    website: { type: String, default: '' },
    description: {
      type: String,
      default: '',
      maxlength: 50,
    },
    followers: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
  },
  { timestamps: true }
)

module.exports = mongoose.model('users', UserSchema)
