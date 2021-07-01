const {
	signin,
	signup,
	requestPasswordReset,
	resetPassword,
	checkCode,
} = require('../services/authService')

const signinController = async (req, res, next) => {
	try {
		const token = await signin(req.body)
		res.json({ token })
	} catch (error) {
		res.status(400).send({ error: error.message })
	}
}

const signupController = async (req, res, next) => {
	try {
		const signupStatus = await signup(req.body)
		res.json({ signupStatus })
	} catch (error) {
		res.status(400).send({ error: error.message })
	}
}

const requestPasswordResetController = async (req, res, next) => {
	try {
		const requestStatus = await requestPasswordReset(req.body.email)
		res.json({ requestStatus })
	} catch (error) {
		res.status(400).send({ error: error.message })
	}
}

const resetPasswordController = async (req, res, next) => {
	try {
		const resetStatus = await resetPassword(
			req.body.email,
			req.body.code,
			req.body.password)
		res.json({ resetStatus })
	} catch (error) {
		res.status(401).send({ error: error.message })
	}
}

const checkCodeController = async (req, res, next) => {
	try {
		const checkStatus = await checkCode(req.body.code)
		res.json({ checkStatus })
	} catch (error) {
		res.status(401).send({ error: error.message })
	}
}

module.exports = {
	signinController,
	signupController,
	requestPasswordResetController,
	resetPasswordController,
	checkCodeController,
}