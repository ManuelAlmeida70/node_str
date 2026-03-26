'use-strict'


import Order from '../models/order.js';

const orderRepository = {

    create: async (data) => {
        let order = new Order(data);
        await order.save();
    },

    getall: async () => {
        const res = await Order.find();
        return res;
    }

};

export default orderRepository;

