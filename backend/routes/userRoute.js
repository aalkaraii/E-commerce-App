import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  adminChangePassword,
  adminForgotPassword,
  adminResetPassword,
} from "../controllers/userController.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/admin/change-password", adminAuth, adminChangePassword);
userRouter.post("/admin/forgot-password", adminForgotPassword);
userRouter.post("/admin/reset-password", adminResetPassword);

export default userRouter;
