"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const envTokenAuth = (req, res, next) => {
    try {
        const { token: bodyToken } = req.body;
        const { token: queryToken } = req.query;
        if (queryToken === process.env.ENV_TOKEN) {
            return next();
        }
        if (bodyToken === process.env.ENV_TOKEN) {
            return next();
        }
    }
    catch (e) {
        console.log(e);
    }
    throw new AppError_1.default("Token inválido", 403);
};
exports.default = envTokenAuth;
