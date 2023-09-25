const User = require('../models/UserModel');
const { handleError } = require('../errors/handleErr')
const { sendCookies } = require('../utils/token')
const { checkPermissionUser } = require('../middleware/checkPermission')



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
        sendCookies(res, user)
      
        res.status(201).json({ user: userWithoutPassword })
    } catch (err) {
        console.log(err)
        const error = handleError(err)
        res.status(400).json({ error })
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
        sendCookies(res, user)
        res.status(200).json({ user: userWithoutPassword })
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

// update user information
module.exports.update = async( req, res ) => {
    try {
        const { firstname, lastname, email} = req.body;
        const user = await User.findById(req.user.userId)
        checkPermissionUser(req.user.userId, user._id)
        user.firstname = firstname
        user.lastname = lastname
        user.email = email
        await user.save()
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password

        res.status(200).json({ user: userWithoutPassword })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
}

module.exports.delete = async( req, res ) => {
    try {
        await User.findByIdAndDelete(req.user.userId)
        res.status(200).json({ msg: "user deleted"})
       
    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
}


