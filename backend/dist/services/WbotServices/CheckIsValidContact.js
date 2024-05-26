"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const GetDefaultWhatsApp_1 = __importDefault(require("../../helpers/GetDefaultWhatsApp"));
const wbot_1 = require("../../libs/wbot");
const CheckIsValidContact = async (number, companyId) => {
    const defaultWhatsapp = await (0, GetDefaultWhatsApp_1.default)(companyId);
    const wbot = (0, wbot_1.getWbot)(defaultWhatsapp.id);
    try {
        const isValidNumber = await wbot.onWhatsApp(`${number}`);
        if (!isValidNumber) {
            throw new AppError_1.default("invalidNumber");
        }
    }
    catch (err) {
        if (err.message === "invalidNumber") {
            throw new AppError_1.default("ERR_WAPP_INVALID_CONTACT");
        }
        throw new AppError_1.default("ERR_WAPP_CHECK_CONTACT");
    }
};
exports.default = CheckIsValidContact;
