const { Schema, default: mongoose } = require('mongoose');

const imageSchema = new Schema({
    image: {
        type: String
    }
})

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please provide product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'describe this product'],
        maxlength: [300, 'product description should not be more than 300 characters']
    },
    company: {
        type: String,
        enum: {
            values: ['shopMania'],
            message: 'please contact shopMania to register ${VALUE}  as a company'
        },
        required: [true, 'please provide company name']
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ['phones', 'laptops', 'accessories', 'clothings', 'furniture'],
            message: '${VALUE} is not  a valid category, contact SHOPMANIA if you feel there is an error'
        }
    },
    images: {
        type: [imageSchema],
        required: [true, 'provide product image']
    },
    color: {
        type: String,
        default: 'black'
    },
    price: {
        type: Number,
        required: [true, 'please provide product price']
    },
    featured: {
        type: Boolean,
        default: false
    },
    // rating:[ {
    //     type: Number,
    //     minlength: 1,
    //     maxlength: 5,
    //     default: 1
    // }],
    averageRating: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    stockQuantity: {
        type: Number,
        min: [1, 'stock must be greater than one'],
        required: [true, 'please update the number of product available']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'product must be attached to a user']
    }
},
{timestamps: true}
)

module.exports = mongoose.model('Product', ProductSchema)

