"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.showFromUUID = exports.show = exports.kanban = exports.store = exports.index = void 0;
const socket_1 = require("../libs/socket");
const CreateTicketService_1 = __importDefault(require("../services/TicketServices/CreateTicketService"));
const DeleteTicketService_1 = __importDefault(require("../services/TicketServices/DeleteTicketService"));
const ListTicketsService_1 = __importDefault(require("../services/TicketServices/ListTicketsService"));
const ShowTicketFromUUIDService_1 = __importDefault(require("../services/TicketServices/ShowTicketFromUUIDService"));
const ShowTicketService_1 = __importDefault(require("../services/TicketServices/ShowTicketService"));
const UpdateTicketService_1 = __importDefault(require("../services/TicketServices/UpdateTicketService"));
const ListTicketsServiceKanban_1 = __importDefault(require("../services/TicketServices/ListTicketsServiceKanban"));
const index = async (req, res) => {
    const { pageNumber, status, date, updatedAt, searchParam, showAll, queueIds: queueIdsStringified, tags: tagIdsStringified, users: userIdsStringified, withUnreadMessages } = req.query;
    const userId = req.user.id;
    const { companyId } = req.user;
    let queueIds = [];
    let tagsIds = [];
    let usersIds = [];
    if (queueIdsStringified) {
        queueIds = JSON.parse(queueIdsStringified);
    }
    if (tagIdsStringified) {
        tagsIds = JSON.parse(tagIdsStringified);
    }
    if (userIdsStringified) {
        usersIds = JSON.parse(userIdsStringified);
    }
    const { tickets, count, hasMore } = await (0, ListTicketsService_1.default)({
        searchParam,
        tags: tagsIds,
        users: usersIds,
        pageNumber,
        status,
        date,
        updatedAt,
        showAll,
        userId,
        queueIds,
        withUnreadMessages,
        companyId,
    });
    return res.status(200).json({ tickets, count, hasMore });
};
exports.index = index;
const store = async (req, res) => {
    const { contactId, status, userId, queueId, whatsappId } = req.body;
    const { companyId } = req.user;
    const ticket = await (0, CreateTicketService_1.default)({
        contactId,
        status,
        userId,
        companyId,
        queueId,
        whatsappId
    });
    const io = (0, socket_1.getIO)();
    io.to(ticket.status).emit(`company-${companyId}-ticket`, {
        action: "update",
        ticket
    });
    return res.status(200).json(ticket);
};
exports.store = store;
const kanban = async (req, res) => {
    const { pageNumber, status, date, updatedAt, searchParam, showAll, queueIds: queueIdsStringified, tags: tagIdsStringified, users: userIdsStringified, withUnreadMessages } = req.query;
    const userId = req.user.id;
    const { companyId } = req.user;
    let queueIds = [];
    let tagsIds = [];
    let usersIds = [];
    if (queueIdsStringified) {
        queueIds = JSON.parse(queueIdsStringified);
    }
    if (tagIdsStringified) {
        tagsIds = JSON.parse(tagIdsStringified);
    }
    if (userIdsStringified) {
        usersIds = JSON.parse(userIdsStringified);
    }
    const { tickets, count, hasMore } = await (0, ListTicketsServiceKanban_1.default)({
        searchParam,
        tags: tagsIds,
        users: usersIds,
        pageNumber,
        status,
        date,
        updatedAt,
        showAll,
        userId,
        queueIds,
        withUnreadMessages,
        companyId
    });
    return res.status(200).json({ tickets, count, hasMore });
};
exports.kanban = kanban;
const show = async (req, res) => {
    const { ticketId } = req.params;
    const { companyId } = req.user;
    const contact = await (0, ShowTicketService_1.default)(ticketId, companyId);
    return res.status(200).json(contact);
};
exports.show = show;
const showFromUUID = async (req, res) => {
    const { uuid } = req.params;
    const ticket = await (0, ShowTicketFromUUIDService_1.default)(uuid);
    return res.status(200).json(ticket);
};
exports.showFromUUID = showFromUUID;
const update = async (req, res) => {
    const { ticketId } = req.params;
    const ticketData = req.body;
    const { companyId } = req.user;
    const { ticket } = await (0, UpdateTicketService_1.default)({
        ticketData,
        ticketId,
        companyId
    });
    return res.status(200).json(ticket);
};
exports.update = update;
const remove = async (req, res) => {
    const { ticketId } = req.params;
    const { companyId } = req.user;
    await (0, ShowTicketService_1.default)(ticketId, companyId);
    const ticket = await (0, DeleteTicketService_1.default)(ticketId);
    const io = (0, socket_1.getIO)();
    io.to(ticketId)
        .to(`company-${companyId}-${ticket.status}`)
        .to(`company-${companyId}-notification`)
        .to(`queue-${ticket.queueId}-${ticket.status}`)
        .to(`queue-${ticket.queueId}-notification`)
        .emit(`company-${companyId}-ticket`, {
        action: "delete",
        ticketId: +ticketId
    });
    return res.status(200).json({ message: "ticket deleted" });
};
exports.remove = remove;
