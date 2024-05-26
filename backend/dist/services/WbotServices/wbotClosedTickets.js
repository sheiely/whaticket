"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClosedAllOpenTickets = void 0;
const sequelize_1 = require("sequelize");
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
const socket_1 = require("../../libs/socket");
const Mustache_1 = __importDefault(require("../../helpers/Mustache"));
const SendWhatsAppMessage_1 = __importDefault(require("./SendWhatsAppMessage"));
const moment_1 = __importDefault(require("moment"));
const ShowTicketService_1 = __importDefault(require("../TicketServices/ShowTicketService"));
const wbotMessageListener_1 = require("./wbotMessageListener");
const TicketTraking_1 = __importDefault(require("../../models/TicketTraking"));
const ClosedAllOpenTickets = async (companyId) => {
    // @ts-ignore: Unreachable code error
    const closeTicket = async (ticket, currentStatus, body) => {
        if (currentStatus === 'nps') {
            await ticket.update({
                status: "closed",
                //userId: ticket.userId || null,
                lastMessage: body,
                unreadMessages: 0,
                amountUseBotQueues: 0
            });
        }
        else if (currentStatus === 'open') {
            await ticket.update({
                status: "closed",
                //  userId: ticket.userId || null,
                lastMessage: body,
                unreadMessages: 0,
                amountUseBotQueues: 0
            });
        }
        else {
            await ticket.update({
                status: "closed",
                //userId: ticket.userId || null,
                unreadMessages: 0
            });
        }
    };
    const io = (0, socket_1.getIO)();
    try {
        const { rows: tickets } = await Ticket_1.default.findAndCountAll({
            where: { status: { [sequelize_1.Op.in]: ["open"] }, companyId },
            order: [["updatedAt", "DESC"]]
        });
        tickets.forEach(async (ticket) => {
            const showTicket = await (0, ShowTicketService_1.default)(ticket.id, companyId);
            const whatsapp = await Whatsapp_1.default.findByPk(showTicket?.whatsappId);
            const ticketTraking = await TicketTraking_1.default.findOne({
                where: {
                    ticketId: ticket.id,
                    finishedAt: null,
                }
            });
            if (!whatsapp)
                return;
            let { expiresInactiveMessage, //mensage de encerramento por inatividade      
            expiresTicket //tempo em horas para fechar ticket automaticamente
             } = whatsapp;
            // @ts-ignore: Unreachable code error
            if (expiresTicket && expiresTicket !== "" &&
                // @ts-ignore: Unreachable code error
                expiresTicket !== "0" && Number(expiresTicket) > 0) {
                //mensagem de encerramento por inatividade
                const bodyExpiresMessageInactive = (0, Mustache_1.default)(`\u200e ${expiresInactiveMessage}`, showTicket.contact);
                const dataLimite = new Date();
                dataLimite.setMinutes(dataLimite.getMinutes() - Number(expiresTicket));
                if (showTicket.status === "open" && !showTicket.isGroup) {
                    const dataUltimaInteracaoChamado = new Date(showTicket.updatedAt);
                    if (dataUltimaInteracaoChamado < dataLimite && showTicket.fromMe) {
                        closeTicket(showTicket, showTicket.status, bodyExpiresMessageInactive);
                        if (expiresInactiveMessage !== "" && expiresInactiveMessage !== undefined) {
                            const sentMessage = await (0, SendWhatsAppMessage_1.default)({ body: bodyExpiresMessageInactive, ticket: showTicket });
                            await (0, wbotMessageListener_1.verifyMessage)(sentMessage, showTicket, showTicket.contact);
                        }
                        await ticketTraking.update({
                            finishedAt: (0, moment_1.default)().toDate(),
                            closedAt: (0, moment_1.default)().toDate(),
                            whatsappId: ticket.whatsappId,
                            userId: ticket.userId,
                        });
                        io.to("open").emit(`company-${companyId}-ticket`, {
                            action: "delete",
                            ticketId: showTicket.id
                        });
                    }
                }
            }
        });
    }
    catch (e) {
        console.log('e', e);
    }
};
exports.ClosedAllOpenTickets = ClosedAllOpenTickets;
