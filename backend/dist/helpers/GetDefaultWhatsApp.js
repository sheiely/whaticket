"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
const GetDefaultWhatsAppByUser_1 = __importDefault(require("./GetDefaultWhatsAppByUser"));
const GetDefaultWhatsApp = async (companyId, userId) => {
    let connection;
    const defaultWhatsapp = await Whatsapp_1.default.findOne({
        where: { isDefault: true, companyId }
    });
    if (defaultWhatsapp?.status === 'CONNECTED') {
        connection = defaultWhatsapp;
    }
    else {
        const whatsapp = await Whatsapp_1.default.findOne({
            where: { status: "CONNECTED", companyId }
        });
        connection = whatsapp;
    }
    if (userId) {
        const whatsappByUser = await (0, GetDefaultWhatsAppByUser_1.default)(userId);
        if (whatsappByUser?.status === 'CONNECTED') {
            connection = whatsappByUser;
        }
        else {
            const whatsapp = await Whatsapp_1.default.findOne({
                where: { status: "CONNECTED", companyId }
            });
            connection = whatsapp;
        }
    }
    if (!connection) {
        throw new AppError_1.default(`ERR_NO_DEF_WAPP_FOUND in COMPANY ${companyId}`);
    }
    return connection;
};
exports.default = GetDefaultWhatsApp;
