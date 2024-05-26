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
const TicketNote_1 = __importDefault(require("../../models/TicketNote"));
const CreateTicketNoteService = async (ticketNoteData) => {
    const { note } = ticketNoteData;
    const ticketnoteSchema = Yup.object().shape({
        note: Yup.string()
            .min(3, "ERR_TICKETNOTE_INVALID_NAME")
            .required("ERR_TICKETNOTE_INVALID_NAME")
    });
    try {
        await ticketnoteSchema.validate({ note });
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    const ticketNote = await TicketNote_1.default.create(ticketNoteData);
    return ticketNote;
};
exports.default = CreateTicketNoteService;
