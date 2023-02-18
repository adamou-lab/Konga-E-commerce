const express = require('express')
const router = express.Router()

const uplaodImage = require('../middlewares/fileUploads')

const {verifyAdmin} = require('../middlewares/authMiddleware')

const {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product')
const {uploadImage} = require('../middlewares/fileUploads')




router.route('/').post(verifyAdmin, uploadImage.array('images', 10), createProduct).get(getProducts)
router.route('/:productId').get(getSingleProduct).patch(verifyAdmin, updateProduct).delete(verifyAdmin, deleteProduct)

module.exports = router