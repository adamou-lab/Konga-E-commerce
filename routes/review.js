const express = require('express')
const router = express.Router()

const {
    postReview,
    viewReviews
} = require('../controllers/review')

const {verifyToken} = require('../middlewares/authMiddleware')


router.route('/reviews').post(verifyToken, postReview)
router.route('/:productId/reviews').get(viewReviews)


module.exports = router