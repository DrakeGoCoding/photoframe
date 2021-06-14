const {
	uploadPhotoController,
	deletePhotoController,
	getAllPhotosFromUserController,
} = require('../controllers/photoController')

const router = require('express').Router()

router.post('/upload', uploadPhotoController)
router.delete('/:photoId', deletePhotoController)
router.get('/all/:userId', getAllPhotosFromUserController)

module.exports = router