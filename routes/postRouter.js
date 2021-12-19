const router = require('express').Router()
const postController = require('../controllers/post')

const verifyToken = require('../middleware/verifyToken')
const upload = require('../middleware/uploadPost')

router.post('/createPost', verifyToken, upload.single('image'), postController.createPost)

router.delete('/deletePost/:postId', verifyToken, postController.deletePost)

router.get('/getPostsByUserId/:userId', verifyToken, postController.getPostsByUserId)

router.get('/getPosts', verifyToken, postController.getPosts)

router.get('/star/:postId', verifyToken, postController.star)
router.get('/unstar/:postId', verifyToken, postController.unstar)

router.get('/getPost/:postId', verifyToken, postController.getPost)

module.exports = router
