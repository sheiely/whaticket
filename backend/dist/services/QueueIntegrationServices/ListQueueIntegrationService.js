"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const QueueIntegrations_1 = __importDefault(require("../../models/QueueIntegrations"));
const ListQueueIntegrationService = async ({ searchParam = "", pageNumber = "1", companyId }) => {
    let whereCondition = {
        [sequelize_1.Op.or]: [
            {
                "$QueueIntegrations.name$": sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("LOWER", sequelize_1.Sequelize.col("QueueIntegrations.name")), "LIKE", `%${searchParam.toLowerCase()}%`)
            }
        ]
    };
    whereCondition = {
        ...whereCondition,
        companyId
    };
    const limit = 20;
    const offset = limit * (+pageNumber - 1);
    const { count, rows: queueIntegrations } = await QueueIntegrations_1.default.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [["createdAt", "DESC"]],
    });
    const hasMore = count > offset + queueIntegrations.length;
    return {
        queueIntegrations,
        count,
        hasMore
    };
};
exports.default = ListQueueIntegrationService;
