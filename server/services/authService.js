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
        throw new Error(`Email ${data.email} has already been registered.`)

    user = new User(data)
    user.save(error => {
        if (error) throw error
        console.log('New user ' + user);
    })

    return true
}

const signin = async (data) => {
    const { email, password } = data
    const user = await User.findOne({ email })
    if (!user)
        throw new Error(`Incorrect email or password.`)

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword)
        throw new Error(`Incorrect email or password.`)

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    return token
}

const requestPasswordReset = async (email) => {
    const user = await User.findOne({ email })
    if (!user)
        throw new Error(`Email ${email} does not exist.`)

    const token = await Token.findOne({ userId: user._id })
    if (token) await token.deleteOne()

    const resetCode = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false
    })
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

    return true
}

const resetPassword = async (email, code, password) => {
    const user = await User.findOne({ email })
    if (!user)
        throw new Error(`Email ${email} does not exist.`)

    const passwordResetToken = await Token.findOne({ userId: user._id })
    if (!passwordResetToken)
        throw new Error("Invalid or expired verification code.")

    // const isValid = await bcrypt.compare(code, passwordResetToken.code)
    if (code.localeCompare(passwordResetToken.code) !== 0)
        throw new Error("Invalid or expired verification code.")

    const hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))

    await User.updateOne(
        { _id: user._id },
        { $set: { password: hash } },
        { new: true }
    )

    sendEmail(
        user.email,
        "Password Reset Successfully",
        { name: user.name },
        "./template/resetPassword.handlebars"
    )

    await passwordResetToken.deleteOne()

    return true
}

const checkCode = async (code) => {
    const token = await Token.findOne({ code })
    if (!token)
        throw new Error("Invalid or expired verification code.")

    return true
}

module.exports = {
    signin,
    signup,
    requestPasswordReset,
    resetPassword,
    checkCode
}