import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updatedProfileController,
  getOrdersController,
  saveAllOrders,
  getAllOrdersController,
  orderStatusController,
  cancelOrder,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routing

//register || method post
router.post("/register", registerController);

//login ||post
router.post("/signin", loginController);

//forgot password
router.post("/forgot-password", forgotPasswordController);

//test route
router.get("/test", requireSignIn, isAdmin, testController);

//protected user-route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin-route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updatedProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//save orders
router.post("/addorders", requireSignIn, saveAllOrders);

//get all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

//order cancel
router.put("/cancel-order/:orderId", cancelOrder);

export default router;
