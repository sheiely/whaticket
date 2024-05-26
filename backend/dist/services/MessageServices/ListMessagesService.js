"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Message_1 = __importDefault(require("../../models/Message"));
const ShowTicketService_1 = __importDefault(require("../TicketServices/ShowTicketService"));
const Queue_1 = __importDefault(require("../../models/Queue"));
const ListMessagesService = async ({ pageNumber = "1", ticketId, companyId, queues = [] }) => {
    const ticket = await (0, ShowTicketService_1.default)(ticketId, companyId);
    if (!ticket) {
        throw new AppError_1.default("ERR_NO_TICKET_FOUND", 404);
    }
    // await setMessagesAsRead(ticket);
    const limit = 20;
    const offset = limit * (+pageNumber - 1);
    const options = {
        where: {
            ticketId,
            companyId
        }
    };
    if (queues.length > 0) {
        options.where["queueId"] = {
            [sequelize_1.Op.or]: {
                [sequelize_1.Op.in]: queues,
                [sequelize_1.Op.eq]: null
            }
        };
    }
    const { count, rows: messages } = await Message_1.default.findAndCountAll({
        ...options,
        limit,
        include: [
            "contact",
            {
                model: Message_1.default,
                as: "quotedMsg",
                include: ["contact"]
            },
            {
                model: Queue_1.default,
                as: "queue"
            }
        ],
        offset,
        order: [["createdAt", "DESC"]]
    });
    const hasMore = count > offset + messages.length;
    return {
        messages: messages.reverse(),
        ticket,
        count,
        hasMore
    };
};
exports.default = ListMessagesService;
