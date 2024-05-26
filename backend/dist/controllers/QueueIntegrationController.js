"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
const socket_1 = require("../libs/socket");
const CreateQueueIntegrationService_1 = __importDefault(require("../services/QueueIntegrationServices/CreateQueueIntegrationService"));
const DeleteQueueIntegrationService_1 = __importDefault(require("../services/QueueIntegrationServices/DeleteQueueIntegrationService"));
const ListQueueIntegrationService_1 = __importDefault(require("../services/QueueIntegrationServices/ListQueueIntegrationService"));
const ShowQueueIntegrationService_1 = __importDefault(require("../services/QueueIntegrationServices/ShowQueueIntegrationService"));
const UpdateQueueIntegrationService_1 = __importDefault(require("../services/QueueIntegrationServices/UpdateQueueIntegrationService"));
const index = async (req, res) => {
    const { searchParam, pageNumber } = req.query;
    const { companyId } = req.user;
    const { queueIntegrations, count, hasMore } = await (0, ListQueueIntegrationService_1.default)({
        searchParam,
        pageNumber,
        companyId
    });
    return res.status(200).json({ queueIntegrations, count, hasMore });
};
exports.index = index;
const store = async (req, res) => {
    const { type, name, projectName, jsonContent, language, urlN8N, typebotExpires, typebotKeywordFinish, typebotSlug, typebotUnknownMessage, typebotKeywordRestart, typebotRestartMessage } = req.body;
    const { companyId } = req.user;
    const queueIntegration = await (0, CreateQueueIntegrationService_1.default)({
        type, name, projectName, jsonContent, language, urlN8N, companyId,
        typebotExpires,
        typebotKeywordFinish,
        typebotSlug,
        typebotUnknownMessage,
        typebotKeywordRestart,
        typebotRestartMessage
    });
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-queueIntegration`, {
        action: "create",
        queueIntegration
    });
    return res.status(200).json(queueIntegration);
};
exports.store = store;
const show = async (req, res) => {
    const { integrationId } = req.params;
    const { companyId } = req.user;
    const queueIntegration = await (0, ShowQueueIntegrationService_1.default)(integrationId, companyId);
    return res.status(200).json(queueIntegration);
};
exports.show = show;
const update = async (req, res) => {
    const { integrationId } = req.params;
    const integrationData = req.body;
    const { companyId } = req.user;
    const queueIntegration = await (0, UpdateQueueIntegrationService_1.default)({ integrationData, integrationId, companyId });
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-queueIntegration`, {
        action: "update",
        queueIntegration
    });
    return res.status(201).json(queueIntegration);
};
exports.update = update;
const remove = async (req, res) => {
    const { integrationId } = req.params;
    const { companyId } = req.user;
    await (0, DeleteQueueIntegrationService_1.default)(integrationId);
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-queueIntegration`, {
        action: "delete",
        integrationId: +integrationId
    });
    return res.status(200).send();
};
exports.remove = remove;
