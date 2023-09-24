const User = require('../models/UserModel');

const handleError = (error) => {
    try {
        
    } catch (err) {
        console.log(err)
    }
}

// registration controller
module.exports.register = async( req, res ) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if(!firstname || !lastname || !email || !password){
            return res.status(400).json({ error: "please input all necessary fields"});
        }
        const user = await User.create(req.body)
        const userWithoutPassword = user.toObject;
        delete userWithoutPassword.password
        res.status(201).json({ user: userWithoutPassword })
    } catch (err) {
        const error = handleError(err)
        console.log(err)
        res.status(400).json({ error })
    }
}

// login controller

module.exports.login = async( req, res ) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}