"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.removeAll = exports.remove = exports.update = exports.uploadMedias = exports.show = exports.store = exports.index = void 0;
const socket_1 = require("../libs/socket");
const AppError_1 = __importDefault(require("../errors/AppError"));
const lodash_1 = require("lodash");
const CreateService_1 = __importDefault(require("../services/FileServices/CreateService"));
const ListService_1 = __importDefault(require("../services/FileServices/ListService"));
const UpdateService_1 = __importDefault(require("../services/FileServices/UpdateService"));
const ShowService_1 = __importDefault(require("../services/FileServices/ShowService"));
const DeleteService_1 = __importDefault(require("../services/FileServices/DeleteService"));
const SimpleListService_1 = __importDefault(require("../services/FileServices/SimpleListService"));
const DeleteAllService_1 = __importDefault(require("../services/FileServices/DeleteAllService"));
const FilesOptions_1 = __importDefault(require("../models/FilesOptions"));
const index = async (req, res) => {
    const { pageNumber, searchParam } = req.query;
    const { companyId } = req.user;
    const { files, count, hasMore } = await (0, ListService_1.default)({
        searchParam,
        pageNumber,
        companyId
    });
    return res.json({ files, count, hasMore });
};
exports.index = index;
const store = async (req, res) => {
    const { name, message, options } = req.body;
    const { companyId } = req.user;
    const fileList = await (0, CreateService_1.default)({
        name,
        message,
        options,
        companyId
    });
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company${companyId}-file`, {
        action: "create",
        fileList
    });
    return res.status(200).json(fileList);
};
exports.store = store;
const show = async (req, res) => {
    const { fileId } = req.params;
    const { companyId } = req.user;
    const file = await (0, ShowService_1.default)(fileId, companyId);
    return res.status(200).json(file);
};
exports.show = show;
const uploadMedias = async (req, res) => {
    const { fileId, id, mediaType } = req.body;
    const files = req.files;
    const file = (0, lodash_1.head)(files);
    try {
        let fileOpt;
        if (files.length > 0) {
            for (const [index, file] of files.entries()) {
                fileOpt = await FilesOptions_1.default.findOne({
                    where: {
                        fileId,
                        id: Array.isArray(id) ? id[index] : id
                    }
                });
                fileOpt.update({
                    path: file.filename.replace('/', '-'),
                    mediaType: Array.isArray(mediaType) ? mediaType[index] : mediaType
                });
            }
        }
        return res.send({ mensagem: "Arquivos atualizados" });
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
};
exports.uploadMedias = uploadMedias;
const update = async (req, res) => {
    if (req.user.profile !== "admin") {
        throw new AppError_1.default("ERR_NO_PERMISSION", 403);
    }
    const { fileId } = req.params;
    const fileData = req.body;
    const { companyId } = req.user;
    const fileList = await (0, UpdateService_1.default)({ fileData, id: fileId, companyId });
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company${companyId}-file`, {
        action: "update",
        fileList
    });
    return res.status(200).json(fileList);
};
exports.update = update;
const remove = async (req, res) => {
    const { fileId } = req.params;
    const { companyId } = req.user;
    await (0, DeleteService_1.default)(fileId, companyId);
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company${companyId}-file`, {
        action: "delete",
        fileId
    });
    return res.status(200).json({ message: "File List deleted" });
};
exports.remove = remove;
const removeAll = async (req, res) => {
    const { companyId } = req.user;
    await (0, DeleteAllService_1.default)(companyId);
    return res.send();
};
exports.removeAll = removeAll;
const list = async (req, res) => {
    const { searchParam } = req.query;
    const { companyId } = req.user;
    const ratings = await (0, SimpleListService_1.default)({ searchParam, companyId });
    return res.json(ratings);
};
exports.list = list;
