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
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password
        res.status(201).json({ user: userWithoutPassword })
    } catch (err) {
        const error = handleError(err)
        console.log(err)
        res.status(400).json({ err })
    }
}

// login controller

module.exports.login = async( req, res ) => {
    try {
        const { email, password } = req.body
        if(!email || !password) {
            return res.status(400).json({ error: "please enter required fields"})
        }
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(404).json({ error: "user not found"})
        }
        const validPassword = await user.comparePassword(password);
        if(!validPassword) {
            return res.status(401).json({ error: "incorrect password"})
        }

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password
        res.status(200).json({ user: userWithoutPassword })
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}