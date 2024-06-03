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
const teste = async (req, res) => {
    return res.send("Esta funcionando");
};
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const upload_1 = __importDefault(require("../config/upload"));
const tokenAuth_1 = __importDefault(require("../middleware/tokenAuth"));
const MessageController = __importStar(require("../controllers/MessageController"));
const messageRoutes = (0, express_1.Router)();
const upload = (0, multer_1.default)(upload_1.default);
messageRoutes.get("/messages/:ticketId", isAuth_1.default, MessageController.index);
messageRoutes.post("/messages/:ticketId", isAuth_1.default, upload.array("medias"), MessageController.store);
messageRoutes.delete("/messages/:messageId", isAuth_1.default, MessageController.remove);
messageRoutes.post("/api/messages/send", tokenAuth_1.default, upload.array("medias"), MessageController.send);
messageRoutes.post("/api/messages/bulk", tokenAuth_1.default, upload.array("medias"), MessageController.bulk);
messageRoutes.post("/api/event", tokenAuth_1.default, MessageController.createEvent);
messageRoutes.post("/api/score", tokenAuth_1.default, MessageController.createScore);
messageRoutes.post("/api/searchDate", tokenAuth_1.default, MessageController.searchDate);
messageRoutes.post("/treatQueueBlackList",isAuth_1.default, MessageController.treatQueue);
messageRoutes.post("/teste", teste);
exports.default = messageRoutes;
