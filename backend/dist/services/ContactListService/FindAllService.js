"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContactList_1 = __importDefault(require("../../models/ContactList"));
const FindAllService = async () => {
    const records = await ContactList_1.default.findAll({
        order: [["name", "ASC"]]
    });
    return records;
};
exports.default = FindAllService;
