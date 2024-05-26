"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Prompt_1 = __importDefault(require("../../models/Prompt"));
const Queue_1 = __importDefault(require("../../models/Queue"));
const ShowPromptService = async ({ promptId, companyId }) => {
    const prompt = await Prompt_1.default.findOne({
        where: {
            id: promptId,
            companyId
        },
        include: [
            {
                model: Queue_1.default,
                as: "queue"
            }
        ]
    });
    if (!prompt) {
        throw new AppError_1.default("ERR_NO_PROMPT_FOUND", 404);
    }
    return prompt;
};
exports.default = ShowPromptService;
