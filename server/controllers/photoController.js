const {
	uploadPhoto,
	deletePhoto,
	getPhoto,
	getAllPhotosFromUser,
} = require('../services/photoService')

const uploadPhotoController = async (req, res, next) => {
	try {
		const data = await uploadPhoto(req.authenticateUser._id, req.body.data)
		res.json(data)
	} catch (error) {
		res.status(400).send({ error: error.message })
	}
}

const deletePhotoController = async (req, res, next) => {
	try {
		const status = await deletePhoto(req.authenticateUser._id, req.params.photoId)
		res.json({ status })
	} catch (error) {
		res.status(400).send({ error: error.message })
	}
}

const getPhotoController = async (req, res, next) => {
	try {
		const photo = await getPhoto(req.authenticateUser._id, req.params.photoId)
		res.json(photo)
	} catch (error) {
		res.status(400).send({ error: error.message })
	}
}

const getAllPhotosFromUserController = async (req, res, next) => {
	try {
		const photos = await getAllPhotosFromUser(req.params.userId)
		res.json(photos)
	} catch (error) {
		res.status(400).send({ error: error.message })
	}
}

module.exports = {
	uploadPhotoController,
	deletePhotoController,
	getPhotoController,
	getAllPhotosFromUserController,
}