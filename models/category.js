const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter the category name"]
    },
})

module.exports = mongoose.model('Category', categorySchema)