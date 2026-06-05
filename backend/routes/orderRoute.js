import express from "express";
import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/authUser.js";

const orderRouter = express.Router();

// Admin Routes
orderRouter.get("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// User Routes
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
