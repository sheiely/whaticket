"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const QuickMessage_1 = __importDefault(require("../../models/QuickMessage"));
const ListService = async ({ searchParam = "", pageNumber = "1", companyId, userId }) => {
    const sanitizedSearchParam = searchParam.toLocaleLowerCase().trim();
    let whereCondition = {
        // [Op.or]: [
        //   {
        shortcode: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("LOWER", sequelize_1.Sequelize.col("shortcode")), "LIKE", `%${sanitizedSearchParam}%`)
        //   },
        //   {
        //     message: Sequelize.where(
        //       Sequelize.fn("LOWER", Sequelize.col("message")),
        //       "LIKE",
        //       `%${sanitizedSearchParam}%`
        //     )
        //   }
        // ]
    };
    whereCondition = {
        ...whereCondition,
        companyId,
        userId: userId
    };
    const limit = 20;
    const offset = limit * (+pageNumber - 1);
    const { count, rows: records } = await QuickMessage_1.default.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [["shortcode", "ASC"]]
    });
    const hasMore = count > offset + records.length;
    return {
        records,
        count,
        hasMore
    };
};
exports.default = ListService;
