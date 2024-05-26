"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chat_1 = __importDefault(require("../../models/Chat"));
const ChatUser_1 = __importDefault(require("../../models/ChatUser"));
const User_1 = __importDefault(require("../../models/User"));
async function UpdateService(data) {
    const { users } = data;
    const record = await Chat_1.default.findByPk(data.id, {
        include: [{ model: ChatUser_1.default, as: "users" }]
    });
    const { ownerId } = record;
    await record.update({ title: data.title });
    if (Array.isArray(users)) {
        await ChatUser_1.default.destroy({ where: { chatId: record.id } });
        await ChatUser_1.default.create({ chatId: record.id, userId: ownerId });
        for (let user of users) {
            if (user.id !== ownerId) {
                await ChatUser_1.default.create({ chatId: record.id, userId: user.id });
            }
        }
    }
    await record.reload({
        include: [
            { model: ChatUser_1.default, as: "users", include: [{ model: User_1.default, as: "user" }] },
            { model: User_1.default, as: "owner" }
        ]
    });
    return record;
}
exports.default = UpdateService;
