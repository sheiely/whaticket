"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const User_1 = __importDefault(require("../models/User"));
const isSuper = async (req, res, next) => {
    const { super: isSuper } = await User_1.default.findByPk(req.user.id);
    if (!isSuper) {
        throw new AppError_1.default("Acesso não permitido", 401);
    }
    return next();
};
exports.default = isSuper;
