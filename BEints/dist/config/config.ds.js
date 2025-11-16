"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBconnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DBconnect = async () => {
    try {
        mongoose_1.default.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log("Database connection failed", error);
    }
};
exports.DBconnect = DBconnect;
