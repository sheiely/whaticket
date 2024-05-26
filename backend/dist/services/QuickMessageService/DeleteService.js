"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QuickMessage_1 = __importDefault(require("../../models/QuickMessage"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const DeleteService = async (id) => {
    const record = await QuickMessage_1.default.findOne({
        where: { id }
    });
    if (!record) {
        throw new AppError_1.default("ERR_NO_QUICKMESSAGE_FOUND", 404);
    }
    await record.destroy();
};
exports.default = DeleteService;
