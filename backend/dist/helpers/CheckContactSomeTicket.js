"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const Ticket_1 = __importDefault(require("../models/Ticket"));
const CheckContactSomeTickets = async (contactId, companyId) => {
    const ticket = await Ticket_1.default.findOne({
        where: { contactId, companyId }
    });
    if (ticket) {
        throw new AppError_1.default("ERR_OTHER_OPEN_TICKET");
    }
};
exports.default = CheckContactSomeTickets;
