"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Help_1 = __importDefault(require("../../models/Help"));
const ListService = async ({ searchParam = "", pageNumber = "1" }) => {
    const whereCondition = {
        [sequelize_1.Op.or]: [
            {
                title: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("LOWER", sequelize_1.Sequelize.col("title")), "LIKE", `%${searchParam.toLowerCase().trim()}%`)
            }
        ]
    };
    const limit = 20;
    const offset = limit * (+pageNumber - 1);
    const { count, rows: records } = await Help_1.default.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [["title", "ASC"]]
    });
    const hasMore = count > offset + records.length;
    return {
        records,
        count,
        hasMore
    };
};
exports.default = ListService;
