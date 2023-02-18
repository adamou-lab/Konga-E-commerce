const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the name']
    },
    brand: {
        type: String,
        required: [true, 'Please provide the product brand']

    },
    code: {
        type: Number,
        unique: true,
        required: [true, 'Please provide the product code']
    },
    price: {
        type: Number,
        required: [true, 'Please provide the product code']
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category', 
        required: [true, 'please provide the category of the product']
    },
    images: [
        {
            type: String
        }
    ]
})

module.exports = mongoose.model('Product', productSchema)