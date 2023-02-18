const Review = require('../models/review')


const postReview = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId

        const {product} = req.body
        if(!product){
            return res.status(404).send('Product not found')
        }

        const review = await Review.create(req.body)

        res.status(201).json({review})
        
    } catch (error) {
        res.status(500).send(error)
        
    }
}

const viewReviews = async (req, res) => {
    try {
        const {productId} = req.params
        const reviews = await Review.find({product: productId})
        res.status(200).json({reviews})
        
    } catch (error) {
        res.status(500).send(error)
        
    }
}

module.exports = {
    postReview,
    viewReviews
}