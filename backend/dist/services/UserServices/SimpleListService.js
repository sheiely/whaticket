"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Queue_1 = __importDefault(require("../../models/Queue"));
const SimpleListService = async ({ companyId }) => {
    const users = await User_1.default.findAll({
        where: {
            companyId
        },
        attributes: ["name", "id", "email"],
        include: [
            { model: Queue_1.default, as: 'queues' }
        ],
        order: [["id", "ASC"]]
    });
    if (!users) {
        throw new AppError_1.default("ERR_NO_USER_FOUND", 404);
    }
    return users;
};
exports.default = SimpleListService;
