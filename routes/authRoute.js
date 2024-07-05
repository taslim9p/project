import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routing

//register || method post
router.post("/register", registerController);

//login ||post
router.post("/login", loginController);

//test route
router.get("/test", requireSignIn, isAdmin,testController);

export default router;
