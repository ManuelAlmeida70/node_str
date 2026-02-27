'use-strict'

import { getByTag } from "../controllers/productsControllers.js";
import Product from "../models/products.js"

const productRepository =
{
    get: async() => {
        const res = await Product.find({active: true}, 'title slug price');
        return (res);
    },

    create: async(data) => {
        const product = new Product(data);
        await product.save();
    },

    getBySlug: async(slug) => {
        const res = await Product.findOne(
            {
                slug: slug,
                active: true
            },
            'title description price slug tags');

        return (res);
    },

    getById: async(id) => {
        const res = await Product.findById(id);
        return (res);
    },

    put: async(id, data) => {
        const res = await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            slug: data.slug,
            price: data.price}
        })
        return (res);
    },

    remove: async(id) => {
        const res = await Product.findOneAndDelete(id);
        return ({message: "Produto eliminado com sucesso", product: res})
    },

    getByTag: async(tag) => {
        const data = await Product.find({tags: req.params.tag}, 'title description slug tags');
        return (data);
    }
}

export default productRepository;