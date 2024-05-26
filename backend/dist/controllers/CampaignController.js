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
exports.deleteMedia = exports.mediaUpload = exports.findList = exports.remove = exports.restart = exports.cancel = exports.update = exports.show = exports.store = exports.index = void 0;
const fs_1 = __importDefault(require("fs"));
const lodash_1 = require("lodash");
const path_1 = __importDefault(require("path"));
const Yup = __importStar(require("yup"));
const socket_1 = require("../libs/socket");
const CreateService_1 = __importDefault(require("../services/CampaignService/CreateService"));
const DeleteService_1 = __importDefault(require("../services/CampaignService/DeleteService"));
const FindService_1 = __importDefault(require("../services/CampaignService/FindService"));
const ListService_1 = __importDefault(require("../services/CampaignService/ListService"));
const ShowService_1 = __importDefault(require("../services/CampaignService/ShowService"));
const UpdateService_1 = __importDefault(require("../services/CampaignService/UpdateService"));
const Campaign_1 = __importDefault(require("../models/Campaign"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const Contact_1 = __importDefault(require("../models/Contact"));
const ContactList_1 = __importDefault(require("../models/ContactList"));
const ContactListItem_1 = __importDefault(require("../models/ContactListItem"));
const Ticket_1 = __importDefault(require("../models/Ticket"));
const TicketTag_1 = __importDefault(require("../models/TicketTag"));
const CancelService_1 = require("../services/CampaignService/CancelService");
const RestartService_1 = require("../services/CampaignService/RestartService");
const index = async (req, res) => {
    const { searchParam, pageNumber } = req.query;
    const { companyId } = req.user;
    const { records, count, hasMore } = await (0, ListService_1.default)({
        searchParam,
        pageNumber,
        companyId
    });
    return res.json({ records, count, hasMore });
};
exports.index = index;
const store = async (req, res) => {
    const { companyId } = req.user;
    const data = req.body;
    console.log('data------- store:', data);
    const schema = Yup.object().shape({
        name: Yup.string().required()
    });
    try {
        await schema.validate(data);
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    if (typeof data.tagListId === 'number') {
        const tagId = data.tagListId;
        const campanhaNome = data.name;
        async function createContactListFromTag(tagId) {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString();
            try {
                const ticketTags = await TicketTag_1.default.findAll({ where: { tagId } });
                const ticketIds = ticketTags.map((ticketTag) => ticketTag.ticketId);
                const tickets = await Ticket_1.default.findAll({ where: { id: ticketIds } });
                const contactIds = tickets.map((ticket) => ticket.contactId);
                const contacts = await Contact_1.default.findAll({ where: { id: contactIds } });
                const randomName = `${campanhaNome} | TAG: ${tagId} - ${formattedDate}`; // Implement your own function to generate a random name
                const contactList = await ContactList_1.default.create({ name: randomName, companyId: companyId });
                const { id: contactListId } = contactList;
                const contactListItems = contacts.map((contact) => ({
                    name: contact.name,
                    number: contact.number,
                    email: contact.email,
                    contactListId,
                    companyId,
                    isWhatsappValid: true,
                }));
                await ContactListItem_1.default.bulkCreate(contactListItems);
                // Return the ContactList ID
                return contactListId;
            }
            catch (error) {
                console.error('Error creating contact list:', error);
                throw error;
            }
        }
        createContactListFromTag(tagId)
            .then(async (contactListId) => {
            const record = await (0, CreateService_1.default)({
                ...data,
                companyId,
                contactListId: contactListId,
            });
            const io = (0, socket_1.getIO)();
            io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-campaign`, {
                action: "create",
                record
            });
            return res.status(200).json(record);
        })
            .catch((error) => {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Error creating contact list' });
        });
    }
    else { // SAI DO CHECK DE TAG
        const record = await (0, CreateService_1.default)({
            ...data,
            companyId
        });
        const io = (0, socket_1.getIO)();
        io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-campaign`, {
            action: "create",
            record
        });
        return res.status(200).json(record);
    }
};
exports.store = store;
const show = async (req, res) => {
    const { id } = req.params;
    const record = await (0, ShowService_1.default)(id);
    return res.status(200).json(record);
};
exports.show = show;
const update = async (req, res) => {
    const data = req.body;
    const { companyId } = req.user;
    const schema = Yup.object().shape({
        name: Yup.string().required()
    });
    try {
        await schema.validate(data);
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    const { id } = req.params;
    const record = await (0, UpdateService_1.default)({
        ...data,
        id
    });
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-campaign`, {
        action: "update",
        record
    });
    return res.status(200).json(record);
};
exports.update = update;
const cancel = async (req, res) => {
    const { id } = req.params;
    await (0, CancelService_1.CancelService)(+id);
    return res.status(204).json({ message: "Cancelamento realizado" });
};
exports.cancel = cancel;
const restart = async (req, res) => {
    const { id } = req.params;
    await (0, RestartService_1.RestartService)(+id);
    return res.status(204).json({ message: "Reinício dos disparos" });
};
exports.restart = restart;
const remove = async (req, res) => {
    const { id } = req.params;
    const { companyId } = req.user;
    await (0, DeleteService_1.default)(id);
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-campaign`, {
        action: "delete",
        id
    });
    return res.status(200).json({ message: "Campaign deleted" });
};
exports.remove = remove;
const findList = async (req, res) => {
    const params = req.query;
    const records = await (0, FindService_1.default)(params);
    return res.status(200).json(records);
};
exports.findList = findList;
const mediaUpload = async (req, res) => {
    const { id } = req.params;
    const files = req.files;
    const file = (0, lodash_1.head)(files);
    try {
        const campaign = await Campaign_1.default.findByPk(id);
        campaign.mediaPath = file.filename;
        campaign.mediaName = file.originalname;
        await campaign.save();
        return res.send({ mensagem: "Mensagem enviada" });
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
};
exports.mediaUpload = mediaUpload;
const deleteMedia = async (req, res) => {
    const { id } = req.params;
    try {
        const campaign = await Campaign_1.default.findByPk(id);
        const filePath = path_1.default.resolve("public", campaign.mediaPath);
        const fileExists = fs_1.default.existsSync(filePath);
        if (fileExists) {
            fs_1.default.unlinkSync(filePath);
        }
        campaign.mediaPath = null;
        campaign.mediaName = null;
        await campaign.save();
        return res.send({ mensagem: "Arquivo excluído" });
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
};
exports.deleteMedia = deleteMedia;
