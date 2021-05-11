const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
            if (err)
                res.sendStatus(403);

            const user = await User.findById(payload.id).exec()
            req.authenticateUser = user
            next()
        })
    } else
        res.sendStatus(401)
}

module.exports = { authenticateJWT }