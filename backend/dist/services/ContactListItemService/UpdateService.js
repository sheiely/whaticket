"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const ContactListItem_1 = __importDefault(require("../../models/ContactListItem"));
const logger_1 = require("../../utils/logger");
const CheckNumber_1 = __importDefault(require("../WbotServices/CheckNumber"));
const UpdateService = async (data) => {
    const { id, name, number, email } = data;
    const record = await ContactListItem_1.default.findByPk(id);
    if (!record) {
        throw new AppError_1.default("ERR_NO_CONTACTLISTITEM_FOUND", 404);
    }
    await record.update({
        name,
        number,
        email
    });
    try {
        const response = await (0, CheckNumber_1.default)(record.number, record.companyId);
        record.isWhatsappValid = response.exists;
        const number = response.jid.replace(/\D/g, "");
        record.number = number;
        await record.save();
    }
    catch (e) {
        logger_1.logger.error(`Número de contato inválido: ${record.number}`);
    }
    return record;
};
exports.default = UpdateService;
