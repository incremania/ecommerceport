const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
 }

const authenticateUser = async (req, res, next ) => {
    try {
        const token = req.signedCookies.jwt;
        if(!token) {
           return res.status(404).json({ error: 'token not found'})
        }
        const payload =  jwt.verify(token, process.env.JWT_SECRET)
        console.log(payload)
        if(!payload) {
           return res.status(401).json({ error: 'invalid token'})
        }    
        const user = await User.findById(payload.id)
        req.user = { userId: payload.id , role: user.role}
        next()  
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'internal server error'})
    }
}

const sendCookies = (res, user ) => {
    const token = createToken(user._id)
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 500 * 2,
        signed: true
      })
}


 module.exports = {
    createToken,
    authenticateUser,
    sendCookies
 }