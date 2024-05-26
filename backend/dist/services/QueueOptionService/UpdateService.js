"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShowService_1 = __importDefault(require("./ShowService"));
const UpdateService = async (queueOptionId, queueOptionData) => {
    const queueOption = await (0, ShowService_1.default)(queueOptionId);
    await queueOption.update(queueOptionData);
    return queueOption;
};
exports.default = UpdateService;
