"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShowQueueService_1 = __importDefault(require("./ShowQueueService"));
const DeleteQueueService = async (queueId, companyId) => {
    const queue = await (0, ShowQueueService_1.default)(queueId, companyId);
    await queue.destroy();
};
exports.default = DeleteQueueService;
