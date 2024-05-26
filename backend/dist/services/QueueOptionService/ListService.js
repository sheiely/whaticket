"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QueueOption_1 = __importDefault(require("../../models/QueueOption"));
const ListService = async ({ queueId, queueOptionId, parentId }) => {
    const whereOptions = {};
    if (queueId) {
        whereOptions.queueId = queueId;
    }
    if (queueOptionId) {
        whereOptions.id = queueOptionId;
    }
    if (parentId == -1) {
        whereOptions.parentId = null;
    }
    if (parentId > 0) {
        whereOptions.parentId = parentId;
    }
    const queueOptions = await QueueOption_1.default.findAll({
        where: whereOptions,
        order: [["id", "ASC"]]
    });
    return queueOptions;
};
exports.default = ListService;
