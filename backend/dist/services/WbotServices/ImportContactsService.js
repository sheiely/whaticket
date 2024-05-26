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
const Sentry = __importStar(require("@sentry/node"));
const GetDefaultWhatsApp_1 = __importDefault(require("../../helpers/GetDefaultWhatsApp"));
const wbot_1 = require("../../libs/wbot");
const Contact_1 = __importDefault(require("../../models/Contact"));
const logger_1 = require("../../utils/logger");
const ShowBaileysService_1 = __importDefault(require("../BaileysServices/ShowBaileysService"));
const CreateContactService_1 = __importDefault(require("../ContactServices/CreateContactService"));
const lodash_1 = require("lodash");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const ImportContactsService = async (companyId) => {
    const defaultWhatsapp = await (0, GetDefaultWhatsApp_1.default)(companyId);
    const wbot = (0, wbot_1.getWbot)(defaultWhatsapp.id);
    let phoneContacts;
    try {
        const contactsString = await (0, ShowBaileysService_1.default)(wbot.id);
        phoneContacts = JSON.parse(JSON.stringify(contactsString.contacts));
        const publicFolder = path_1.default.resolve(__dirname, "..", "..", "..", "public");
        const beforeFilePath = path_1.default.join(publicFolder, 'contatos_antes.txt');
        fs_1.default.writeFile(beforeFilePath, JSON.stringify(phoneContacts, null, 2), (err) => {
            if (err) {
                logger_1.logger.error(`Failed to write contacts to file: ${err}`);
                throw err;
            }
            console.log('O arquivo contatos_antes.txt foi criado!');
        });
    }
    catch (err) {
        Sentry.captureException(err);
        logger_1.logger.error(`Could not get whatsapp contacts from phone. Err: ${err}`);
    }
    const publicFolder = path_1.default.resolve(__dirname, "..", "..", "..", "public");
    const afterFilePath = path_1.default.join(publicFolder, 'contatos_depois.txt');
    fs_1.default.writeFile(afterFilePath, JSON.stringify(phoneContacts, null, 2), (err) => {
        if (err) {
            logger_1.logger.error(`Failed to write contacts to file: ${err}`);
            throw err;
        }
    });
    const phoneContactsList = (0, lodash_1.isString)(phoneContacts)
        ? JSON.parse(phoneContacts)
        : phoneContacts;
    if ((0, lodash_1.isArray)(phoneContactsList)) {
        phoneContactsList.forEach(async ({ id, name, notify }) => {
            if (id === "status@broadcast" || id.includes("g.us"))
                return;
            const number = id.replace(/\D/g, "");
            const existingContact = await Contact_1.default.findOne({
                where: { number, companyId }
            });
            if (existingContact) {
                // Atualiza o nome do contato existente
                existingContact.name = name || notify;
                await existingContact.save();
            }
            else {
                // Criar um novo contato
                try {
                    await (0, CreateContactService_1.default)({
                        number,
                        name: name || notify,
                        companyId
                    });
                }
                catch (error) {
                    Sentry.captureException(error);
                    logger_1.logger.warn(`Could not get whatsapp contacts from phone. Err: ${error}`);
                }
            }
        });
    }
};
exports.default = ImportContactsService;
