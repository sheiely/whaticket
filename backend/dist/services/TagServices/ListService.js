"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Tag_1 = __importDefault(require("../../models/Tag"));
const TicketTag_1 = __importDefault(require("../../models/TicketTag"));
const ListService = async ({ companyId, searchParam, pageNumber = "1" }) => {
    let whereCondition = {};
    const limit = 5000;
    const offset = limit * (+pageNumber - 1);
    if (searchParam) {
        whereCondition = {
            [sequelize_1.Op.or]: [
                { name: { [sequelize_1.Op.like]: `%${searchParam}%` } },
                { color: { [sequelize_1.Op.like]: `%${searchParam}%` } }
            ]
        };
    }
    const { count, rows: tags } = await Tag_1.default.findAndCountAll({
        where: { ...whereCondition, companyId },
        limit,
        offset,
        order: [["name", "ASC"]],
        subQuery: false,
        include: [{
                model: TicketTag_1.default,
                as: 'ticketTags',
                attributes: [],
                required: false
            }],
        attributes: [
            'id',
            'name',
            'color',
            [(0, sequelize_1.fn)('count', (0, sequelize_1.col)('ticketTags.tagId')), 'ticketsCount']
        ],
        group: ['Tag.id']
    });
    const hasMore = count > offset + tags.length;
    return {
        tags,
        count,
        hasMore
    };
};
exports.default = ListService;
