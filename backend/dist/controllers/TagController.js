"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncTags = exports.list = exports.remove = exports.update = exports.show = exports.kanban = exports.store = exports.index = void 0;
const socket_1 = require("../libs/socket");
const AppError_1 = __importDefault(require("../errors/AppError"));
const CreateService_1 = __importDefault(require("../services/TagServices/CreateService"));
const ListService_1 = __importDefault(require("../services/TagServices/ListService"));
const UpdateService_1 = __importDefault(require("../services/TagServices/UpdateService"));
const ShowService_1 = __importDefault(require("../services/TagServices/ShowService"));
const DeleteService_1 = __importDefault(require("../services/TagServices/DeleteService"));
const SimpleListService_1 = __importDefault(require("../services/TagServices/SimpleListService"));
const SyncTagsService_1 = __importDefault(require("../services/TagServices/SyncTagsService"));
const KanbanListService_1 = __importDefault(require("../services/TagServices/KanbanListService"));
const index = async (req, res) => {
    const { pageNumber, searchParam } = req.query;
    const { companyId } = req.user;
    const { tags, count, hasMore } = await (0, ListService_1.default)({
        searchParam,
        pageNumber,
        companyId
    });
    return res.json({ tags, count, hasMore });
};
exports.index = index;
const store = async (req, res) => {
    const { name, color, kanban } = req.body;
    const { companyId } = req.user;
    const tag = await (0, CreateService_1.default)({
        name,
        color,
        companyId,
        kanban
    });
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit("tag", {
        action: "create",
        tag
    });
    return res.status(200).json(tag);
};
exports.store = store;
const kanban = async (req, res) => {
    const { companyId } = req.user;
    const tags = await (0, KanbanListService_1.default)({ companyId });
    return res.json({ lista: tags });
};
exports.kanban = kanban;
const show = async (req, res) => {
    const { tagId } = req.params;
    const tag = await (0, ShowService_1.default)(tagId);
    return res.status(200).json(tag);
};
exports.show = show;
const update = async (req, res) => {
    if (req.user.profile !== "admin") {
        throw new AppError_1.default("ERR_NO_PERMISSION", 403);
    }
    const { tagId } = req.params;
    const tagData = req.body;
    const tag = await (0, UpdateService_1.default)({ tagData, id: tagId });
    const io = (0, socket_1.getIO)();
    io.to(`company-${req.user.companyId}-mainchannel`).emit("tag", {
        action: "update",
        tag
    });
    return res.status(200).json(tag);
};
exports.update = update;
const remove = async (req, res) => {
    const { tagId } = req.params;
    await (0, DeleteService_1.default)(tagId);
    const io = (0, socket_1.getIO)();
    io.to(`company-${req.user.companyId}-mainchannel`).emit("tag", {
        action: "delete",
        tagId
    });
    return res.status(200).json({ message: "Tag deleted" });
};
exports.remove = remove;
const list = async (req, res) => {
    const { searchParam } = req.query;
    const { companyId } = req.user;
    const tags = await (0, SimpleListService_1.default)({ searchParam, companyId });
    return res.json(tags);
};
exports.list = list;
const syncTags = async (req, res) => {
    const data = req.body;
    const { companyId } = req.user;
    const tags = await (0, SyncTagsService_1.default)({ ...data, companyId });
    return res.json(tags);
};
exports.syncTags = syncTags;
