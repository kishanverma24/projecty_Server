import express from "express";
import { login, logout } from "../controlers/auth.controller.js";

const router = express.Router();
// register, login and logout of user --> "/api/auth"
// router.post("/register", register);
router.post("/login", login); //login
router.post("/logout", logout); //logout

export default router;
