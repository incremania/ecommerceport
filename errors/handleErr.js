const handleError = (error) => {
    try {
        const errors = { email: '', password: ''}
        if(error.code === 11000) {
            errors.email = 'email already exists'
        }

        if(error.message.includes('User validation failed')) {
            Object.values(error.errors).forEach(({ properties}) => {
                errors[properties.path] = properties.message
            })
        }

        return errors
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    handleError
}