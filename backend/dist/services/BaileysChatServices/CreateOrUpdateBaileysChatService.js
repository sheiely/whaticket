"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrUpdateBaileysChatService = void 0;
const BaileysChats_1 = __importDefault(require("../../models/BaileysChats"));
const CreateOrUpdateBaileysChatService = async (whatsappId, chat) => {
    const { id, conversationTimestamp, unreadCount } = chat;
    const baileysChat = await BaileysChats_1.default.findOne({
        where: {
            whatsappId,
            jid: id,
        }
    });
    if (baileysChat) {
        const baileysChats = await baileysChat.update({
            conversationTimestamp,
            unreadCount: unreadCount ? baileysChat.unreadCount + unreadCount : 0
        });
        return baileysChats;
    }
    // timestamp now
    const timestamp = new Date().getTime();
    // convert timestamp to number
    const conversationTimestampNumber = Number(timestamp);
    const baileysChats = await BaileysChats_1.default.create({
        whatsappId,
        jid: id,
        conversationTimestamp: conversationTimestamp || conversationTimestampNumber,
        unreadCount: unreadCount || 1,
    });
    return baileysChats;
};
exports.CreateOrUpdateBaileysChatService = CreateOrUpdateBaileysChatService;
