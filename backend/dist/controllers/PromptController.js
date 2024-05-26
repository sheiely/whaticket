"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
const socket_1 = require("../libs/socket");
const CreatePromptService_1 = __importDefault(require("../services/PromptServices/CreatePromptService"));
const DeletePromptService_1 = __importDefault(require("../services/PromptServices/DeletePromptService"));
const ListPromptsService_1 = __importDefault(require("../services/PromptServices/ListPromptsService"));
const ShowPromptService_1 = __importDefault(require("../services/PromptServices/ShowPromptService"));
const UpdatePromptService_1 = __importDefault(require("../services/PromptServices/UpdatePromptService"));
const Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
const index = async (req, res) => {
    const { pageNumber, searchParam } = req.query;
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(" ");
    const decoded = (0, jsonwebtoken_1.verify)(token, auth_1.default.secret);
    const { companyId } = decoded;
    const { prompts, count, hasMore } = await (0, ListPromptsService_1.default)({ searchParam, pageNumber, companyId });
    return res.status(200).json({ prompts, count, hasMore });
};
exports.index = index;
const store = async (req, res) => {
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(" ");
    const decoded = (0, jsonwebtoken_1.verify)(token, auth_1.default.secret);
    const { companyId } = decoded;
    const { name, apiKey, prompt, maxTokens, temperature, promptTokens, completionTokens, totalTokens, queueId, maxMessages, voice, voiceKey, voiceRegion } = req.body;
    const promptTable = await (0, CreatePromptService_1.default)({ name, apiKey, prompt, maxTokens, temperature, promptTokens, completionTokens, totalTokens, queueId, maxMessages, companyId, voice, voiceKey, voiceRegion });
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit("prompt", {
        action: "update",
        prompt: promptTable
    });
    return res.status(200).json(promptTable);
};
exports.store = store;
const show = async (req, res) => {
    const { promptId } = req.params;
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(" ");
    const decoded = (0, jsonwebtoken_1.verify)(token, auth_1.default.secret);
    const { companyId } = decoded;
    const prompt = await (0, ShowPromptService_1.default)({ promptId, companyId });
    return res.status(200).json(prompt);
};
exports.show = show;
const update = async (req, res) => {
    const { promptId } = req.params;
    const promptData = req.body;
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(" ");
    const decoded = (0, jsonwebtoken_1.verify)(token, auth_1.default.secret);
    const { companyId } = decoded;
    const prompt = await (0, UpdatePromptService_1.default)({ promptData, promptId: promptId, companyId });
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit("prompt", {
        action: "update",
        prompt
    });
    return res.status(200).json(prompt);
};
exports.update = update;
const remove = async (req, res) => {
    const { promptId } = req.params;
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(" ");
    const decoded = (0, jsonwebtoken_1.verify)(token, auth_1.default.secret);
    const { companyId } = decoded;
    try {
        const { count } = await Whatsapp_1.default.findAndCountAll({ where: { promptId: +promptId, companyId } });
        if (count > 0)
            return res.status(200).json({ message: "Não foi possível excluir! Verifique se este prompt está sendo usado nas conexões Whatsapp!" });
        await (0, DeletePromptService_1.default)(promptId, companyId);
        const io = (0, socket_1.getIO)();
        io.to(`company-${companyId}-mainchannel`).emit("prompt", {
            action: "delete",
            intelligenceId: +promptId
        });
        return res.status(200).json({ message: "Prompt deleted" });
    }
    catch (err) {
        return res.status(500).json({ message: "Não foi possível excluir! Verifique se este prompt está sendo usado!" });
    }
};
exports.remove = remove;
