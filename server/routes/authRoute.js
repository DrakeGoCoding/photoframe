const {
    signinController,
    signupController,
    requestPasswordResetController,
    resetPasswordController,
    checkCodeController,
} = require('../controllers/authController')

const router = require('express').Router()

router.post('/signin', signinController)
router.post('/signup', signupController)
router.post('/requestResetPassword', requestPasswordResetController)
router.post('/resetPassword', resetPasswordController)
router.post('/code', checkCodeController)

module.exports = router
