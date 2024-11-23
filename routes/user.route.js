import express from "express";
import {  deleteUserByUserId, getUserByUserId, register, updateUserByUserId } from "../controlers/user.controler.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();
//register user and  delete and get user by id ---> "/api/user"
router.post("/register", register);
router.delete("/:userid", verifyToken, deleteUserByUserId);
router.put("/:userid", verifyToken, updateUserByUserId );
router.get("/:userid", getUserByUserId);

export default router;
