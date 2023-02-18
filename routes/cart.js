const express = require('express')
const router = express.Router()

const {
    addCart,
    viewCart,
    removeCart
} = require('../controllers/cart')


router.route('/').post(addCart).get(viewCart)
router.route('/:cartId').delete(removeCart)

module.exports = router