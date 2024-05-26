"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Plan_1 = __importDefault(require("../../models/Plan"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const DeletePlanService = async (id) => {
    const plan = await Plan_1.default.findOne({
        where: { id }
    });
    if (!plan) {
        throw new AppError_1.default("ERR_NO_PLAN_FOUND", 404);
    }
    await plan.destroy();
};
exports.default = DeletePlanService;
