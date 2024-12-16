"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretKey = void 0;
const crypto_1 = __importDefault(require("crypto"));
function generateRandomCode(length) {
    let result = "";
    const characters = "0123456789";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
exports.default = generateRandomCode;
exports.secretKey = crypto_1.default.randomBytes(7).toString("hex");
