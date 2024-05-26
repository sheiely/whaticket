"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ContactList_1 = __importDefault(require("../../models/ContactList"));
const ContactListItem_1 = __importDefault(require("../../models/ContactListItem"));
const lodash_1 = require("lodash");
const ListService = async ({ searchParam = "", pageNumber = "1", companyId }) => {
    let whereCondition = {
        companyId
    };
    if (!(0, lodash_1.isEmpty)(searchParam)) {
        whereCondition = {
            ...whereCondition,
            [sequelize_1.Op.or]: [
                {
                    name: (0, sequelize_1.where)((0, sequelize_1.fn)("LOWER", (0, sequelize_1.col)("ContactList.name")), "LIKE", `%${searchParam.toLowerCase().trim()}%`)
                }
            ]
        };
    }
    const limit = 20;
    const offset = limit * (+pageNumber - 1);
    const { count, rows: records } = await ContactList_1.default.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [["name", "ASC"]],
        subQuery: false,
        include: [
            {
                model: ContactListItem_1.default,
                as: "contacts",
                attributes: [],
                required: false
            }
        ],
        attributes: [
            "id",
            "name",
            [(0, sequelize_1.fn)("count", (0, sequelize_1.col)("contacts.id")), "contactsCount"]
        ],
        group: ["ContactList.id"]
    });
    const hasMore = count > offset + records.length;
    return {
        records,
        count,
        hasMore
    };
};
exports.default = ListService;
