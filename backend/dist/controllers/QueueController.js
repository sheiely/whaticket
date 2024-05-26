"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
const socket_1 = require("../libs/socket");
const CreateQueueService_1 = __importDefault(require("../services/QueueService/CreateQueueService"));
const DeleteQueueService_1 = __importDefault(require("../services/QueueService/DeleteQueueService"));
const ListQueuesService_1 = __importDefault(require("../services/QueueService/ListQueuesService"));
const ShowQueueService_1 = __importDefault(require("../services/QueueService/ShowQueueService"));
const UpdateQueueService_1 = __importDefault(require("../services/QueueService/UpdateQueueService"));
const lodash_1 = require("lodash");
const index = async (req, res) => {
    const { companyId: userCompanyId } = req.user;
    const { companyId: queryCompanyId } = req.query;
    let companyId = userCompanyId;
    if (!(0, lodash_1.isNil)(queryCompanyId)) {
        companyId = +queryCompanyId;
    }
    const queues = await (0, ListQueuesService_1.default)({ companyId });
    return res.status(200).json(queues);
};
exports.index = index;
const store = async (req, res) => {
    const { name, color, greetingMessage, outOfHoursMessage, schedules, orderQueue, integrationId, promptId } = req.body;
    const { companyId } = req.user;
    console.log("queue", integrationId, promptId);
    const queue = await (0, CreateQueueService_1.default)({
        name,
        color,
        greetingMessage,
        companyId,
        outOfHoursMessage,
        schedules,
        orderQueue: orderQueue === "" ? null : orderQueue,
        integrationId: integrationId === "" ? null : integrationId,
        promptId: promptId === "" ? null : promptId
    });
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-queue`, {
        action: "update",
        queue
    });
    return res.status(200).json(queue);
};
exports.store = store;
const show = async (req, res) => {
    const { queueId } = req.params;
    const { companyId } = req.user;
    const queue = await (0, ShowQueueService_1.default)(queueId, companyId);
    return res.status(200).json(queue);
};
exports.show = show;
const update = async (req, res) => {
    const { queueId } = req.params;
    const { companyId } = req.user;
    const { name, color, greetingMessage, outOfHoursMessage, schedules, orderQueue, integrationId, promptId } = req.body;
    const queue = await (0, UpdateQueueService_1.default)(queueId, {
        name,
        color,
        greetingMessage,
        outOfHoursMessage,
        schedules,
        orderQueue: orderQueue === "" ? null : orderQueue,
        integrationId: integrationId === "" ? null : integrationId,
        promptId: promptId === "" ? null : promptId
    }, companyId);
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-queue`, {
        action: "update",
        queue
    });
    return res.status(201).json(queue);
};
exports.update = update;
const remove = async (req, res) => {
    const { queueId } = req.params;
    const { companyId } = req.user;
    await (0, DeleteQueueService_1.default)(queueId, companyId);
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-queue`, {
        action: "delete",
        queueId: +queueId
    });
    return res.status(200).send();
};
exports.remove = remove;
