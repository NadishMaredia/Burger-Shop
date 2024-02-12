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

const getOrderByOrderId = async (req, res) => {

    try {
        const id = req.params.id;

        const order = await Order.findById(id);

        if(!order) {
            return res.status(404).json({
                message: 'No order found with this id'
            });
        }

        return res.status(201).json({
            message: 'Order placed successfully!',
            order
        });
    } catch(err) {
        return res.status(500).json({
            message: 'There was no order with this id',
            error: err.message
        })
    }

};

module.exports = {
    placedOrder,
    getOrderByOrderId
}