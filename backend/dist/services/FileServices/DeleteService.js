"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Files_1 = __importDefault(require("../../models/Files"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const DeleteService = async (id, companyId) => {
    const file = await Files_1.default.findOne({
        where: { id, companyId }
    });
    if (!file) {
        throw new AppError_1.default("ERR_NO_RATING_FOUND", 404);
    }
    await file.destroy();
};
exports.default = DeleteService;
