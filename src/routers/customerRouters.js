'use-strict'

import express from 'express';
import { post } from '../controllers/customerControllers.js';

const customerRouter = express.Router();


customerRouter.post("/", post);

export default customerRouter;