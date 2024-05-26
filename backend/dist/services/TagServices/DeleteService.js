"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tag_1 = __importDefault(require("../../models/Tag"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const DeleteService = async (id) => {
    const tag = await Tag_1.default.findOne({
        where: { id }
    });
    if (!tag) {
        throw new AppError_1.default("ERR_NO_TAG_FOUND", 404);
    }
    await tag.destroy();
};
exports.default = DeleteService;
