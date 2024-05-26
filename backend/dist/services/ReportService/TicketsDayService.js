"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsDayService = void 0;
const index_1 = __importDefault(require("../../database/index"));
const sequelize_1 = require("sequelize");
const TicketsDayService = async ({ initialDate, finalDate, companyId }) => {
    let sql = '';
    let count = 0;
    if (initialDate && initialDate.trim() === finalDate && finalDate.trim()) {
        sql = `
    SELECT
      COUNT(*) AS total,
      extract(hour from tick."createdAt") AS horario
      --to_char(DATE(tick."createdAt"), 'dd-mm-YYYY') as horario
    FROM
      "TicketTraking" tick
    WHERE
      tick."companyId" = ${companyId}
      and DATE(tick."createdAt") >= '${initialDate} 00:00:00'
      AND DATE(tick."createdAt") <= '${finalDate} 23:59:59'
    GROUP BY
      extract(hour from tick."createdAt")
      --to_char(DATE(tick."createdAt"), 'dd-mm-YYYY')
    ORDER BY
      horario asc;
    `;
    }
    else {
        sql = `
    SELECT
    COUNT(*) AS total,
    to_char(DATE(tick."createdAt"), 'dd/mm/YYYY') as data
  FROM
    "TicketTraking" tick
  WHERE
    tick."companyId" = ${companyId}
    and DATE(tick."createdAt") >= '${initialDate}'
    AND DATE(tick."createdAt") <= '${finalDate}'
  GROUP BY
    to_char(DATE(tick."createdAt"), 'dd/mm/YYYY')
  ORDER BY
    data asc;
  `;
    }
    const data = await index_1.default.query(sql, { type: sequelize_1.QueryTypes.SELECT });
    data.forEach((register) => {
        count += Number(register.total);
    });
    return { data, count };
};
exports.TicketsDayService = TicketsDayService;
