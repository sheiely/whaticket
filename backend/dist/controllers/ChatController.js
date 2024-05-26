"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = exports.checkAsRead = exports.saveMessage = exports.remove = exports.show = exports.update = exports.store = exports.index = void 0;
const socket_1 = require("../libs/socket");
const CreateService_1 = __importDefault(require("../services/ChatService/CreateService"));
const ListService_1 = __importDefault(require("../services/ChatService/ListService"));
const ShowFromUuidService_1 = __importDefault(require("../services/ChatService/ShowFromUuidService"));
const DeleteService_1 = __importDefault(require("../services/ChatService/DeleteService"));
const FindMessages_1 = __importDefault(require("../services/ChatService/FindMessages"));
const UpdateService_1 = __importDefault(require("../services/ChatService/UpdateService"));
const Chat_1 = __importDefault(require("../models/Chat"));
const CreateMessageService_1 = __importDefault(require("../services/ChatService/CreateMessageService"));
const User_1 = __importDefault(require("../models/User"));
const ChatUser_1 = __importDefault(require("../models/ChatUser"));
const index = async (req, res) => {
    const { pageNumber } = req.query;
    const ownerId = +req.user.id;
    const { records, count, hasMore } = await (0, ListService_1.default)({
        ownerId,
        pageNumber
    });
    return res.json({ records, count, hasMore });
};
exports.index = index;
const store = async (req, res) => {
    const { companyId } = req.user;
    const ownerId = +req.user.id;
    const data = req.body;
    const record = await (0, CreateService_1.default)({
        ...data,
        ownerId,
        companyId
    });
    const io = (0, socket_1.getIO)();
    record.users.forEach(user => {
        io.to(`user-${user.userId}`).emit(`company-${companyId}-chat-user-${user.userId}`, {
            action: "create",
            record
        });
    });
    return res.status(200).json(record);
};
exports.store = store;
const update = async (req, res) => {
    const { companyId } = req.user;
    const data = req.body;
    const { id } = req.params;
    const record = await (0, UpdateService_1.default)({
        ...data,
        id: +id
    });
    const io = (0, socket_1.getIO)();
    record.users.forEach(user => {
        io.to(`user-${user.userId}`).emit(`company-${companyId}-chat-user-${user.userId}`, {
            action: "update",
            record
        });
    });
    return res.status(200).json(record);
};
exports.update = update;
const show = async (req, res) => {
    const { id } = req.params;
    const record = await (0, ShowFromUuidService_1.default)(id);
    return res.status(200).json(record);
};
exports.show = show;
const remove = async (req, res) => {
    const { id } = req.params;
    const { companyId } = req.user;
    await (0, DeleteService_1.default)(id);
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-chat`, {
        action: "delete",
        id
    });
    return res.status(200).json({ message: "Chat deleted" });
};
exports.remove = remove;
const saveMessage = async (req, res) => {
    const { companyId } = req.user;
    const { message } = req.body;
    const { id } = req.params;
    const senderId = +req.user.id;
    const chatId = +id;
    const newMessage = await (0, CreateMessageService_1.default)({
        chatId,
        senderId,
        message
    });
    const chat = await Chat_1.default.findByPk(chatId, {
        include: [
            { model: User_1.default, as: "owner" },
            { model: ChatUser_1.default, as: "users" }
        ]
    });
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-chat-${chatId}`, {
        action: "new-message",
        newMessage,
        chat
    });
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-chat`, {
        action: "new-message",
        newMessage,
        chat
    });
    return res.json(newMessage);
};
exports.saveMessage = saveMessage;
const checkAsRead = async (req, res) => {
    const { companyId } = req.user;
    const { userId } = req.body;
    const { id } = req.params;
    const chatUser = await ChatUser_1.default.findOne({ where: { chatId: id, userId } });
    await chatUser.update({ unreads: 0 });
    const chat = await Chat_1.default.findByPk(id, {
        include: [
            { model: User_1.default, as: "owner" },
            { model: ChatUser_1.default, as: "users" }
        ]
    });
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-chat-${id}`, {
        action: "update",
        chat
    });
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-chat`, {
        action: "update",
        chat
    });
    return res.json(chat);
};
exports.checkAsRead = checkAsRead;
const messages = async (req, res) => {
    const { pageNumber } = req.query;
    const { id: chatId } = req.params;
    const ownerId = +req.user.id;
    const { records, count, hasMore } = await (0, FindMessages_1.default)({
        chatId,
        ownerId,
        pageNumber
    });
    return res.json({ records, count, hasMore });
};
exports.messages = messages;
