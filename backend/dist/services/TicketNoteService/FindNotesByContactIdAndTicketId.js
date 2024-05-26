"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TicketNote_1 = __importDefault(require("../../models/TicketNote"));
const User_1 = __importDefault(require("../../models/User"));
const Contact_1 = __importDefault(require("../../models/Contact"));
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const FindNotesByContactIdAndTicketId = async ({ contactId, ticketId }) => {
    const notes = await TicketNote_1.default.findAll({
        where: {
            contactId,
            ticketId
        },
        include: [
            { model: User_1.default, as: "user", attributes: ["id", "name", "email"] },
            { model: Contact_1.default, as: "contact", attributes: ["id", "name"] },
            { model: Ticket_1.default, as: "ticket", attributes: ["id", "status", "createdAt"] }
        ],
        order: [["createdAt", "DESC"]]
    });
    return notes;
};
exports.default = FindNotesByContactIdAndTicketId;
