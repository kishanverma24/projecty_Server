import express from "express";
import {
  deleteUserByUserId,
  getUserByUserName,
  register,
  updateUserByUserId,
} from "../controlers/user.controler.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();
//register user and  delete and get user by id ---> "/api/user"
router.get("/profile/:username", getUserByUserName); // get user by userName
router.post("/register", register); //register
router.delete("/:userid", verifyToken, deleteUserByUserId); // delete
router.put("/:userid", verifyToken, updateUserByUserId); // update

export default router;
