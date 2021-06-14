const multer = require('multer')
const path = require('path')

const supportedMimeType = ['image/png', 'image/jpg', 'image/jpeg']

module.exports = multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb) => {
		if (supportedMimeType.includes(file.mimetype)){
			cb(null, true)
		} else {
			cb(null, false)
			return cb(new Error('File extension not supported.'))
		}
	}
})