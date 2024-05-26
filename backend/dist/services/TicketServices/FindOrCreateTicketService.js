"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const sequelize_1 = require("sequelize");
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const ShowTicketService_1 = __importDefault(require("./ShowTicketService"));
const FindOrCreateATicketTrakingService_1 = __importDefault(require("./FindOrCreateATicketTrakingService"));
const Setting_1 = __importDefault(require("../../models/Setting"));
const Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
const FindOrCreateTicketService = async (contact, whatsappId, unreadMessages, companyId, groupContact) => {
    let ticket = await Ticket_1.default.findOne({
        where: {
            status: {
                [sequelize_1.Op.or]: ["open", "pending", "closed"]
            },
            contactId: groupContact ? groupContact.id : contact.id,
            companyId,
            whatsappId
        },
        order: [["id", "DESC"]]
    });
    if (ticket) {
        await ticket.update({ unreadMessages, whatsappId });
    }
    if (ticket?.status === "closed") {
        await ticket.update({ queueId: null, userId: null });
    }
    if (!ticket && groupContact) {
        ticket = await Ticket_1.default.findOne({
            where: {
                contactId: groupContact.id
            },
            order: [["updatedAt", "DESC"]]
        });
        if (ticket) {
            await ticket.update({
                status: "pending",
                userId: null,
                unreadMessages,
                queueId: null,
                companyId
            });
            await (0, FindOrCreateATicketTrakingService_1.default)({
                ticketId: ticket.id,
                companyId,
                whatsappId: ticket.whatsappId,
                userId: ticket.userId
            });
        }
        const msgIsGroupBlock = await Setting_1.default.findOne({
            where: { key: "timeCreateNewTicket" }
        });
        const value = msgIsGroupBlock ? parseInt(msgIsGroupBlock.value, 10) : 7200;
    }
    if (!ticket && !groupContact) {
        ticket = await Ticket_1.default.findOne({
            where: {
                updatedAt: {
                    [sequelize_1.Op.between]: [+(0, date_fns_1.subHours)(new Date(), 2), +new Date()]
                },
                contactId: contact.id
            },
            order: [["updatedAt", "DESC"]]
        });
        if (ticket) {
            await ticket.update({
                status: "pending",
                userId: null,
                unreadMessages,
                queueId: null,
                companyId
            });
            await (0, FindOrCreateATicketTrakingService_1.default)({
                ticketId: ticket.id,
                companyId,
                whatsappId: ticket.whatsappId,
                userId: ticket.userId
            });
        }
    }
    const whatsapp = await Whatsapp_1.default.findOne({
        where: { id: whatsappId }
    });
    if (!ticket) {
        ticket = await Ticket_1.default.create({
            contactId: groupContact ? groupContact.id : contact.id,
            status: "pending",
            isGroup: !!groupContact,
            unreadMessages,
            whatsappId,
            whatsapp,
            companyId
        });
        await (0, FindOrCreateATicketTrakingService_1.default)({
            ticketId: ticket.id,
            companyId,
            whatsappId,
            userId: ticket.userId
        });
    }
    ticket = await (0, ShowTicketService_1.default)(ticket.id, companyId);
    return ticket;
};
exports.default = FindOrCreateTicketService;
