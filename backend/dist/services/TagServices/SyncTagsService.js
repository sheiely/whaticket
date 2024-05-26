"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tag_1 = __importDefault(require("../../models/Tag"));
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const TicketTag_1 = __importDefault(require("../../models/TicketTag"));
const SyncTags = async ({ tags, ticketId }) => {
    const ticket = await Ticket_1.default.findByPk(ticketId, { include: [Tag_1.default] });
    const tagList = tags.map(t => ({ tagId: t.id, ticketId }));
    await TicketTag_1.default.destroy({ where: { ticketId } });
    await TicketTag_1.default.bulkCreate(tagList);
    ticket?.reload();
    return ticket;
};
exports.default = SyncTags;
