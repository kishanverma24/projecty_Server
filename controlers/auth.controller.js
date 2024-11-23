import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

// User Registration
// export const register = async (req, res, next) => {
//   try {
//     // console.log(req);

//     const hash = bcrypt.hashSync(req.body.password, 5);
//     const newUser = new User({
//       ...req.body,
//       password: hash,
//     });

//     await newUser.save();
//     res.status(201).send("User has been created.").json({ newregisteruser: newuser });
//   } catch (err) {
//     next(err);
//   }
// };

// User Login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password); // it will give true if correct and false if not correct
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

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
      .json({ currentUser: currentuser });
  } catch (err) {
    next(err);
  }
};

// User Logout
export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
