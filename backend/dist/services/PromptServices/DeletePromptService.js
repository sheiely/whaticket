"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShowPromptService_1 = __importDefault(require("./ShowPromptService"));
const DeletePromptService = async (promptId, companyId) => {
    const prompt = await (0, ShowPromptService_1.default)({ promptId, companyId });
    await prompt.destroy();
};
exports.default = DeletePromptService;
