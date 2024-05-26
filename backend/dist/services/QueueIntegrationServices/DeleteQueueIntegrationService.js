"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QueueIntegrations_1 = __importDefault(require("../../models/QueueIntegrations"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const DeleteQueueIntegrationService = async (id) => {
    const dialogflow = await QueueIntegrations_1.default.findOne({
        where: { id }
    });
    if (!dialogflow) {
        throw new AppError_1.default("ERR_NO_DIALOG_FOUND", 404);
    }
    await dialogflow.destroy();
};
exports.default = DeleteQueueIntegrationService;
