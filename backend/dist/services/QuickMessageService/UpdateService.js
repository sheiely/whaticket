"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const QuickMessage_1 = __importDefault(require("../../models/QuickMessage"));
const UpdateService = async (data) => {
    const { id, shortcode, message, userId } = data;
    const record = await QuickMessage_1.default.findByPk(id);
    if (!record) {
        throw new AppError_1.default("ERR_NO_TICKETNOTE_FOUND", 404);
    }
    await record.update({
        shortcode,
        message,
        userId
    });
    return record;
};
exports.default = UpdateService;
