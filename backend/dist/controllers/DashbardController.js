"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportsDay = exports.reportsUsers = exports.index = void 0;
const DashbardDataService_1 = __importDefault(require("../services/ReportService/DashbardDataService"));
const TicketsAttendance_1 = require("../services/ReportService/TicketsAttendance");
const TicketsDayService_1 = require("../services/ReportService/TicketsDayService");
const index = async (req, res) => {
    const params = req.query;
    const { companyId } = req.user;
    let daysInterval = 3;
    const dashboardData = await (0, DashbardDataService_1.default)(companyId, params);
    return res.status(200).json(dashboardData);
};
exports.index = index;
const reportsUsers = async (req, res) => {
    const { initialDate, finalDate, companyId } = req.query;
    const { data } = await (0, TicketsAttendance_1.TicketsAttendance)({ initialDate, finalDate, companyId });
    return res.json({ data });
};
exports.reportsUsers = reportsUsers;
const reportsDay = async (req, res) => {
    const { initialDate, finalDate, companyId } = req.query;
    const { count, data } = await (0, TicketsDayService_1.TicketsDayService)({ initialDate, finalDate, companyId });
    return res.json({ count, data });
};
exports.reportsDay = reportsDay;
