"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Campaign_1 = __importDefault(require("../../models/Campaign"));
const Company_1 = __importDefault(require("../../models/Company"));
const FindService = async ({ companyId }) => {
    const notes = await Campaign_1.default.findAll({
        where: {
            companyId
        },
        include: [{ model: Company_1.default, as: "company", attributes: ["id", "name"] }],
        order: [["name", "ASC"]]
    });
    return notes;
};
exports.default = FindService;
