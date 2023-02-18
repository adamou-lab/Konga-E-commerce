const Cart = require('../models/cart')
const Product = require('../models/product')


const addCart = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId
        const {product} = req.body

        const isValid = await Product.findOne({product})

        if(!isValid){
            return res.status(404).send('This product does not exist')
        }
        const cart = await Cart.create(req.body)

        res.status(201).json({cart})


        
    } catch (error) {

        res.status(500).send(error)
        
    }
}

const viewCart = async (req, res) => {
    try {
        const cart = await Cart.find({createdBy: req.user.userId}).populate('product')

        if(cart.length === 0){
            return res.status(200).send('No items in your cart')

        }

        res.status(200).json({cart})
        
    } catch (error) {
        
    }
}

const removeCart = async (req, res) => {
    try {
        const {cartId} = req.params

        const cart = await Cart.findOneAndDelete({_id: cartId})

        const carts = await Cart.find({createdBy: req.user.userId})

        if(carts.length === 0){
            return res.status(200).send('No items in your cart')

        }

        res.status(201).json({carts})
        
    } catch (error) {

        res.status(500).send(error)
        
    }
}

module.exports = {
    addCart,
    viewCart,
    removeCart
}