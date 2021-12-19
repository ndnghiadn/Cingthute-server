const router = require('express').Router()
const userController = require('../controllers/user')
const verifyToken = require('../middleware/verifyToken')
const upload = require('../middleware/uploadAvatar')

router.get('/getCurrentUser', verifyToken, userController.getCurrentUser)

router.get('/getUsersByUsername/:username', verifyToken, userController.getUsersByUsername)

router.get('/getUserByUsername/:username', verifyToken, userController.getUserByUsername)

router.get('/follow/:userId', verifyToken, userController.follow)

router.get('/unfollow/:userId', verifyToken, userController.unfollow)

router.post(
  '/setAvatarAndDesc',
  verifyToken,
  upload.single('avatar'),
  userController.setAvatarAndDesc
)

router.post('/setDesc', verifyToken, userController.setDesc)

module.exports = router
