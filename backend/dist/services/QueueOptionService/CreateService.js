"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QueueOption_1 = __importDefault(require("../../models/QueueOption"));
const CreateService = async (queueOptionData) => {
    const queueOption = await QueueOption_1.default.create(queueOptionData);
    return queueOption;
};
exports.default = CreateService;
