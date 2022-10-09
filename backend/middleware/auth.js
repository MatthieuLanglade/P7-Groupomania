const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.TOKEN)
        const userId = decodedToken.userId
        const admin = decodedToken.admin
        req.auth = {
            userId: userId,
            admin: admin
        }
        next()
    } catch(err) {
        res.status(401).json({message: err})
    }
}