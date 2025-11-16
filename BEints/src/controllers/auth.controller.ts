import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// --------------------------
//  REGISTER USER
// --------------------------
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user (password hashing model me ho raha hai)
    const user = await User.create({ name, email, password });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// --------------------------
//  LOGIN USER
// --------------------------
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    // User find
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare Password
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// --------------------------
//  GET USER PROFILE
// --------------------------
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // auth middleware se aata hai

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// --------------------------
//  LOGOUT USER
// --------------------------
export const logoutUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "Logged out successfully",
      token: null   // front-end ko idea dene ke liye
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
