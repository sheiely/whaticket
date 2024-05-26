"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContactListItem_1 = __importDefault(require("../../models/ContactListItem"));
const Company_1 = __importDefault(require("../../models/Company"));
const FindService = async ({ companyId, contactListId }) => {
    let where = {
        companyId
    };
    if (contactListId) {
        where = {
            ...where,
            contactListId
        };
    }
    const notes = await ContactListItem_1.default.findAll({
        where,
        include: [{ model: Company_1.default, as: "company", attributes: ["id", "name"] }],
        order: [["name", "ASC"]]
    });
    return notes;
};
exports.default = FindService;
