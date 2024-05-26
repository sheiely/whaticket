"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const QueueOption_1 = __importDefault(require("../../models/QueueOption"));
const ShowService = async (queueOptionId) => {
    const queue = await QueueOption_1.default.findOne({
        where: {
            id: queueOptionId
        },
        include: [
            {
                model: QueueOption_1.default,
                as: 'parent',
                where: { parentId: queueOptionId },
                required: false
            },
        ]
    });
    if (!queue) {
        throw new AppError_1.default("ERR_QUEUE_NOT_FOUND");
    }
    return queue;
};
exports.default = ShowService;
