"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schedule_1 = __importDefault(require("../../models/Schedule"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const DeleteService = async (id, companyId) => {
    const schedule = await Schedule_1.default.findOne({
        where: { id, companyId }
    });
    if (!schedule) {
        throw new AppError_1.default("ERR_NO_SCHEDULE_FOUND", 404);
    }
    await schedule.destroy();
};
exports.default = DeleteService;
