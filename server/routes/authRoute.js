const {
    signupController,
    requestPasswordResetController,
    resetPasswordController
} = require('../controllers/authController')

const router = require('express').Router()

router.post('/signup', signupController)
router.post('/requestResetPassword', requestPasswordResetController)
router.post('/resetPassword', resetPasswordController)

module.exports = router
