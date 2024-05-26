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
const Sentry = __importStar(require("@sentry/node"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const GetTicketWbot_1 = __importDefault(require("../../helpers/GetTicketWbot"));
const Message_1 = __importDefault(require("../../models/Message"));
const Mustache_1 = __importDefault(require("../../helpers/Mustache"));
const global_1 = require("../../utils/global");
const SendWhatsAppMessage = async ({ body, ticket, quotedMsg }) => {
    let options = {};
    const wbot = await (0, GetTicketWbot_1.default)(ticket);
    const number = `${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`;
    console.log("number", number);
    if (quotedMsg) {
        const chatMessages = await Message_1.default.findOne({
            where: {
                id: quotedMsg.id
            }
        });
        if (chatMessages) {
            const msgFound = JSON.parse(chatMessages.dataJson);
            options = {
                quoted: {
                    key: msgFound.key,
                    message: {
                        extendedTextMessage: msgFound.message.extendedTextMessage
                    }
                }
            };
        }
    }
    try {
        console.log('body:::::::::::::::::::::::::::', body);
        global_1.map_msg.set(number, body);
        const sentMessage = await wbot.sendMessage(number, {
            text: (0, Mustache_1.default)(body, ticket.contact)
        }, {
            ...options
        });
        await ticket.update({ lastMessage: (0, Mustache_1.default)(body, ticket.contact) });
        console.log("Message sent", sentMessage);
        return sentMessage;
    }
    catch (err) {
        Sentry.captureException(err);
        console.log(err);
        throw new AppError_1.default("ERR_SENDING_WAPP_MSG");
    }
};
exports.default = SendWhatsAppMessage;
