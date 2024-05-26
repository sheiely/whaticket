"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QueueIntegrations_1 = __importDefault(require("../../models/QueueIntegrations"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const ShowQueueIntegrationService = async (id, companyId) => {
    const integration = await QueueIntegrations_1.default.findByPk(id);
    // if (Number(integration?.companyId) !== Number(companyId)) {
    //   throw new AppError("Não é possível excluir registro de outra empresa");
    // }
    if (!integration) {
        throw new AppError_1.default("ERR_NO_DIALOG_FOUND", 404);
    }
    return integration;
};
exports.default = ShowQueueIntegrationService;
