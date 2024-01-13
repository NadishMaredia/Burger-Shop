const Category = require('../models/category');
const Product = require('../models/product');

const addProduct = async (req, res) => {

    const { title, price, image, category } = req.body;

    try {
        // Check if the category already exists in the database
        const existingCategory = await Category.findById(category);

        if (!existingCategory) {
            return res.status(400).json({ error: 'Category not exists in the database' });
        }

        const product = new Product({
            title,
            price,
            image,
            category
        });

        await product.save();

        res.status(201).json({ message: 'Product Added', product });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getAllProducts = async (req, res) => {

    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({
            error: error.message
        })
    }

}


module.exports = {
    addProduct,
    getAllProducts
}