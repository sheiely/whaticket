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
exports.initWASocket = exports.removeWbot = exports.getWbot = void 0;
const Sentry = __importStar(require("@sentry/node"));
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
const logger_1 = require("../utils/logger");
const logger_2 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const authState_1 = __importDefault(require("../helpers/authState"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const socket_1 = require("./socket");
const StartWhatsAppSession_1 = require("../services/WbotServices/StartWhatsAppSession");
const DeleteBaileysService_1 = __importDefault(require("../services/BaileysServices/DeleteBaileysService"));
const node_cache_1 = __importDefault(require("node-cache"));
const loggerBaileys = logger_2.default.child({});
loggerBaileys.level = "error";
const sessions = [];
const retriesQrCodeMap = new Map();
const getWbot = (whatsappId) => {
    const sessionIndex = sessions.findIndex(s => s.id === whatsappId);
    if (sessionIndex === -1) {
        throw new AppError_1.default("ERR_WAPP_NOT_INITIALIZED");
    }
    return sessions[sessionIndex];
};
exports.getWbot = getWbot;
const removeWbot = async (whatsappId, isLogout = true) => {
    try {
        const sessionIndex = sessions.findIndex(s => s.id === whatsappId);
        if (sessionIndex !== -1) {
            if (isLogout) {
                sessions[sessionIndex].logout();
                sessions[sessionIndex].ws.close();
            }
            sessions.splice(sessionIndex, 1);
        }
    }
    catch (err) {
        logger_1.logger.error(err);
    }
};
exports.removeWbot = removeWbot;
const initWASocket = async (whatsapp) => {
    return new Promise(async (resolve, reject) => {
        try {
            (async () => {
                const io = (0, socket_1.getIO)();
                const whatsappUpdate = await Whatsapp_1.default.findOne({
                    where: { id: whatsapp.id }
                });
                if (!whatsappUpdate)
                    return;
                const { id, name, provider } = whatsappUpdate;
                const { version, isLatest } = await (0, baileys_1.fetchLatestBaileysVersion)();
                const isLegacy = provider === "stable" ? true : false;
                logger_1.logger.info(`using WA v${version.join(".")}, isLatest: ${isLatest}`);
                logger_1.logger.info(`isLegacy: ${isLegacy}`);
                logger_1.logger.info(`Starting session ${name}`);
                let retriesQrCode = 0;
                let wsocket = null;
                const store = (0, baileys_1.makeInMemoryStore)({
                    logger: loggerBaileys
                });
                const { state, saveState } = await (0, authState_1.default)(whatsapp);
                const msgRetryCounterCache = new node_cache_1.default();
                const userDevicesCache = new node_cache_1.default();
                wsocket = (0, baileys_1.default)({
                    logger: loggerBaileys,
                    printQRInTerminal: false,
                    browser: baileys_1.Browsers.appropriate("Desktop"),
                    auth: {
                        creds: state.creds,
                        keys: (0, baileys_1.makeCacheableSignalKeyStore)(state.keys, logger_1.logger),
                    },
                    version,
                    // defaultQueryTimeoutMs: 60000,
                    // retryRequestDelayMs: 250,
                    // keepAliveIntervalMs: 1000 * 60 * 10 * 3,
                    msgRetryCounterCache,
                    shouldIgnoreJid: jid => (0, baileys_1.isJidBroadcast)(jid),
                });
                // wsocket = makeWASocket({
                //   version,
                //   logger: loggerBaileys,
                //   printQRInTerminal: false,
                //   auth: state as AuthenticationState,
                //   generateHighQualityLinkPreview: false,
                //   shouldIgnoreJid: jid => isJidBroadcast(jid),
                //   browser: ["Chat", "Chrome", "10.15.7"],
                //   patchMessageBeforeSending: (message) => {
                //     const requiresPatch = !!(
                //       message.buttonsMessage ||
                //       // || message.templateMessage
                //       message.listMessage
                //     );
                //     if (requiresPatch) {
                //       message = {
                //         viewOnceMessage: {
                //           message: {
                //             messageContextInfo: {
                //               deviceListMetadataVersion: 2,
                //               deviceListMetadata: {},
                //             },
                //             ...message,
                //           },
                //         },
                //       };
                //     }
                //     return message;
                //   },
                // })
                wsocket.ev.on("connection.update", async ({ connection, lastDisconnect, qr }) => {
                    logger_1.logger.info(`Socket  ${name} Connection Update ${connection || ""} ${lastDisconnect || ""}`);
                    if (connection === "close") {
                        if (lastDisconnect?.error?.output?.statusCode === 403) {
                            await whatsapp.update({ status: "PENDING", session: "" });
                            await (0, DeleteBaileysService_1.default)(whatsapp.id);
                            io.to(`company-${whatsapp.companyId}-mainchannel`).emit(`company-${whatsapp.companyId}-whatsappSession`, {
                                action: "update",
                                session: whatsapp
                            });
                            (0, exports.removeWbot)(id, false);
                        }
                        if (lastDisconnect?.error?.output?.statusCode !==
                            baileys_1.DisconnectReason.loggedOut) {
                            (0, exports.removeWbot)(id, false);
                            setTimeout(() => (0, StartWhatsAppSession_1.StartWhatsAppSession)(whatsapp, whatsapp.companyId), 2000);
                        }
                        else {
                            await whatsapp.update({ status: "PENDING", session: "" });
                            await (0, DeleteBaileysService_1.default)(whatsapp.id);
                            io.to(`company-${whatsapp.companyId}-mainchannel`).emit(`company-${whatsapp.companyId}-whatsappSession`, {
                                action: "update",
                                session: whatsapp
                            });
                            (0, exports.removeWbot)(id, false);
                            setTimeout(() => (0, StartWhatsAppSession_1.StartWhatsAppSession)(whatsapp, whatsapp.companyId), 2000);
                        }
                    }
                    if (connection === "open") {
                        await whatsapp.update({
                            status: "CONNECTED",
                            qrcode: "",
                            retries: 0
                        });
                        io.to(`company-${whatsapp.companyId}-mainchannel`).emit(`company-${whatsapp.companyId}-whatsappSession`, {
                            action: "update",
                            session: whatsapp
                        });
                        const sessionIndex = sessions.findIndex(s => s.id === whatsapp.id);
                        if (sessionIndex === -1) {
                            wsocket.id = whatsapp.id;
                            sessions.push(wsocket);
                        }
                        resolve(wsocket);
                    }
                    if (qr !== undefined) {
                        if (retriesQrCodeMap.get(id) && retriesQrCodeMap.get(id) >= 3) {
                            await whatsappUpdate.update({
                                status: "DISCONNECTED",
                                qrcode: ""
                            });
                            await (0, DeleteBaileysService_1.default)(whatsappUpdate.id);
                            io.to(`company-${whatsapp.companyId}-mainchannel`).emit("whatsappSession", {
                                action: "update",
                                session: whatsappUpdate
                            });
                            wsocket.ev.removeAllListeners("connection.update");
                            wsocket.ws.close();
                            wsocket = null;
                            retriesQrCodeMap.delete(id);
                        }
                        else {
                            logger_1.logger.info(`Session QRCode Generate ${name}`);
                            retriesQrCodeMap.set(id, (retriesQrCode += 1));
                            await whatsapp.update({
                                qrcode: qr,
                                status: "qrcode",
                                retries: 0
                            });
                            const sessionIndex = sessions.findIndex(s => s.id === whatsapp.id);
                            if (sessionIndex === -1) {
                                wsocket.id = whatsapp.id;
                                sessions.push(wsocket);
                            }
                            io.to(`company-${whatsapp.companyId}-mainchannel`).emit(`company-${whatsapp.companyId}-whatsappSession`, {
                                action: "update",
                                session: whatsapp
                            });
                        }
                    }
                });
                wsocket.ev.on("creds.update", saveState);
                store.bind(wsocket.ev);
            })();
        }
        catch (error) {
            Sentry.captureException(error);
            console.log(error);
            reject(error);
        }
    });
};
exports.initWASocket = initWASocket;
