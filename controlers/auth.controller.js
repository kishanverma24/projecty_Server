import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User Login
export const login = async (req, res, next) => {
  try {
    // console.log(req.body);

    const user = await User.findOne({ userName: req.body.userName });

    if (!user) return res.json({ success: false, message: "User not found!" });

    const isCorrect = bcrypt.compareSync(req.body.password, user.password); // it will give true if correct and false if not correct
    if (!isCorrect)
      return res
        .json({
          success: false,
          message: "Wrong password or username!",
        })
        .status(400);

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY
    );

    const { password, ...currentuser } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, user: currentuser });
  } catch (err) {
    next(err);
  }
};

// User Logout
export const logout = async (req, res) => {
  // console.log(req.method);

  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ success: true });
};
