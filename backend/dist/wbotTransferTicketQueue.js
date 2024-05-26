"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferTicketQueue = void 0;
const sequelize_1 = require("sequelize");
const TicketTraking_1 = __importDefault(require("./models/TicketTraking"));
const moment_1 = __importDefault(require("moment"));
const Ticket_1 = __importDefault(require("./models/Ticket"));
const Whatsapp_1 = __importDefault(require("./models/Whatsapp"));
const socket_1 = require("./libs/socket");
const logger_1 = require("./utils/logger");
const ShowTicketService_1 = __importDefault(require("./services/TicketServices/ShowTicketService"));
const TransferTicketQueue = async () => {
    const io = (0, socket_1.getIO)();
    //buscar os tickets que em pendentes e sem fila
    const tickets = await Ticket_1.default.findAll({
        where: {
            status: "pending",
            queueId: {
                [sequelize_1.Op.is]: null
            },
        },
    });
    // varrer os tickets e verificar se algum deles está com o tempo estourado
    tickets.forEach(async (ticket) => {
        const wpp = await Whatsapp_1.default.findOne({
            where: {
                id: ticket.whatsappId
            }
        });
        if (!wpp || !wpp.timeToTransfer || !wpp.transferQueueId || wpp.timeToTransfer == 0)
            return;
        let dataLimite = new Date(ticket.updatedAt);
        dataLimite.setMinutes(dataLimite.getMinutes() + wpp.timeToTransfer);
        if (new Date() > dataLimite) {
            await ticket.update({
                queueId: wpp.transferQueueId,
            });
            const ticketTraking = await TicketTraking_1.default.findOne({
                where: {
                    ticketId: ticket.id
                },
                order: [["createdAt", "DESC"]]
            });
            await ticketTraking.update({
                queuedAt: (0, moment_1.default)().toDate(),
                queueId: wpp.transferQueueId,
            });
            const currentTicket = await (0, ShowTicketService_1.default)(ticket.id, ticket.companyId);
            io.to(ticket.status)
                .to("notification")
                .to(ticket.id.toString())
                .emit(`company-${ticket.companyId}-ticket`, {
                action: "update",
                ticket: currentTicket,
                traking: "created ticket 33"
            });
            logger_1.logger.info(`Transferencia de ticket automatica ticket id ${ticket.id} para a fila ${wpp.transferQueueId}`);
        }
    });
};
exports.TransferTicketQueue = TransferTicketQueue;
