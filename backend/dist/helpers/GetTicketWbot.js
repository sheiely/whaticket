"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wbot_1 = require("../libs/wbot");
const GetDefaultWhatsApp_1 = __importDefault(require("./GetDefaultWhatsApp"));
const GetTicketWbot = async (ticket) => {
    if (!ticket.whatsappId) {
        const defaultWhatsapp = await (0, GetDefaultWhatsApp_1.default)(ticket.user.id);
        await ticket.$set("whatsapp", defaultWhatsapp);
    }
    const wbot = (0, wbot_1.getWbot)(ticket.whatsappId);
    return wbot;
};
exports.default = GetTicketWbot;
