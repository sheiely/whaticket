"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schedule_1 = __importDefault(require("../../models/Schedule"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Contact_1 = __importDefault(require("../../models/Contact"));
const User_1 = __importDefault(require("../../models/User"));
const ScheduleService = async (id, companyId) => {
    const schedule = await Schedule_1.default.findByPk(id, {
        include: [
            { model: Contact_1.default, as: "contact", attributes: ["id", "name"] },
            { model: User_1.default, as: "user", attributes: ["id", "name"] },
        ]
    });
    if (schedule?.companyId !== companyId) {
        throw new AppError_1.default("Não é possível excluir registro de outra empresa");
    }
    if (!schedule) {
        throw new AppError_1.default("ERR_NO_SCHEDULE_FOUND", 404);
    }
    return schedule;
};
exports.default = ScheduleService;
