const {
    signup,
    requestPasswordReset,
    resetPassword
} = require('../services/authService')

const signupController = async (req, res, next) => {
    try {
        const signUpService = await signup(req.body)
        return res.json(signUpService)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
}

const requestPasswordResetController = async (req, res, next) => {
    const requestPasswordResetService = await requestPasswordReset(req.body.email)
    return res.json(requestPasswordResetService)
}

const resetPasswordController = async (req, res, next) => {
    const resetPasswordService = await resetPassword(
        req.body.userId,
        req.body.token,
        req.body.password)
    return res.json(resetPasswordService)
}

module.exports = {
    signupController,
    requestPasswordResetController,
    resetPasswordController
}