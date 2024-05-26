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
exports.deleteMedia = exports.mediaUpload = exports.findList = exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
const Yup = __importStar(require("yup"));
const socket_1 = require("../libs/socket");
const lodash_1 = require("lodash");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ListService_1 = __importDefault(require("../services/AnnouncementService/ListService"));
const CreateService_1 = __importDefault(require("../services/AnnouncementService/CreateService"));
const ShowService_1 = __importDefault(require("../services/AnnouncementService/ShowService"));
const UpdateService_1 = __importDefault(require("../services/AnnouncementService/UpdateService"));
const DeleteService_1 = __importDefault(require("../services/AnnouncementService/DeleteService"));
const FindService_1 = __importDefault(require("../services/AnnouncementService/FindService"));
const Announcement_1 = __importDefault(require("../models/Announcement"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const index = async (req, res) => {
    const { searchParam, pageNumber } = req.query;
    const { records, count, hasMore } = await (0, ListService_1.default)({
        searchParam,
        pageNumber
    });
    return res.json({ records, count, hasMore });
};
exports.index = index;
const store = async (req, res) => {
    const { companyId } = req.user;
    const data = req.body;
    const schema = Yup.object().shape({
        title: Yup.string().required()
    });
    try {
        await schema.validate(data);
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    const record = await (0, CreateService_1.default)({
        ...data,
        companyId
    });
    const io = (0, socket_1.getIO)();
    io.emit(`company-announcement`, {
        action: "create",
        record
    });
    return res.status(200).json(record);
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
    const schema = Yup.object().shape({
        title: Yup.string().required()
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
    io.emit(`company-announcement`, {
        action: "update",
        record
    });
    return res.status(200).json(record);
};
exports.update = update;
const remove = async (req, res) => {
    const { id } = req.params;
    const { companyId } = req.user;
    await (0, DeleteService_1.default)(id);
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-announcement`, {
        action: "delete",
        id
    });
    return res.status(200).json({ message: "Announcement deleted" });
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
        const announcement = await Announcement_1.default.findByPk(id);
        await announcement.update({
            mediaPath: file.filename,
            mediaName: file.originalname
        });
        await announcement.reload();
        const io = (0, socket_1.getIO)();
        io.emit(`company-announcement`, {
            action: "update",
            record: announcement
        });
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
        const announcement = await Announcement_1.default.findByPk(id);
        const filePath = path_1.default.resolve("public", announcement.mediaPath);
        const fileExists = fs_1.default.existsSync(filePath);
        if (fileExists) {
            fs_1.default.unlinkSync(filePath);
        }
        await announcement.update({
            mediaPath: null,
            mediaName: null
        });
        await announcement.reload();
        const io = (0, socket_1.getIO)();
        io.emit(`company-announcement`, {
            action: "update",
            record: announcement
        });
        return res.send({ mensagem: "Arquivo excluído" });
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
};
exports.deleteMedia = deleteMedia;
