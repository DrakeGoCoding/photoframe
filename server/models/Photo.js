const mongoose = require('mongoose');

const photoSchema = mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		cloudinaryId: String,
		url: String,
		width: Number,
		height: Number,
		format: String,
		uploadedAt: {
			type: Date,
			default: Date.now
		}
	}
)

const Photo = mongoose.model('Photo', photoSchema)
module.exports = Photo;