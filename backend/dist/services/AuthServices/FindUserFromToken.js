"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const ShowUserService_1 = __importDefault(require("../UserServices/ShowUserService"));
const auth_1 = __importDefault(require("../../config/auth"));
async function FindUserFromToken(token) {
    const decoded = (0, jsonwebtoken_1.verify)(token, auth_1.default.refreshSecret);
    const { id } = decoded;
    const user = await (0, ShowUserService_1.default)(id);
    return user;
}
exports.default = FindUserFromToken;
