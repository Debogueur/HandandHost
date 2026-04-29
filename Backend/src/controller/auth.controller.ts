// auth.controller.ts

import { Request, Response } from "express";
import { User } from "../entity/user.entity";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import validator from "validator";
import nodemailer from "nodemailer";

export const Register = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    if (body.password !== body.password_confirm) {
      return res.status(400).send({
        success: false,
        message: "Passwords do not match",
      });
    }

    const email = validator.normalizeEmail(body.email);

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Invalid email",
      });
    }

    const existing = await User.findOne({
      where: { email },
    });

    if (existing) {
      return res.status(409).send({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);

    const user = User.create({
      name: body.name,
      email: email,
      password: hashedPassword,
      phone_number: body.phone_number,
      whatsapp_number: body.whatsapp_number,
      otp: "123456",
    });

    await user.save();

    const token = sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    user.token = token;
    await user.save();

    return res.send({
      success: true,
      token,
      user,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};


export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Email doesn't exists.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Please enter your password correctly.",
      });
    }

    const expiresIn = rememberMe ? "30d" : "1d";

    const token = sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: rememberMe
        ? 30 * 24 * 60 * 60 * 1000
        : 24 * 60 * 60 * 1000,
    });


    return res.send({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message: "Login successful",
    });

  } catch {
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};




/* ===========================================
   FORGOT PASSWORD
=========================================== */
export const ForgotPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }

    const cleanEmail =
      validator.normalizeEmail(email);

    if (!cleanEmail) {
      return res.status(400).send({
        success: false,
        message: "Invalid email",
      });
    }

    const user = await User.findOne({
      where: { email: cleanEmail },
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not found",
      });
    }

    /* create reset token */
    const resetToken = sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    user.token = resetToken;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    /* mail config */
    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: cleanEmail,
      subject: "Reset Password",
      html: `
        <h2>Password Reset</h2>
        <p>Click below link to reset password:</p>
        <a href="${resetLink}">
          Reset Password
        </a>
        <p>Valid for 15 minutes.</p>
      `,
    });

    return res.send({
      success: true,
      message:
        "Password reset link sent to your email",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};