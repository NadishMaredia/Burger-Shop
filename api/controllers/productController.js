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
            error: error.message
        })
    }

}


module.exports = {
    addProduct,
    getAllProducts
}