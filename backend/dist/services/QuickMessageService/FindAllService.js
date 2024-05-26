"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QuickMessage_1 = __importDefault(require("../../models/QuickMessage"));
const FindAllService = async () => {
    const records = await QuickMessage_1.default.findAll({
        order: [["shortcode", "ASC"]]
    });
    return records;
};
exports.default = FindAllService;
