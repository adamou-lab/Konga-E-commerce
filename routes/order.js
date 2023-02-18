const express = require('express')
const router = express.Router()

const {
    createOrder,
    getOrders,
    updateOrder
} = require('../controllers/order')

const {verifyToken, verifyAdmin} = require('../middlewares/authMiddleware')

router.route('/').post(verifyToken, createOrder).get(verifyToken, getOrders)
router.route('/:orderId').patch(verifyAdmin, updateOrder)

module.exports = router