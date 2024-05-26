"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_graceful_shutdown_1 = __importDefault(require("http-graceful-shutdown"));
const app_1 = __importDefault(require("./app"));
const socket_1 = require("./libs/socket");
const logger_1 = require("./utils/logger");
const StartAllWhatsAppsSessions_1 = require("./services/WbotServices/StartAllWhatsAppsSessions");
const Company_1 = __importDefault(require("./models/Company"));
const queues_1 = require("./queues");
const wbotTransferTicketQueue_1 = require("./wbotTransferTicketQueue");
const node_cron_1 = __importDefault(require("node-cron"));
const server = app_1.default.listen(process.env.PORT, async () => {
    const companies = await Company_1.default.findAll();
    const allPromises = [];
    companies.map(async (c) => {
        const promise = (0, StartAllWhatsAppsSessions_1.StartAllWhatsAppsSessions)(c.id);
        allPromises.push(promise);
    });
    Promise.all(allPromises).then(() => {
        (0, queues_1.startQueueProcess)();
    });
    logger_1.logger.info(`Server started on port: ${process.env.PORT}`);
});
node_cron_1.default.schedule("* * * * *", async () => {
    try {
        // console.log("Running a job at 01:00 at America/Sao_Paulo timezone")
        logger_1.logger.info(`Serviço de transferencia de tickets iniciado`);
        await (0, wbotTransferTicketQueue_1.TransferTicketQueue)();
    }
    catch (error) {
        logger_1.logger.error(error);
    }
});
(0, socket_1.initIO)(server);
(0, http_graceful_shutdown_1.default)(server);
