import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
} from "../controllers/auth.controller";
import { validateForgotPassword, validateLogin, validateRegister } from "../validators/auth.validator";

const router = Router();

router.post("/register", validateRegister, registerController);
router.post("/login", validateLogin, loginController);
router.post("/login", validateForgotPassword, forgotPasswordController);

export default router;
