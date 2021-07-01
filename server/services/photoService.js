const { cloudinary } = require('../utils/cloudinary/cloudinary')
const Photo = require('../models/Photo');

const uploadPhoto = async (userId, fileStr) => {
	if (!fileStr)
		throw new Error("No file specified.")

	try {
		const result = await cloudinary.uploader.upload(fileStr, { folder: userId })
		const cloudinaryId = result.public_id.split('/')[1]
		const photo = new Photo({
			owner: userId,
			cloudinaryId: cloudinaryId,
			url: result.url,
			width: result.width,
			height: result.height,
			format: result.format,
		})
		photo.save((err, doc) => {
			if (err) throw err
			console.log(`Upload photo from user ${userId} successfully`);
			console.log(photo);
		})
		return photo
	} catch (error) {
		throw new Error('Error on uploading. Please check your photo again.')
	}
}

const deletePhoto = async (userId, cloudinaryId) => {
	if (!userId)
		throw new Error("No user id specified.")

	if (!cloudinaryId)
		throw new Error("No photo id specified.")

	const photo = await getPhoto(userId, cloudinaryId)
	if (!photo)
		throw new Error(`Photo ${cloudinaryId} not found.`)

	try {
		await cloudinary.uploader.destroy(`${userId}/${cloudinaryId}`)
		Photo.findOneAndDelete({ cloudinaryId }).exec(err => {
			if (err) throw err
			console.log(`Photo ${cloudinaryId} deleted successfully.`)
		})
		return true
	} catch (error) {
		throw new Error(`Error on deleting photo ${cloudinaryId}.`)
	}
}

const getPhoto = async (userId, cloudinaryId) => {
	if (!userId)
		throw new Error("No user id specified.")

	if (!cloudinaryId)
		throw new Error("No photo id specified.")

	try {
		const photo = await Photo.findOne({ owner: userId, cloudinaryId }).populate('owner').exec()
		if (!photo)
			throw new Error(`Photo ${cloudinaryId} not found.`)

		return photo
	} catch (error) {
		throw new Error(`Photo ${cloudinaryId} not found.`)
	}
}

const getAllPhotosFromUser = async (userId) => {
	if (!userId)
		throw new Error("No user id specified.")

	try {
		const photos = await Photo.find({ owner: userId }).populate('owner').exec()
		return photos
	} catch (error) {
		throw error
	}
}

module.exports = {
	uploadPhoto,
	deletePhoto,
	getPhoto,
	getAllPhotosFromUser,
}