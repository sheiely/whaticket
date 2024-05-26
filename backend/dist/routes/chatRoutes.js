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
const express_1 = __importDefault(require("express"));
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const ChatController = __importStar(require("../controllers/ChatController"));
const routes = express_1.default.Router();
routes.get("/chats", isAuth_1.default, ChatController.index);
routes.get("/chats/:id", isAuth_1.default, ChatController.show);
routes.get("/chats/:id/messages", isAuth_1.default, ChatController.messages);
routes.post("/chats/:id/messages", isAuth_1.default, ChatController.saveMessage);
routes.post("/chats/:id/read", isAuth_1.default, ChatController.checkAsRead);
routes.post("/chats", isAuth_1.default, ChatController.store);
routes.put("/chats/:id", isAuth_1.default, ChatController.update);
routes.delete("/chats/:id", isAuth_1.default, ChatController.remove);
exports.default = routes;
