"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const TicketNote_1 = __importDefault(require("../../models/TicketNote"));
const UpdateTicketNoteService = async (ticketNoteData) => {
    const { id, note } = ticketNoteData;
    const ticketNote = await TicketNote_1.default.findByPk(id);
    if (!ticketNote) {
        throw new AppError_1.default("ERR_NO_TICKETNOTE_FOUND", 404);
    }
    await ticketNote.update({
        note
    });
    return ticketNote;
};
exports.default = UpdateTicketNoteService;
