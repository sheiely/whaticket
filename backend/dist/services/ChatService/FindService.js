"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chat_1 = __importDefault(require("../../models/Chat"));
const Company_1 = __importDefault(require("../../models/Company"));
const User_1 = __importDefault(require("../../models/User"));
const FindService = async ({ ownerId, companyId }) => {
    const chats = await Chat_1.default.findAll({
        where: {
            ownerId,
            companyId
        },
        include: [
            { model: Company_1.default, as: "company", attributes: ["id", "name"] },
            { model: User_1.default, as: "owner", attributes: ["id", "name"] }
        ],
        order: [["createdAt", "DESC"]]
    });
    return chats;
};
exports.default = FindService;
