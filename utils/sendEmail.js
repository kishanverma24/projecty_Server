import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.PROJECTYEMAIL,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.PROJECTYEMAIL,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent!");
    console.log(error);
    return error;
  }
};
