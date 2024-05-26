"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsAttendance = void 0;
const index_1 = __importDefault(require("../../database/index"));
const sequelize_1 = require("sequelize");
const TicketsAttendance = async ({ initialDate, finalDate, companyId }) => {
    const sqlUsers = `select u.name from "Users" u where u."companyId" = ${companyId}`;
    const users = await index_1.default.query(sqlUsers, { type: sequelize_1.QueryTypes.SELECT });
    const sql = `
  select
    COUNT(*) AS quantidade,
    u.name AS nome
  from
    "TicketTraking" tt
    left join "Users" u on u.id = tt."userId"
  where
    tt."companyId" = ${companyId}
    and "ticketId" is not null
    and tt."userId" is not null
    and tt."finishedAt" >= '${initialDate} 00:00:00'
    and tt."finishedAt" <= '${finalDate} 23:59:59'
  group by
    nome
  ORDER BY
    nome asc`;
    const data = await index_1.default.query(sql, { type: sequelize_1.QueryTypes.SELECT });
    users.map(user => {
        let indexCreated = data.findIndex((item) => item.nome === user.name);
        if (indexCreated === -1) {
            data.push({ quantidade: 0, nome: user.name });
        }
    });
    return { data };
};
exports.TicketsAttendance = TicketsAttendance;
