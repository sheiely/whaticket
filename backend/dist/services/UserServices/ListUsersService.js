"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Queue_1 = __importDefault(require("../../models/Queue"));
const Company_1 = __importDefault(require("../../models/Company"));
const User_1 = __importDefault(require("../../models/User"));
const ListUsersService = async ({ searchParam = "", pageNumber = "1", companyId }) => {
    const whereCondition = {
        [sequelize_1.Op.or]: [
            {
                "$User.name$": sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("LOWER", sequelize_1.Sequelize.col("User.name")), "LIKE", `%${searchParam.toLowerCase()}%`)
            },
            { email: { [sequelize_1.Op.like]: `%${searchParam.toLowerCase()}%` } }
        ],
        companyId: {
            [sequelize_1.Op.eq]: companyId
        }
    };
    const limit = 20;
    const offset = limit * (+pageNumber - 1);
    const { count, rows: users } = await User_1.default.findAndCountAll({
        where: whereCondition,
        attributes: ["name", "id", "email", "companyId", "profile", "createdAt"],
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        include: [
            { model: Queue_1.default, as: "queues", attributes: ["id", "name", "color"] },
            { model: Company_1.default, as: "company", attributes: ["id", "name"] }
        ]
    });
    const hasMore = count > offset + users.length;
    return {
        users,
        count,
        hasMore
    };
};
exports.default = ListUsersService;
