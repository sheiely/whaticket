"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContactListItem_1 = __importDefault(require("../../models/ContactListItem"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const DeleteService = async (id) => {
    const record = await ContactListItem_1.default.findOne({
        where: { id }
    });
    if (!record) {
        throw new AppError_1.default("ERR_NO_CONTACTLISTITEM_FOUND", 404);
    }
    await record.destroy();
};
exports.default = DeleteService;
