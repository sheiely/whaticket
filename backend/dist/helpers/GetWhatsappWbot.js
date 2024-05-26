"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wbot_1 = require("../libs/wbot");
const GetWhatsappWbot = async (whatsapp) => {
    const wbot = await (0, wbot_1.getWbot)(whatsapp.id);
    return wbot;
};
exports.default = GetWhatsappWbot;
