"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../database"));
const VerifyCurrentSchedule = async (id) => {
    const sql = `
    select
      s.id,
      s.currentWeekday,
      s.currentSchedule,
        (s.currentSchedule->>'startTime')::time "startTime",
        (s.currentSchedule->>'endTime')::time "endTime",
        (
          now()::time >= (s.currentSchedule->>'startTime')::time and
          now()::time <= (s.currentSchedule->>'endTime')::time
        ) "inActivity"
    from (
      SELECT
            c.id,
            to_char(current_date, 'day') currentWeekday,
            (array_to_json(array_agg(s))->>0)::jsonb currentSchedule
      FROM "Companies" c, jsonb_array_elements(c.schedules) s
      WHERE s->>'weekdayEn' like trim(to_char(current_date, 'day')) and c.id = :id
      GROUP BY 1, 2
    ) s
    where s.currentSchedule->>'startTime' not like '' and s.currentSchedule->>'endTime' not like '';
  `;
    const result = await database_1.default.query(sql, {
        replacements: { id },
        type: sequelize_1.QueryTypes.SELECT,
        plain: true
    });
    return result;
};
exports.default = VerifyCurrentSchedule;
