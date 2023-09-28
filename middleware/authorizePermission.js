const authorizePermission = (...role) => {
    try {
        return ( req, res, next ) => {
            if(!req.user.role.includes(role)) {
                return res.status(401).json({err: "unathorized request"})
            }
            next()
        }
    } catch (error) {
       console.log(error) 
    }
}


module.exports = {
    authorizePermission
}