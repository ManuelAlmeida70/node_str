'use strict';

import express, { Router } from "express";
import { post } from "../controllers/orderControllers.js";

const orderRouter = express.Router();

orderRouter.post("/", post);

export default orderRouter;