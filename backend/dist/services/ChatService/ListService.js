"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Chat_1 = __importDefault(require("../../models/Chat"));
const ChatUser_1 = __importDefault(require("../../models/ChatUser"));
const User_1 = __importDefault(require("../../models/User"));
const ListService = async ({ ownerId, pageNumber = "1" }) => {
    const chatUsers = await ChatUser_1.default.findAll({
        where: { userId: ownerId }
    });
    const chatIds = chatUsers.map(chat => chat.chatId);
    const limit = 20;
    const offset = limit * (+pageNumber - 1);
    const { count, rows: records } = await Chat_1.default.findAndCountAll({
        where: {
            id: {
                [sequelize_1.Op.in]: chatIds
            }
        },
        include: [
            { model: User_1.default, as: "owner" },
            { model: ChatUser_1.default, as: "users", include: [{ model: User_1.default, as: "user" }] }
        ],
        limit,
        offset,
        order: [["createdAt", "DESC"]]
    });
    const hasMore = count > offset + records.length;
    return {
        records,
        count,
        hasMore
    };
};
exports.default = ListService;
