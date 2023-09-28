const handleError = (error) => {
    try {
        const errors = { email: '', password: '' }
        if (error.code === 11000) {
            errors.email = 'Email already exists'
        }

        if (error.message.includes('Validation failed') || error.message.includes('User validation failed') || error.message.includes('Product validation failed')) {
            Object.values(error.errors).forEach((validationError) => {
                if (validationError.properties && validationError.properties.path) {
                    errors[validationError.properties.path] = validationError.properties.message;
                    console.log(validationError.properties.path);
                    console.log(errors[validationError.properties.path]);
                }
            });
        }

        return errors;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    handleError
}
