const { cloudinary } = require('../utils/cloudinary/cloudinary')

const uploadPhoto = async (userId, fileStr) => {
	if (!fileStr) {
		console.log("No file specified.");
		throw new Error("No file specified.")
	}

	try {
		const result = await cloudinary.uploader.upload(fileStr, { folder: userId })
		console.log(`Upload photo from user ${userId} successfully`);
		return result
	} catch (error) {
		throw new Error('Error on uploading. Please check your photo again.')
	}
}

const deletePhoto = async (userId, photoId) => {
	if (!userId) {
		throw new Error("No user id specified.")
	}

	if (!photoId) {
		throw new Error("No photo id specified.")
	}

	const photoExist = await findPhoto(userId, photoId)

	if (!photoExist) {
		throw new Error(`Photo ${userId}/${photoId} not found.`)
	}

	try {
		await cloudinary.uploader.destroy(`${userId}/${photoId}`)
		console.log(`Photo ${userId}/${photoId} deleted successfully.`)
		return true
	} catch (error) {
		throw new Error(`Error on deleting photo ${userId}/${photoId}.`)
	}
}

const findPhoto = async (userId, photoId) => {
	try {
		const { resources } = await cloudinary.search
			.expression(`public_id=${userId}/${photoId}`)
			.max_results(1)
			.execute()

		if (resources.length === 0) return false
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

const getAllPhotosFromUser = async (userId) => {
	if (!userId) {
		console.log("No user id specified.")
		throw new Error("No user id specified.")
	}

	try {
		const { resources } = await cloudinary.search
			.expression(`folder=${userId}`)
			.execute()

		const publicIds = resources.map(file => file.public_id)
		console.log(publicIds);
		return publicIds
	} catch (error) {
		console.error(error);
		throw error
	}

}

module.exports = {
	uploadPhoto,
	deletePhoto,
	getAllPhotosFromUser,
}