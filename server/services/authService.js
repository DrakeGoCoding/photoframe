const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Token = require('../models/Token')
const sendEmail = require('../utils/emails/sendEmail')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const otpGenerator = require('otp-generator')

const signup = async (data) => {
    let user = await User.findOne({ email: data.email })
    if (user)
        throw new Error(`Email ${data.email} has already been used. Please try another.`)

    user = new User(data)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    await user.save()

    return (data = {
        userId: user._id,
        email: user.email,
        name: user.name,
        token: token
    })
}

const requestPasswordReset = async (email) => {
    const user = await User.findOne({ email })
    if (!user)
        throw new Error(`Email ${email} does not exist.`)

    const token = await Token.findOne({ userId: user._id })
    if (token) await token.deleteOne()

    const resetCode = otpGenerator.generate(6, { digits: true })
    // const hash = await bcrypt.hash(resetCode, Number(process.env.SALT_ROUNDS))

    await new Token({
        userId: user._id,
        code: resetCode,
        createdAt: Date.now(),
    }).save()

    sendEmail(
        user.email,
        "Password Reset Request",
        {
            name: user.name,
            code: resetCode,
        },
        "./template/requestResetPassword.handlebars"
    )

    return code
}

const resetPassword = async (userId, code, password) => {
    const passwordResetToken = await Token.findOne({ userId })
    if (!passwordResetToken)
        throw new Error("Invalid or expired password reset token.")

    const isValid = await bcrypt.compare(code, passwordResetToken.code)
    if (!isValid)
        throw new Error("Invalid or expired password reset token.")

    const hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))

    await User.updateOne(
        { _id: userId },
        { $set: { password: hash } },
        { new: true })

    const user = await User.findById({ _id: userId })

    sendEmail(
        user.email,
        "Password Reset Successfully",
        { name: user.name },
        "./template/resetPassword.handlebars"
    )

    await passwordResetToken.deleteOne()

    return true
}

module.exports = { signup, requestPasswordReset, resetPassword }