'use-strict'

import mongoose from "mongoose"

const Schema  = mongoose.Schema;

const Customerschema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },
});


export default mongoose.model('Customer', Customerschema);



