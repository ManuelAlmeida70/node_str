'use-strict'

import mongoose from "mongoose"
import Customer from './customer.js'
import Product from './products.js'

const Schema = mongoose.Schema;

const Orderschema = new Schema({
    number: {
        type: String,
        required: true
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Customer
    },

    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },

    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Product
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],

    createAt: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model('Order', Orderschema);