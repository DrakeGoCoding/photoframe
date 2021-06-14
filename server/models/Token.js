const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'user'
		},
		code: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			expires: 600,   // 10 minutes
		}
	}
)

const Token = mongoose.model('Token', tokenSchema)
module.exports = Token