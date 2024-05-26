"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const TicketNote_1 = __importDefault(require("../../models/TicketNote"));
const ListTicketNotesService = async ({ searchParam = "", pageNumber = "1" }) => {
    const whereCondition = {
        [sequelize_1.Op.or]: [
            {
                note: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("LOWER", sequelize_1.Sequelize.col("note")), "LIKE", `%${searchParam.toLowerCase().trim()}%`)
            }
        ]
    };
    const limit = 20;
    const offset = limit * (+pageNumber - 1);
    const { count, rows: ticketNotes } = await TicketNote_1.default.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [["createdAt", "DESC"]]
    });
    const hasMore = count > offset + ticketNotes.length;
    return {
        ticketNotes,
        count,
        hasMore
    };
};
exports.default = ListTicketNotesService;
