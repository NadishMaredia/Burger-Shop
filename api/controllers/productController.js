const Category = require('../models/category');
const Product = require('../models/product');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
        let query = {};

        // Check if category parameter is provided in the route params
        if (req.params.category && req.params.category.toLowerCase() !== 'all') {
            // Convert the category value to a valid ObjectId
            // const categoryId = ObjectId.isValid(req.params.category) ? new ObjectId(req.params.category) : null;

            // if (categoryId) {
                query.category = req.params.category;
            // }
        }

        // Fetch products based on the filter
        const products = await Product.find(query);

        if(!products) {
            return res.status(400).json({ error: 'Products not exists in the database' });
        }

    // Extract category IDs from products
    const categoryIds = products.map((product) => product.category);

    // Fetch category names based on category IDs
    const categories = await Category.find({ _id: { $in: categoryIds } });

    // Map category names to products
    const productsWithCategoryNames = products.map((product) => ({
      ...product._doc,
      categoryName: categories.find((category) => category._id.equals(product.category)).name,
    }));

    res.status(200).json(productsWithCategoryNames);
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


module.exports = {
    addProduct,
    getAllProducts
}