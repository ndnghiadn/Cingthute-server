const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'static/images/post')
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname)
    cb(null, uuidv4() + ext)
  },
})

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 4,
  },
})

module.exports = upload
