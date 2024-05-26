"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Invoices_1 = __importDefault(require("../../models/Invoices"));
const UpdateInvoiceService = async (InvoiceData) => {
    const { id, status } = InvoiceData;
    const invoice = await Invoices_1.default.findByPk(id);
    if (!invoice) {
        throw new AppError_1.default("ERR_NO_PLAN_FOUND", 404);
    }
    await invoice.update({
        status,
    });
    return invoice;
};
exports.default = UpdateInvoiceService;
