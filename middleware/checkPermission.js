// this middleware is checking if a user made a particular data
// before they can do anything to it

const checkPermissionUser = (currentUserId, idToCompare ) => {
    // if(req.user.role === 'admin') return;
    if(currentUserId === idToCompare.toString()) return

    throw new Error('you are not authorized to perform this task')
}

const checkPermissionAdmin = (currentUserId, idToCompare ) => {
    if(req.user.role === 'admin') return;
    if(currentUserId === idToCompare.toString()) return

    throw new Error('you are not authorized to perform this task')
}



module.exports = {
    checkPermissionUser
}