"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Help_1 = __importDefault(require("../../models/Help"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const ShowService = async (id) => {
    const record = await Help_1.default.findByPk(id);
    if (!record) {
        throw new AppError_1.default("ERR_NO_HELP_FOUND", 404);
    }
    return record;
};
exports.default = ShowService;
