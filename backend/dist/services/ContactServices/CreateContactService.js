"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Contact_1 = __importDefault(require("../../models/Contact"));
const CreateContactService = async ({ name, number, email = "", companyId, extraInfo = [] }) => {
    const numberExists = await Contact_1.default.findOne({
        where: { number, companyId }
    });
    if (numberExists) {
        throw new AppError_1.default("ERR_DUPLICATED_CONTACT");
    }
    const contact = await Contact_1.default.create({
        name,
        number,
        email,
        extraInfo,
        companyId
    }, {
        include: ["extraInfo"]
    });
    return contact;
};
exports.default = CreateContactService;
