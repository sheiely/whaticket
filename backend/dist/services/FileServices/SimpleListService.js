"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Files_1 = __importDefault(require("../../models/Files"));
const ListService = async ({ searchParam, companyId }) => {
    let whereCondition = {};
    if (searchParam) {
        whereCondition = {
            [sequelize_1.Op.or]: [{ name: { [sequelize_1.Op.like]: `%${searchParam}%` } }]
        };
    }
    const ratings = await Files_1.default.findAll({
        where: { companyId, ...whereCondition },
        order: [["name", "ASC"]],
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        },
        group: ["Rating.id"]
    });
    return ratings;
};
exports.default = ListService;
