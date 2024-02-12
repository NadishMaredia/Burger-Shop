const Order = require('../models/order');

const placedOrder = async (req, res) => {

    try {
        const orderData = req.body;

        const newOrder = new Order(orderData);

        await newOrder.save();

        res.status(201).json({
            message: 'Order placed successfully!',
            order: newOrder
        });
    } catch (err) {
        res.status(500).json({
            message: 'Order could not placed!',
            error: error.message
        })
    }
};

module.exports = {
    placedOrder
}