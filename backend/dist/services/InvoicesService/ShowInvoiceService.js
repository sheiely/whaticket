"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Invoices_1 = __importDefault(require("../../models/Invoices"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const ShowInvoceService = async (Invoiceid) => {
    const invoice = await Invoices_1.default.findByPk(Invoiceid);
    if (!invoice) {
        throw new AppError_1.default("ERR_NO_PLAN_FOUND", 404);
    }
    return invoice;
};
exports.default = ShowInvoceService;
