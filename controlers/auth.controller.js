import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Token } from "../models/token.model.js";
import { sendEmail } from "./../utils/sendEmail.js";

// User Login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (!user) return res.json({ success: false, message: "User not found!" });

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect)
      return res
        .json({
          success: false,
          message: "Wrong password or username!",
        })
        .status(400);
    if (!user.emailVerified) {
      let token1 = await Token.findOne({ userId: user._id });
      if (!token1) {
        token1 = await new Token({
          userId: user._id,
          token: "projectykishan",
        }).save();
        const url = `${process.env.BASE_URL}/user/email/${user.id}/verify/${token1.token}`;
        await sendEmail(user.email, "Verify Email for Projecty Web App", url);
      }

      return res.status(400).send({
        success: false,
        message: "An Email sent to your account please verify!",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY
    );

    const { password, ...currentuser } = user._doc;

    res
      .cookie("accessToken", token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .status(200)
      .json({ success: true, user: currentuser });
  } catch (err) {
    next(err);
  }
};

// email verification
export const verifyEmail = async (req, res) => {
  try {
    // Step 1: Find the user based on the ID
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    // Step 2: Find the token associated with the user
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    // Step 3: Update the user to set the verified flag to true
    await User.updateOne({ _id: user._id }, { emailVerified: true });

    // Step 4: Remove the token from the database
    await token.deleteOne(); // Changed from token.remove() to token.deleteOne()

    // Step 5: Respond with success
    res
      .status(200)
      .send({ success: true, message: "Email verified successfully" });
  } catch (error) {
    // Step 6: Handle unexpected errors
    res.status(500).send({ message: "Internal Server Error" });
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
