const mongoose = require('mongoose')


const reviewSchema = new mongoose.Schema({
    review: {
        type: String, 
        required: [true, 'Please provide the review'],
    },
    ratings: {
        type: Number
    },
    product: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please enter the product'],
        ref: 'Product' 
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {timestamps: true})

module.exports = mongoose.model('Review', reviewSchema)