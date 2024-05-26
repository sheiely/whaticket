"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QuickMessage_1 = __importDefault(require("../../models/QuickMessage"));
const Company_1 = __importDefault(require("../../models/Company"));
const FindService = async ({ companyId, userId }) => {
    const notes = await QuickMessage_1.default.findAll({
        where: {
            companyId,
            userId,
        },
        include: [{ model: Company_1.default, as: "company", attributes: ["id", "name"] }],
        order: [["shortcode", "ASC"]]
    });
    return notes;
};
exports.default = FindService;
