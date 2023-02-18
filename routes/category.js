const express = require('express')
const router = express.Router()

const {
    verifyAdmin
} = require('../middlewares/authMiddleware')

const {
    createCategories,
    getCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category')


router.route('/').post(verifyAdmin, createCategories).get(getCategories)
router.route('/:categoryId').get(getSingleCategory).patch(verifyAdmin, updateCategory).delete(verifyAdmin, deleteCategory)

module.exports = router
