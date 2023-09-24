const { Schema, default: mongoose } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const UserSchema = new Schema({ 
    firstname: {
        type: String,
        required: [true, 'first name is required'],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, 'last name is required'],
        trim: true,
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ['admin', 'user'],
            message: '${VALUE} role is not supported'
        },
        default: 'user'
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        validates: [isEmail, 'please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength: [7, 'password must be greater than 6 characters']
    }
},
{ timestamps: true}
)

UserSchema.pre('save', async function() {
    if(!UserSchema.isModified('password')) return;
    
    const salt = await bcrypt.genSalt();
    this.password = bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function(password) {
    const passwordIsValid = await bcrypt.compare(password, this.password);
    return passwordIsValid
}

module.exports = mongoose.model('User', UserSchema)