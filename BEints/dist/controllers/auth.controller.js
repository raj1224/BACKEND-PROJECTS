"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.getProfile = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// --------------------------
//  REGISTER USER
// --------------------------
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check all fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check existing user
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create user (password hashing model me ho raha hai)
        const user = await user_model_1.default.create({ name, email, password });
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
exports.registerUser = registerUser;
// --------------------------
//  LOGIN USER
// --------------------------
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email & Password required" });
        }
        // User find
        const user = await user_model_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });
        // Compare Password
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });
        // Create JWT Token
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({
            message: "Logged in successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
exports.loginUser = loginUser;
// --------------------------
//  GET USER PROFILE
// --------------------------
const getProfile = async (req, res) => {
    try {
        const userId = req.userId; // auth middleware se aata hai
        const user = await user_model_1.default.findById(userId).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
exports.getProfile = getProfile;
// --------------------------
//  LOGOUT USER
// --------------------------
const logoutUser = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Logged out successfully",
            token: null // front-end ko idea dene ke liye
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
exports.logoutUser = logoutUser;
