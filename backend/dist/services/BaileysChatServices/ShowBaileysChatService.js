"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowBaileysChatService = void 0;
const BaileysChats_1 = __importDefault(require("../../models/BaileysChats"));
const ShowBaileysChatService = async (whatsappId, jid) => {
    const baileysChat = await BaileysChats_1.default.findOne({
        where: {
            whatsappId,
            jid,
        }
    });
    if (baileysChat) {
        return baileysChat;
    }
};
exports.ShowBaileysChatService = ShowBaileysChatService;
