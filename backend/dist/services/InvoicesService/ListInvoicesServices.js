"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Invoices_1 = __importDefault(require("../../models/Invoices"));
const ListInvoicesServices = async ({ searchParam = "", pageNumber = "1" }) => {
    const whereCondition = {
        [sequelize_1.Op.or]: [
            {
                name: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("LOWER", sequelize_1.Sequelize.col("detail")), "LIKE", `%${searchParam.toLowerCase().trim()}%`)
            }
        ]
    };
    const limit = 20;
    const offset = limit * (+pageNumber - 1);
    const { count, rows: invoices } = await Invoices_1.default.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [["id", "ASC"]]
    });
    const hasMore = count > offset + invoices.length;
    return {
        invoices,
        count,
        hasMore
    };
};
exports.default = ListInvoicesServices;
