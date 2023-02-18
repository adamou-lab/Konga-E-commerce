const Order = require('../models/order')
const Product = require('../models/product')


const createOrder = async (req, res) => {
    try {
        
        const productId = req.body.orderItems.map((order) => {
            return order.product
        })

        const product = await Product.find({_id: productId}) 

        const eachItemTotal = []
        product.map((product) => {
            const order = req.body.orderItems.find((orderItem) => {
                return (orderItem.product).toString() === (product._id).toString()
            })

            eachItemTotal.push({
                productId: product._id,
                total: product.price * order.quantity
            })
        })

        const totalAmount = eachItemTotal.reduce((accum, num) => {
            return accum + num.total

        }, 0)

        req.body.createdBy = req.user.userId
        req.body.total = totalAmount

        const order = await Order.create(req.body)

        res.status(201).json({order})
        
    } catch (error) {
        res.status(500).send(error)
        
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({createdBy: req.user.userId})
        res.status.json(orders)
        
    } catch (error) {
        res.status(500).send(error)
        
    }

}

const updateOrder = async (req, res) => {
    try {
        const {orderId} = req.params
        const order = await Order.findOneAndUpdate({_id: orderId}, {status: req.body.status}, {
            new: true,
            runValidators
        })
        if(!order){
            return res.status(201).send('This order does not exist')
        }

        res.status.json({order})
        
    } catch (error) {
        res.status(500).send(error)
    }
}






module.exports = {
    createOrder,
    getOrders,
    updateOrder
}