"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const CheckContactOpenTickets_1 = __importDefault(require("../../helpers/CheckContactOpenTickets"));
const GetDefaultWhatsApp_1 = __importDefault(require("../../helpers/GetDefaultWhatsApp"));
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const ShowContactService_1 = __importDefault(require("../ContactServices/ShowContactService"));
const socket_1 = require("../../libs/socket");
const GetDefaultWhatsAppByUser_1 = __importDefault(require("../../helpers/GetDefaultWhatsAppByUser"));
const ShowWhatsAppService_1 = __importDefault(require("../WhatsappService/ShowWhatsAppService"));
const CreateTicketService = async ({ contactId, status, userId, queueId, companyId, whatsappId }) => {
    let whatsapp;
    if (whatsappId !== undefined && whatsappId !== null && whatsappId !== "") {
        whatsapp = await (0, ShowWhatsAppService_1.default)(whatsappId, companyId);
    }
    let defaultWhatsapp = await (0, GetDefaultWhatsAppByUser_1.default)(userId);
    if (whatsapp) {
        defaultWhatsapp = whatsapp;
    }
    if (!defaultWhatsapp)
        defaultWhatsapp = await (0, GetDefaultWhatsApp_1.default)(companyId);
    await (0, CheckContactOpenTickets_1.default)(contactId, whatsappId);
    const { isGroup } = await (0, ShowContactService_1.default)(contactId, companyId);
    const [{ id }] = await Ticket_1.default.findOrCreate({
        where: {
            contactId,
            companyId,
            whatsappId
        },
        defaults: {
            contactId,
            companyId,
            whatsappId: defaultWhatsapp.id,
            status,
            isGroup,
            userId
        }
    });
    await Ticket_1.default.update({ companyId, queueId, userId, whatsappId: defaultWhatsapp.id, status: "open" }, { where: { id } });
    const ticket = await Ticket_1.default.findByPk(id, { include: ["contact", "queue"] });
    if (!ticket) {
        throw new AppError_1.default("ERR_CREATING_TICKET");
    }
    const io = (0, socket_1.getIO)();
    io.to(ticket.id.toString()).emit("ticket", {
        action: "update",
        ticket
    });
    return ticket;
};
exports.default = CreateTicketService;
