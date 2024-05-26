"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
const tokenAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const whatsapp = await Whatsapp_1.default.findOne({ where: { token } });
        if (whatsapp) {
            req.params = {
                whatsappId: whatsapp.id.toString()
            };
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        throw new AppError_1.default("Acesso não permitido", 401);
    }
    return next();
};
exports.default = tokenAuth;
