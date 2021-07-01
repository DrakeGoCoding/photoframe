const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) return res.sendStatus(403);
        const user = await User.findById(payload.id).exec()
        req.authenticateUser = user
        next()
    })
}

module.exports = { authenticateJWT }