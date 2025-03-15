"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Function to create a JWT token
const createToken = (jwtPayload, secret, expiresIn) => {
    try {
        const options = {
            expiresIn: Number(expiresIn), // This should be valid as part of the SignOptions
        };
        return jsonwebtoken_1.default.sign(jwtPayload, secret, options);
    }
    catch (error) {
        // Log the error or throw a specific one
        throw new Error('Error creating token');
    }
};
exports.createToken = createToken;
// Function to verify a JWT token
const verifyToken = (token, secret) => {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        throw new Error('Invalid or expired token');
    }
};
exports.verifyToken = verifyToken;
