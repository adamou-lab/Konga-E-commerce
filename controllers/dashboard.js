const Order = require('../models/order')
const User = require('../models/user')


const totalsales = async (req, res) => {
    try {
        const totalSales = await Order.aggregate([
            {$group: {_id: null, totalSales: {$sum: '$total'}}}
        ])
    
        if(!totalSales){
            return res.status(404).send("No sales available")
        }

        res.status(200).send({totasales: totalSales})
        
    } catch (error) {
        res.status(500).send(error)
        
    }



}

const noOfOrders = async (req, res) => {
    try {
        const orderCount = await Order.countDocuments({})
        console.log(orderCount);

        if(!orderCount){
            return res.status(404).send("No orders available")
        }
    
        res.status(200).send({orders: orderCount})
        
    } catch (error) {
        res.status(500).send(error)
        
    }


}

const noOfUsers = async (req, res) => {
    try {
        const userCount = await User.countDocuments({})
        console.log( userCount)

        if(!userCount){
            return res.status(404).send("No orders available")
        }
    
        res.status(200).send({users: userCount})
        
    } catch (error) {
        res.status(500).send(error)
        
    }
    
       
}

module.exports = {
    totalsales,
    noOfOrders,
    noOfUsers
}