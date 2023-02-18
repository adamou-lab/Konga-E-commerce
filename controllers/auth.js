const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({user})
    
    } catch (error) {
        res.status(500).send(error)
        
    }
}

const userLogin = async (req, res) => {
    try {
        const {email, phone, password} = req.body
        if(!phone && !email || !password){
            return res.send('Please enter your login credentials')
        }
        const searchObj = {}

        if(email){
            searchObj.email = email
        }

        if(phone){
            searchObj.phone = phone
        }

        const user = await User.findOne(searchObj)

        if(!user){
            return res.staus(404).send('User not found')
        }

        const isValid = bcrypt.compareSync(password, user.password)

        if(!isValid){
            return res.status(401).send("wrong password")
        }

        const token = jwt.sign({userId: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRE})

        res.status(200).json({name: user.name, token})
        
    } catch (error) {
        res.status(500).send(error)
    }

}

module.exports = {
    createUser,
    userLogin
}