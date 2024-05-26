"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(require("yup"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const ContactListItem_1 = __importDefault(require("../../models/ContactListItem"));
const logger_1 = require("../../utils/logger");
const CheckNumber_1 = __importDefault(require("../WbotServices/CheckNumber"));
const CreateService = async (data) => {
    const { name } = data;
    const contactListItemSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "ERR_CONTACTLISTITEM_INVALID_NAME")
            .required("ERR_CONTACTLISTITEM_REQUIRED")
    });
    try {
        await contactListItemSchema.validate({ name });
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    const [record] = await ContactListItem_1.default.findOrCreate({
        where: {
            number: data.number,
            companyId: data.companyId,
            contactListId: data.contactListId
        },
        defaults: data
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
exports.default = CreateService;
