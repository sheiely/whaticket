"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Campaign_1 = __importDefault(require("../../models/Campaign"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const DeleteService = async (id) => {
    const record = await Campaign_1.default.findOne({
        where: { id }
    });
    if (!record) {
        throw new AppError_1.default("ERR_NO_CAMPAIGN_FOUND", 404);
    }
    if (record.status === "EM_ANDAMENTO") {
        throw new AppError_1.default("Não é permitido excluir campanha em andamento", 400);
    }
    await record.destroy();
};
exports.default = DeleteService;
