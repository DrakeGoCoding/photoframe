const {
	uploadPhoto,
	deletePhoto,
	getAllPhotosFromUser,
} = require('../services/photoService')

const uploadPhotoController = async (req, res, next) => {
	try {
		const result = await uploadPhoto(req.authenticateUser._id, req.body.data)
		res.json({ result })
	} catch (error) {
		res.status(400).send({ error: error.message })
	}
}

const deletePhotoController = async (req, res, next) => {
	try {
		const result = await deletePhoto(req.authenticateUser._id, req.params.photoId)
		res.json({ result })
	} catch (error) {
		res.status(400).send({ error: error.message })
	}
}

const getAllPhotosFromUserController = async (req, res, next) => {
	try {
		const publicIds = await getAllPhotosFromUser(req.params.userId)
		res.json({ publicIds })
	} catch (error) {
		res.status(400).send({ error: error.message })
	}
}

module.exports = {
	uploadPhotoController,
	deletePhotoController,
	getAllPhotosFromUserController,
}