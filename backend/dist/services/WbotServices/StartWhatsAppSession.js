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
exports.StartWhatsAppSession = void 0;
const wbot_1 = require("../../libs/wbot");
const wbotMessageListener_1 = require("./wbotMessageListener");
const socket_1 = require("../../libs/socket");
const wbotMonitor_1 = __importDefault(require("./wbotMonitor"));
const logger_1 = require("../../utils/logger");
const Sentry = __importStar(require("@sentry/node"));
const StartWhatsAppSession = async (whatsapp, companyId) => {
    await whatsapp.update({ status: "OPENING" });
    const io = (0, socket_1.getIO)();
    io.to(`company-${whatsapp.companyId}-mainchannel`).emit("whatsappSession", {
        action: "update",
        session: whatsapp
    });
    try {
        const wbot = await (0, wbot_1.initWASocket)(whatsapp);
        (0, wbotMessageListener_1.wbotMessageListener)(wbot, companyId);
        (0, wbotMonitor_1.default)(wbot, whatsapp, companyId);
    }
    catch (err) {
        Sentry.captureException(err);
        logger_1.logger.error(err);
    }
};
exports.StartWhatsAppSession = StartWhatsAppSession;
