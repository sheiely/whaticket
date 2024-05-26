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
exports.findFilteredList = exports.remove = exports.update = exports.show = exports.store = exports.list = exports.index = void 0;
const Yup = __importStar(require("yup"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const ListTicketNotesService_1 = __importDefault(require("../services/TicketNoteService/ListTicketNotesService"));
const CreateTicketNoteService_1 = __importDefault(require("../services/TicketNoteService/CreateTicketNoteService"));
const UpdateTicketNoteService_1 = __importDefault(require("../services/TicketNoteService/UpdateTicketNoteService"));
const ShowTicketNoteService_1 = __importDefault(require("../services/TicketNoteService/ShowTicketNoteService"));
const FindAllTicketNotesService_1 = __importDefault(require("../services/TicketNoteService/FindAllTicketNotesService"));
const DeleteTicketNoteService_1 = __importDefault(require("../services/TicketNoteService/DeleteTicketNoteService"));
const FindNotesByContactIdAndTicketId_1 = __importDefault(require("../services/TicketNoteService/FindNotesByContactIdAndTicketId"));
const index = async (req, res) => {
    const { searchParam, pageNumber } = req.query;
    const { ticketNotes, count, hasMore } = await (0, ListTicketNotesService_1.default)({
        searchParam,
        pageNumber
    });
    return res.json({ ticketNotes, count, hasMore });
};
exports.index = index;
const list = async (req, res) => {
    const ticketNotes = await (0, FindAllTicketNotesService_1.default)();
    return res.status(200).json(ticketNotes);
};
exports.list = list;
const store = async (req, res) => {
    const newTicketNote = req.body;
    const { id: userId } = req.user;
    const schema = Yup.object().shape({
        note: Yup.string().required()
    });
    try {
        await schema.validate(newTicketNote);
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    const ticketNote = await (0, CreateTicketNoteService_1.default)({
        ...newTicketNote,
        userId
    });
    return res.status(200).json(ticketNote);
};
exports.store = store;
const show = async (req, res) => {
    const { id } = req.params;
    const ticketNote = await (0, ShowTicketNoteService_1.default)(id);
    return res.status(200).json(ticketNote);
};
exports.show = show;
const update = async (req, res) => {
    const ticketNote = req.body;
    const schema = Yup.object().shape({
        note: Yup.string()
    });
    try {
        await schema.validate(ticketNote);
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    const recordUpdated = await (0, UpdateTicketNoteService_1.default)(ticketNote);
    return res.status(200).json(recordUpdated);
};
exports.update = update;
const remove = async (req, res) => {
    const { id } = req.params;
    if (req.user.profile !== "admin") {
        throw new AppError_1.default("ERR_NO_PERMISSION", 403);
    }
    await (0, DeleteTicketNoteService_1.default)(id);
    return res.status(200).json({ message: "Observação removida" });
};
exports.remove = remove;
const findFilteredList = async (req, res) => {
    try {
        const { contactId, ticketId } = req.query;
        const notes = await (0, FindNotesByContactIdAndTicketId_1.default)({
            contactId,
            ticketId
        });
        return res.status(200).json(notes);
    }
    catch (e) {
        return res.status(500).json({ message: e });
    }
};
exports.findFilteredList = findFilteredList;
