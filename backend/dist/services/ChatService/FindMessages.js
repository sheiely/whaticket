"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const ChatMessage_1 = __importDefault(require("../../models/ChatMessage"));
const ChatUser_1 = __importDefault(require("../../models/ChatUser"));
const User_1 = __importDefault(require("../../models/User"));
const lodash_1 = require("lodash");
const FindMessages = async ({ chatId, ownerId, pageNumber = "1" }) => {
    const userInChat = await ChatUser_1.default.count({
        where: { chatId, userId: ownerId }
    });
    if (userInChat === 0) {
        throw new AppError_1.default("UNAUTHORIZED", 400);
    }
    const limit = 20;
    const offset = limit * (+pageNumber - 1);
    const { count, rows: records } = await ChatMessage_1.default.findAndCountAll({
        where: {
            chatId
        },
        include: [{ model: User_1.default, as: "sender", attributes: ["id", "name"] }],
        limit,
        offset,
        order: [["createdAt", "DESC"]]
    });
    const hasMore = count > offset + records.length;
    const sorted = (0, lodash_1.sortBy)(records, ["id", "ASC"]);
    return {
        records: sorted,
        count,
        hasMore
    };
};
exports.default = FindMessages;
