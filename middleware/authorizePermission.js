const authorizePermission = (...role) => {
    return ( req, res, next ) => {
        if(!req.user.role.includes(role)) {
            res.status(401).json({err: "unathorized request"})
        }
        next()
    }
}


module.exports = {
    authorizePermission
}