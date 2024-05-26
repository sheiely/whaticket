"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TicketNote_1 = __importDefault(require("../../models/TicketNote"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const DeleteTicketNoteService = async (id) => {
    const ticketnote = await TicketNote_1.default.findOne({
        where: { id }
    });
    if (!ticketnote) {
        throw new AppError_1.default("ERR_NO_TICKETNOTE_FOUND", 404);
    }
    await ticketnote.destroy();
};
exports.default = DeleteTicketNoteService;
