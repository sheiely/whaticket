"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = __importDefault(require("../../database"));
const bcryptjs_1 = require("bcryptjs");
const ResetPassword = async (email, token, password) => {
    const { hasResult, data } = await filterUser(email, token);
    if (!hasResult) {
        return { status: 404, message: "Email não encontrado" };
    }
    if (hasResult === true) {
        try {
            const convertPassword = await (0, bcryptjs_1.hash)(password, 8);
            const { hasResults, datas } = await insertHasPassword(email, token, convertPassword);
            if (datas.length === 0) {
                return { status: 404, message: "Token não encontrado" };
            }
        }
        catch (err) {
            console.log(err);
        }
    }
};
exports.default = ResetPassword;
const filterUser = async (email, token) => {
    const sql = `SELECT * FROM "Users"  WHERE email = '${email}' AND "resetPassword" != ''`;
    const result = await database_1.default.query(sql, {
        type: sequelize_1.default.QueryTypes.SELECT
    });
    return { hasResult: result.length > 0, data: result };
};
const insertHasPassword = async (email, token, convertPassword) => {
    const sqlValida = `SELECT * FROM "Users"  WHERE email = '${email}' AND "resetPassword" = '${token}'`;
    const resultado = await database_1.default.query(sqlValida, {
        type: sequelize_1.default.QueryTypes.SELECT
    });
    const sqls = `UPDATE  "Users"  SET "passwordHash"= '${convertPassword}' , "resetPassword" = '' WHERE email= '${email}' AND "resetPassword" = '${token}'`;
    const results = await database_1.default.query(sqls, {
        type: sequelize_1.default.QueryTypes.UPDATE
    });
    return { hasResults: results.length > 0, datas: resultado };
};
