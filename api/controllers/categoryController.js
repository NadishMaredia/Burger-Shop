const Category = require('../models/category');

const addCategory = async (req, res) => {

    const { name } = req.body;

    try {
        const newCategory = new Category({
            name
        });

        await newCategory.save();

        res.status(200).json({
            message: 'Category Added!',
            category: newCategory
        })
    } catch (err) {
        res.status(500).json({
            message: 'Category not added',
            error: error.message
        })
    }

};

const getAllCategories = async (req, res) => {

    try {
        const categories = await Category.find();

        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({
            error: error.message
        })
    }

}

module.exports = {
    addCategory,
    getAllCategories
}