"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Queue_1 = __importDefault(require("../../models/Queue"));
const ListQueuesService = async ({ companyId }) => {
    const queues = await Queue_1.default.findAll({
        where: {
            companyId
        },
        order: [["orderQueue", "ASC"]]
    });
    return queues;
};
exports.default = ListQueuesService;
