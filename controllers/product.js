const Product = require('../models/product')
const Category = require('../models/category')


const createProduct = async (req, res) => {
    try {
        const {category} = req.body

        const fileNames = req.files.map((file) => {
            return (`${req.protocol}://${req.get('host')}/public/uploads/${file.filename}`)
        })

        const isCategoryValid = await Category.findOne({category})

        if(!isCategoryValid){
            return res.status(404).send('This category does not exist')
        }

        req.body.images = fileNames
        const product = await Product.create(req.body)
        res.status(201).json({product})
        
    } catch (error) {
        res.status(500).send(error)
        
    }

}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('category', 'name')
        res.status(200).json(products)
        
    } catch (error) {
        res.status(500).send(error)
        
    }

}

const getSingleProduct = async (req, res) => {
    try {

        const {productId} = req.params
        const product = await Product.findOne({_id: productId}).populate('category', 'name')

        if(!product){
            return res.status(404).send('This product does not exist')
        }

        res.status(200).send(product)
        
    } catch (error) {
        res.status(500).send(error)
        
    }

}
const updateProduct = async (req, res) => {
    try {
        const {productId} = req.params

        const product = await Product.findOneAndUpdate({_id: productId}, req.body, {
            new: true,
            runValidators: true
        })
        res.status(201).json({product})
    } catch (error) {
        res.status(500).send(error)
        
    }

}
const deleteProduct = async (req, res) => {
    try {
        const {productId} = req.params

        const product = await Product.findOneAndDelete({_id: productId})
        const products = await Product.find({})
        res.status(201).json({products})
    } catch (error) {
        res.status(500).send(error)
        
    }

}

module.exports = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}