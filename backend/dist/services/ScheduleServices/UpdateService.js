"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(require("yup"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const ShowService_1 = __importDefault(require("./ShowService"));
const UpdateUserService = async ({ scheduleData, id, companyId }) => {
    const schedule = await (0, ShowService_1.default)(id, companyId);
    if (schedule?.companyId !== companyId) {
        throw new AppError_1.default("Não é possível alterar registros de outra empresa");
    }
    const schema = Yup.object().shape({
        body: Yup.string().min(5)
    });
    const { body, sendAt, sentAt, contactId, ticketId, userId, } = scheduleData;
    try {
        await schema.validate({ body });
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    await schedule.update({
        body,
        sendAt,
        sentAt,
        contactId,
        ticketId,
        userId,
    });
    await schedule.reload();
    return schedule;
};
exports.default = UpdateUserService;
