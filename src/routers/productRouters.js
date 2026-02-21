'use-strict'

import express from 'express';
import {post, remove, put, get, getBySlug, getById, getByTag} from '../controllers/productsControllers.js'

const routerProducts = express.Router();

routerProducts.get('/', get);
routerProducts.get('/:slug', getBySlug);
routerProducts.get('/admin/:id', getById);
routerProducts.get('/tags/:tag', getByTag);
routerProducts.post('/', post);
routerProducts.put('/:id', put);
routerProducts.delete('/:id', remove);




export default routerProducts;

