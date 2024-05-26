"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TicketNote_1 = __importDefault(require("../../models/TicketNote"));
const FindAllTicketNotesService = async () => {
    const ticketNote = await TicketNote_1.default.findAll();
    return ticketNote;
};
exports.default = FindAllTicketNotesService;
