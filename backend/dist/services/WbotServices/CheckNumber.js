"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetDefaultWhatsApp_1 = __importDefault(require("../../helpers/GetDefaultWhatsApp"));
const wbot_1 = require("../../libs/wbot");
const checker = async (number, wbot) => {
    const [validNumber] = await wbot.onWhatsApp(`${number}@s.whatsapp.net`);
    return validNumber;
};
const CheckContactNumber = async (number, companyId) => {
    const defaultWhatsapp = await (0, GetDefaultWhatsApp_1.default)(companyId);
    const wbot = (0, wbot_1.getWbot)(defaultWhatsapp.id);
    const isNumberExit = await checker(number, wbot);
    if (!isNumberExit.exists) {
        throw new Error("ERR_CHECK_NUMBER");
    }
    return isNumberExit;
};
exports.default = CheckContactNumber;
