"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContactList_1 = __importDefault(require("../../models/ContactList"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const DeleteService = async (id) => {
    const record = await ContactList_1.default.findOne({
        where: { id }
    });
    if (!record) {
        throw new AppError_1.default("ERR_NO_CONTACTLIST_FOUND", 404);
    }
    await record.destroy();
};
exports.default = DeleteService;
