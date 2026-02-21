'use -strict'

import express from 'express'


const routerIndex = express.Router();

routerIndex.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node Store API by Almeida',
        version: '0.0.1'
    });
});

export default routerIndex;