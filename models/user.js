const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide your name"]
    },
    email: {
        type: String,
        required: [true, "please provide your email"],
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    phone: {
        type: String,
        required: [true, "please provide your phone"],
        unique: true,
        minLength: 11,
        maxLength: 11
    },
    password: {
        type: String,
        required: [true, "please provide your password"],
        minLength: 5
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
    next()
})


module.exports = mongoose.model('User', userSchema)