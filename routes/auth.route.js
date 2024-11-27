import express from "express";
import { login, logout, verifyEmail } from "../controlers/auth.controller.js";

const router = express.Router();
// register, login and logout of user --> "/api/auth"
router.post("/login", login); //login
router.get("/:id/verify/:token/", verifyEmail); //email verification
router.post("/logout", logout); //logout

export default router;
