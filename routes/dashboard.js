const express = require('express')
const router = express.Router()

const {
    totalsales,
    noOfOrders,
    noOfUsers
} = require('../controllers/dashboard')

router.route('/sales').get(totalsales)
router.route('/orders').get(noOfOrders)
router.route('/users').get(noOfUsers)


module.exports = router