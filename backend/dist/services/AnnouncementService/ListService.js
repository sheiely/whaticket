"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const lodash_1 = require("lodash");
const Announcement_1 = __importDefault(require("../../models/Announcement"));
const ListService = async ({ searchParam = "", pageNumber = "1" }) => {
    let whereCondition = {
        status: true
    };
    if (!(0, lodash_1.isEmpty)(searchParam)) {
        whereCondition = {
            ...whereCondition,
            [sequelize_1.Op.or]: [
                {
                    title: (0, sequelize_1.where)((0, sequelize_1.fn)("LOWER", (0, sequelize_1.col)("Announcement.title")), "LIKE", `%${searchParam.toLowerCase().trim()}%`)
                }
            ]
        };
    }
    const limit = 20;
    const offset = limit * (+pageNumber - 1);
    const { count, rows: records } = await Announcement_1.default.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [["createdAt", "DESC"]]
    });
    const hasMore = count > offset + records.length;
    return {
        records,
        count,
        hasMore
    };
};
exports.default = ListService;
