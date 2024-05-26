"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBaileysChatServices = void 0;
const BaileysChats_1 = __importDefault(require("../../models/BaileysChats"));
const UpdateBaileysChatServices = async (whatsappId, jid, data) => {
    const baileysChat = await BaileysChats_1.default.findOne({
        where: {
            whatsappId,
            jid
        }
    });
    if (baileysChat) {
        await baileysChat.update({
            conversationTimestamp: data.conversationTimestamp,
            unreadCount: data.unreadCount
        });
        return baileysChat;
    }
};
exports.UpdateBaileysChatServices = UpdateBaileysChatServices;
