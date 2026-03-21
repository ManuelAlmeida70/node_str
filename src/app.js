'use strict'

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import mongoose from 'mongoose';


//carregar rotas
import indexRoutes from './routers/indexRouters.js'
import productsRoutes from './routers/productRouters.js'
import customerRoutes from './routers/customerRouters.js';


//Carregar models
import Order from './models/order.js';


//Conectar ao banco de dados
dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));




app.use('/', indexRoutes);
app.use('/products', productsRoutes);
app.use('/customers', customerRoutes);

export default app;