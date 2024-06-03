"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Scores_1 = __importDefault(require("../../models/Scores"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const DeleteService = async (id) => {

    const score = await Scores_1.default.findOne({
        where: { id }
    });
    if (!score) {
        throw new AppError_1.default("ERR_NO_TAG_FOUND", 404);
    }
    await score.destroy();
};
exports.default = DeleteService;
