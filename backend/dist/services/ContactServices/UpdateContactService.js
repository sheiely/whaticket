"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Contact_1 = __importDefault(require("../../models/Contact"));
const ContactCustomField_1 = __importDefault(require("../../models/ContactCustomField"));
const UpdateContactService = async ({ contactData, contactId, companyId }) => {
    const { email, name, number, extraInfo } = contactData;
    const contact = await Contact_1.default.findOne({
        where: { id: contactId },
        attributes: ["id", "name", "number", "email", "companyId", "profilePicUrl"],
        include: ["extraInfo"]
    });
    if (contact?.companyId !== companyId) {
        throw new AppError_1.default("Não é possível alterar registros de outra empresa");
    }
    if (!contact) {
        throw new AppError_1.default("ERR_NO_CONTACT_FOUND", 404);
    }
    if (extraInfo) {
        await Promise.all(extraInfo.map(async (info) => {
            await ContactCustomField_1.default.upsert({ ...info, contactId: contact.id });
        }));
        await Promise.all(contact.extraInfo.map(async (oldInfo) => {
            const stillExists = extraInfo.findIndex(info => info.id === oldInfo.id);
            if (stillExists === -1) {
                await ContactCustomField_1.default.destroy({ where: { id: oldInfo.id } });
            }
        }));
    }
    await contact.update({
        name,
        number,
        email
    });
    await contact.reload({
        attributes: ["id", "name", "number", "email", "profilePicUrl"],
        include: ["extraInfo"]
    });
    return contact;
};
exports.default = UpdateContactService;
