const Category = require('../models/category')


const createCategories = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        res.status(201).json({category})
        
    } catch (error) {
        res.status(500).send(error)   
    }

}


const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json({categories})
        
    } catch (error) {
        res.status(500).send(error)
        
    }

}

const getSingleCategory = async (req, res) => {
    try {
        const {categoryId} = req.params
        const category = await Category.findOne({_id: categoryId})
        if(!category){
            return res.status(404).send('This category does not exist')
        }
        res.status(200).json({category})
    } catch (error) {
        res.status(505).send(error)
        
    }

}

const updateCategory = async (req, res) => {
    try {
        const {categoryId} = req.params
        const category = await Category.findOneAndUpdate({_id: categoryId}, req.body, {
            new: true,
            runValidators: true
        })
        if(!category){
            return res.status(404).send('This category does not exist')
        }
        res.status(200).json({category})
        
    } catch (error) {
        res.status(500).send(error)
        
    }

}

const deleteCategory = async (req, res) => {
    try {
        const {categoryId} = req.params
        const category = await Category.findOneAndDelete({_id: categoryId})
        if(!category){
            return res.status(404).send('This category does not exist')
        }
        const categories = await Category.find({}) 
        res.status(200).json({categories})
        
    } catch (error) {
        res.status(500).send(error)
        
    }

}

module.exports = {
    createCategories,
    getCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}