"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Baileys_1 = __importDefault(require("../../models/Baileys"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const ShowBaileysService = async (id) => {
    const baileysData = await Baileys_1.default.findOne({
        where: {
            whatsappId: id
        }
    });
    if (!baileysData) {
        throw new AppError_1.default("ERR_NO_BAILEYS_DATA_FOUND", 404);
    }
    return baileysData;
};
exports.default = ShowBaileysService;
