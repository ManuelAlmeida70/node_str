'use-strict'

import mongoose from "mongoose";
import Customer from "../models/customer.js"

const customerRepository = {

    get: async(password, email) => {
        const res = await Customer.find(
            {
                password: password,
                email: email
            });
        return (res);
    },

    create: async(data) => {
        var customer = new Customer(data);
        await customer.save();
    }
}

export default customerRepository;