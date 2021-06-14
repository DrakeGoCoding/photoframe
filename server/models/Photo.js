const mongoose = require('mongoose');

const photoSchema = mongoose.Schema(
	{
		path: String,
		createdAt: {
			type: Date,
			default: Date.now
		}
	}
)

const Photo = mongoose.model('Photo', photoSchema)
module.exports = Photo;