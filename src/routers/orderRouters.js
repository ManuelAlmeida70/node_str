'use strict';

import express, { Router } from "express";
import { post, getall } from "../controllers/orderControllers.js";

const orderRouter = express.Router();

orderRouter.post("/", post);
orderRouter.get("/", getall);

export default orderRouter;