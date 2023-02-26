import express from "express";
import { createOrder, getAdminOrder, getMyOrder, getOrderDetails, processOrder, processPayment } from "../controllers/orders.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";


const router=express.Router();

router.post("/new",isAuthenticated,createOrder);
router.post("/payment",isAuthenticated,processPayment);
router.get("/my",isAuthenticated,getMyOrder);
router.get("/admin",isAuthenticated,isAdmin,getAdminOrder);
router
    .route("/single/:id")
    .get(isAuthenticated,getOrderDetails)
    .put(isAuthenticated,isAdmin,processOrder);
export default router;