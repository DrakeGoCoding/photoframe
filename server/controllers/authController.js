const {
    signup,
    requestPasswordReset,
    resetPassword,
    checkCode,
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
    try {
        const requestPasswordResetService = await requestPasswordReset(req.body.email)
        return res.json(requestPasswordResetService)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
}

const resetPasswordController = async (req, res, next) => {
    try {
        const resetPasswordService = await resetPassword(
            req.body.email,
            req.body.code,
            req.body.password)
        return res.json(resetPasswordService)
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
}

const checkCodeController = async (req, res, next) => {
    try {
        const checkCodeService = await checkCode(req.body.code)
        return res.json(checkCodeService)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
}

module.exports = {
    signupController,
    requestPasswordResetController,
    resetPasswordController,
    checkCodeController,
}