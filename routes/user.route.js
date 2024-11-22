import express from "express";
import { deleteUserById, getUserById} from "../controlers/user.controler.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUserById);
router.get("/:id", getUserById);

export default router;
