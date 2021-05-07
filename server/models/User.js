const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        password: {
            type: String
        },
    },
    {
        timestamps: true,
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified("password"))
        return next()

    const hash = await bcrypt.hash(this.password, Number(process.env.SALT_ROUNDS))
    this.password = hash
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
