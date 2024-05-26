"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chat_1 = __importDefault(require("../../models/Chat"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const ShowFromUuidService = async (uuid) => {
    const record = await Chat_1.default.findOne({ where: { uuid } });
    if (!record) {
        throw new AppError_1.default("ERR_NO_CHAT_FOUND", 404);
    }
    return record;
};
exports.default = ShowFromUuidService;
