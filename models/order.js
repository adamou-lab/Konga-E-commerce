const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: [true, 'please provide the quantity']
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please provide the name']
    },
    phone: {
        type: Number,
        required: [true, 'Please provide the phone number']   
    },
    streetAddress: {
        type: String,
        required: [true, 'Please provide the street address']
    },
    city: {
        type: String,
        required: [true, 'Please provide the city']
    },
    state: {
        type: String,
        required: [true, 'Please provide the state']
    },
    LGA: {
        type: String,
        required: [true, 'Please provide the LGA']
    },
    status: {
        type: String,
        default: "Pending"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Order', orderSchema)