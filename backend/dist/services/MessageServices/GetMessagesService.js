"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Message_1 = __importDefault(require("../../models/Message"));
const GetMessageService = async ({ id }) => {
    const messageExists = await Message_1.default.findOne({
        where: { id }
    });
    if (!messageExists) {
        throw new AppError_1.default("MESSAGE_NOT_FIND");
    }
    return messageExists;
};
exports.default = GetMessageService;
