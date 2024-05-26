"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tag_1 = __importDefault(require("../../models/Tag"));
const KanbanListService = async ({ companyId }) => {
    const tags = await Tag_1.default.findAll({
        where: {
            kanban: 1,
            companyId: companyId,
        },
        order: [["id", "ASC"]],
        raw: true,
    });
    return tags;
};
exports.default = KanbanListService;
