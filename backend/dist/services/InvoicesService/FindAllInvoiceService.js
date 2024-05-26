"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Invoices_1 = __importDefault(require("../../models/Invoices"));
const FindAllPlanService = async (companyId) => {
    const invoice = await Invoices_1.default.findAll({
        where: {
            companyId
        },
        order: [["id", "ASC"]]
    });
    return invoice;
};
exports.default = FindAllPlanService;
